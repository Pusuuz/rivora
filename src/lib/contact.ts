import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  company: z.string().min(2, "Company is too short").max(100),
  email: z.string().email("Invalid email"),
  phone: z.string().max(30).optional(),
  message: z.string().min(10, "Message is too short").max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const telegramToken = process.env["TELEGRAM_BOT_TOKEN"];
    const telegramChatId = process.env["TELEGRAM_CHAT_ID"];

    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_ANON_KEY"];

    if (!supabaseUrl || !supabaseKey) {
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
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
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

    // ==========================================
    // SEND LEAD TO TELEGRAM
    // ==========================================

    const text = [
      "🚀 NEW RIVORA LEAD",
      "",
      `👤 Name: ${data.name}`,
      `🏢 Company: ${data.company}`,
      `📧 Email: ${data.email}`,
      `📱 Phone: ${data.phone || "Not provided"}`,
      "",
      "💬 Request:",
      data.message,
      "",
      "🌐 New request from website",
    ].join("\n");

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

    console.log("NEW RIVORA LEAD:", data);

    return {
      success: true,
    };
  });