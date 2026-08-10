import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { z } from "zod";

const LEAD_STATUSES = [
  "new",
  "contacted",
  "in_progress",
  "completed",
] as const;

type LeadStatus = (typeof LEAD_STATUSES)[number];

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

/**
 * Reads the RIVORA admin session cookie.
 */
function getAdminCookie(): string | null {
  const cookieHeader = getRequestHeader("cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (name !== "rivora_admin") {
      continue;
    }

    const value = valueParts.join("=");

    if (!value) {
      return null;
    }

    try {
      return decodeURIComponent(value);
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Checks whether the current request has a valid admin session.
 */
function isAdminAuthenticated(): boolean {
  const sessionSecret = getEnv("RIVORA_ADMIN_SESSION_SECRET");
  const cookie = getAdminCookie();

  return Boolean(cookie && cookie === sessionSecret);
}

/**
 * Sets or clears the admin session cookie.
 *
 * encodeURIComponent() is important here because cookie/header values
 * must not contain raw non-ASCII characters.
 */
function setAdminCookie(value: string, maxAge: number) {
  const isProduction = process.env.NODE_ENV === "production";

  const secure = isProduction ? "; Secure" : "";

  const encodedValue = encodeURIComponent(value);

  setResponseHeader(
    "Set-Cookie",
    `rivora_admin=${encodedValue}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`,
  );
}

/**
 * Headers used to communicate with Supabase REST API.
 */
function supabaseHeaders() {
  const secretKey = getEnv("SUPABASE_SECRET_KEY");

  return {
    apikey: secretKey,
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };
}

function supabaseUrl() {
  return `${getEnv("SUPABASE_URL")}/rest/v1`;
}

/**
 * ADMIN LOGIN
 */
export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const adminPassword = getEnv("RIVORA_ADMIN_PASSWORD");
    const sessionSecret = getEnv("RIVORA_ADMIN_SESSION_SECRET");

    if (data.password !== adminPassword) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    setAdminCookie(sessionSecret, 60 * 60 * 24 * 7);

    return {
      success: true,
    };
  });

/**
 * ADMIN LOGOUT
 */
export const adminLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    setAdminCookie("", 0);

    return {
      success: true,
    };
  },
);

/**
 * GET ALL LEADS
 */
export const getAdminLeads = createServerFn({ method: "GET" }).handler(
  async () => {
    if (!isAdminAuthenticated()) {
      return {
        success: false,
        authenticated: false,
        leads: [] as Lead[],
      };
    }

    const response = await fetch(
      `${supabaseUrl()}/leads?select=id,name,company,email,phone,message,status,created_at&order=created_at.desc`,
      {
        method: "GET",
        headers: supabaseHeaders(),
      },
    );

    if (!response.ok) {
      const error = await response.text();

      console.error("Supabase admin error:", error);

      return {
        success: false,
        authenticated: true,
        leads: [] as Lead[],
        error: "Failed to load leads",
      };
    }

    const leads = (await response.json()) as Lead[];

    return {
      success: true,
      authenticated: true,
      leads,
    };
  },
);

/**
 * UPDATE LEAD STATUS
 */
export const updateLeadStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid(),
      status: z.enum(LEAD_STATUSES),
    }),
  )
  .handler(async ({ data }) => {
    if (!isAdminAuthenticated()) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const response = await fetch(
      `${supabaseUrl()}/leads?id=eq.${encodeURIComponent(data.id)}`,
      {
        method: "PATCH",
        headers: {
          ...supabaseHeaders(),
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          status: data.status,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();

      console.error("Supabase status update error:", error);

      return {
        success: false,
        error: "Failed to update status",
      };
    }

    return {
      success: true,
    };
  });