import { createFileRoute } from "@tanstack/react-router";

type LeadStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "completed";

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  completed: "Completed",
};

const VALID_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "in_progress",
  "completed",
];

export const Route = createFileRoute("/api/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const telegramToken =
            process.env["TELEGRAM_BOT_TOKEN"];

          const telegramChatId =
            process.env["TELEGRAM_CHAT_ID"];

          const supabaseUrl =
            process.env["SUPABASE_URL"];

          const supabaseSecretKey =
            process.env["SUPABASE_SECRET_KEY"];

          const webhookSecret =
            process.env["TELEGRAM_WEBHOOK_SECRET"];

          if (
            !telegramToken ||
            !telegramChatId ||
            !supabaseUrl ||
            !supabaseSecretKey
          ) {
            console.error(
              "Telegram webhook configuration is missing",
            );

            return Response.json(
              {
                success: false,
                error: "Server configuration error",
              },
              { status: 500 },
            );
          }

          // ==========================================
          // VERIFY WEBHOOK SECRET
          // ==========================================

          if (webhookSecret) {
            const receivedSecret =
              request.headers.get(
                "X-Telegram-Bot-Api-Secret-Token",
              );

            if (receivedSecret !== webhookSecret) {
              return new Response("Unauthorized", {
                status: 401,
              });
            }
          }

          // ==========================================
          // READ TELEGRAM UPDATE
          // ==========================================

          const update = await request.json();

          const callbackQuery =
            update?.callback_query;

          // Telegram can send many types of updates.
          // We only care about button presses.
          if (!callbackQuery) {
            return Response.json({
              success: true,
            });
          }

          const callbackData =
            typeof callbackQuery.data === "string"
              ? callbackQuery.data
              : "";

          const message =
            callbackQuery.message;

          // ==========================================
          // VERIFY CHAT
          // ==========================================

          const callbackChatId =
            message?.chat?.id?.toString();

          if (callbackChatId !== telegramChatId) {
            console.error(
              "Unauthorized Telegram chat:",
              callbackChatId,
            );

            await answerCallbackQuery(
              telegramToken,
              callbackQuery.id,
              "Unauthorized chat",
              true,
            );

            return Response.json(
              {
                success: false,
                error: "Unauthorized chat",
              },
              { status: 403 },
            );
          }

          // ==========================================
          // PARSE CALLBACK DATA
          //
          // Example:
          // lead:550e8400-e29b-41d4-a716-446655440000:contacted
          // ==========================================

          const parts = callbackData.split(":");

          if (
            parts.length !== 3 ||
            parts[0] !== "lead"
          ) {
            await answerCallbackQuery(
              telegramToken,
              callbackQuery.id,
              "Unknown action",
              true,
            );

            return Response.json(
              {
                success: false,
                error: "Invalid callback data",
              },
              { status: 400 },
            );
          }

          const leadId = parts[1];
          const requestedStatus =
            parts[2] as LeadStatus;

          if (
            !leadId ||
            !VALID_STATUSES.includes(requestedStatus)
          ) {
            await answerCallbackQuery(
              telegramToken,
              callbackQuery.id,
              "Invalid lead or status",
              true,
            );

            return Response.json(
              {
                success: false,
                error: "Invalid lead or status",
              },
              { status: 400 },
            );
          }

          // ==========================================
          // UPDATE LEAD IN SUPABASE
          // ==========================================

          const supabaseResponse = await fetch(
            `${supabaseUrl}/rest/v1/leads?id=eq.${encodeURIComponent(
              leadId,
            )}`,
            {
              method: "PATCH",
              headers: {
                apikey: supabaseSecretKey,
                Authorization: `Bearer ${supabaseSecretKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                status: requestedStatus,
              }),
            },
          );

          if (!supabaseResponse.ok) {
            const error =
              await supabaseResponse.text();

            console.error(
              "Telegram status update error:",
              error,
            );

            await answerCallbackQuery(
              telegramToken,
              callbackQuery.id,
              "Failed to update status",
              true,
            );

            return Response.json(
              {
                success: false,
                error: "Failed to update lead",
              },
              { status: 500 },
            );
          }

          // ==========================================
          // UPDATE TELEGRAM BUTTONS
          // ==========================================

          if (message?.message_id) {
            await updateTelegramButtons({
              telegramToken,
              telegramChatId,
              messageId: message.message_id,
              leadId,
              currentStatus: requestedStatus,
            });
          }

          // ==========================================
          // SHOW TELEGRAM CONFIRMATION
          // ==========================================

          await answerCallbackQuery(
            telegramToken,
            callbackQuery.id,
            `Status: ${STATUS_LABELS[requestedStatus]}`,
          );

          console.log(
            `RIVORA lead ${leadId} changed to ${requestedStatus}`,
          );

          return Response.json({
            success: true,
          });
        } catch (error) {
          console.error(
            "Telegram webhook error:",
            error,
          );

          return Response.json(
            {
              success: false,
              error: "Internal server error",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});

// ==========================================
// TELEGRAM CALLBACK RESPONSE
// ==========================================

async function answerCallbackQuery(
  telegramToken: string,
  callbackQueryId: string,
  text: string,
  showAlert = false,
) {
  try {
    await fetch(
      `https://api.telegram.org/bot${telegramToken}/answerCallbackQuery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callback_query_id: callbackQueryId,
          text,
          show_alert: showAlert,
        }),
      },
    );
  } catch (error) {
    console.error(
      "Failed to answer Telegram callback:",
      error,
    );
  }
}

// ==========================================
// UPDATE BUTTONS AFTER STATUS CHANGE
// ==========================================

async function updateTelegramButtons({
  telegramToken,
  telegramChatId,
  messageId,
  leadId,
  currentStatus,
}: {
  telegramToken: string;
  telegramChatId: string;
  messageId: number;
  leadId: string;
  currentStatus: LeadStatus;
}) {
  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text:
            currentStatus === "contacted"
              ? "✅ Contacted"
              : "📞 Contacted",
          callback_data: `lead:${leadId}:contacted`,
        },
        {
          text:
            currentStatus === "in_progress"
              ? "✅ In Progress"
              : "🔄 In Progress",
          callback_data: `lead:${leadId}:in_progress`,
        },
      ],
      [
        {
          text:
            currentStatus === "completed"
              ? "✅ Completed"
              : "☑️ Completed",
          callback_data: `lead:${leadId}:completed`,
        },
      ],
    ],
  };

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/editMessageReplyMarkup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          message_id: messageId,
          reply_markup: replyMarkup,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();

      console.error(
        "Failed to update Telegram buttons:",
        error,
      );
    }
  } catch (error) {
    console.error(
      "Telegram button update error:",
      error,
    );
  }
}