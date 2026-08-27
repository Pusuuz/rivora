import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  company: z.string().min(2, "Company is too short").max(100),
  email: z.string().email("Invalid email"),
  phone: z.string().max(30).optional(),
  message: z.string().min(10, "Message is too short").max(2000),
});

type CreatedLead = {
  id: string;
};

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const telegramToken = process.env["TELEGRAM_BOT_TOKEN"];
    const telegramChatId = process.env["TELEGRAM_CHAT_ID"];

    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseSecretKey = process.env["SUPABASE_SECRET_KEY"];

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("Supabase environment variables are missing");

      return {
        success: false,
        error: "Supabase configuration error",
      };
    }

    if (!telegramToken || !telegramChatId) {
      console.error("Telegram environment variables are missing");

      return {
        success: false,
        error: "Telegram configuration error",
      };
    }

    // ==========================================
    // SAVE LEAD TO SUPABASE
    // ==========================================

    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/leads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
        }),
      },
    );

    if (!supabaseResponse.ok) {
      const error = await supabaseResponse.text();

      console.error("Supabase API error:", error);

      return {
        success: false,
        error: "Failed to save lead",
      };
    }

    const createdLeads =
      (await supabaseResponse.json()) as CreatedLead[];

    const lead = createdLeads[0];

    if (!lead?.id) {
      console.error(
        "Supabase did not return the new lead ID",
      );

      return {
        success: false,
        error: "Lead was saved, but its ID was not returned",
      };
    }

    // ==========================================
    // CREATE TELEGRAM MESSAGE
    // ==========================================

    const receivedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const text = [
      "🚀 <b>NEW RIVORA LEAD</b>",
      "",
      `👤 <b>Name:</b> ${escapeTelegramHtml(data.name)}`,
      `🏢 <b>Company:</b> ${escapeTelegramHtml(data.company)}`,
      `📧 <b>Email:</b> ${escapeTelegramHtml(data.email)}`,
      `📱 <b>Phone:</b> ${escapeTelegramHtml(
        data.phone || "Not provided",
      )}`,
      "",
      "💬 <b>Request:</b>",
      escapeTelegramHtml(data.message),
      "",
      `🕐 <b>Received:</b> ${receivedAt}`,
      "",
      "📌 <b>Status:</b> New",
      "",
      "🌐 <i>New request from RIVORA website</i>",
    ].join("\n");

    // ==========================================
    // TELEGRAM BUTTONS
    // ==========================================

    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: "📞 Contacted",
            callback_data: `lead:${lead.id}:contacted`,
          },
          {
            text: "🔄 In Progress",
            callback_data: `lead:${lead.id}:in_progress`,
          },
        ],
        [
          {
            text: "✅ Completed",
            callback_data: `lead:${lead.id}:completed`,
          },
        ],
      ],
    };

    // ==========================================
    // SEND LEAD TO TELEGRAM
    // ==========================================

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
          reply_markup: replyMarkup,
        }),
      },
    );

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text();

      console.error("Telegram API error:", error);

      return {
        success: false,
        error: "Lead saved, but Telegram notification failed",
      };
    }

    console.log("NEW RIVORA LEAD:", {
      id: lead.id,
      ...data,
    });

    return {
      success: true,
    };
  });

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}