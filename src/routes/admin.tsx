import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, LogOut, RefreshCw } from "lucide-react";

import { adminLogin, adminLogout, getAdminLeads, updateLeadStatus } from "@/lib/admin";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "contacted" | "in_progress" | "completed";
  created_at: string;
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  completed: "Completed",
};

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminLeads();

      if (!result.authenticated) {
        setAuthenticated(false);
        setLeads([]);
        return;
      }

      if (!result.success) {
        setError(result.error ?? "Failed to load leads");
        return;
      }

      setAuthenticated(true);
      setLeads(result.leads);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLeads();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoggingIn(true);
    setError("");

    try {
      const result = await adminLogin({
        data: {
          password,
        },
      });

      if (!result.success) {
        setError(result.error ?? "Invalid password");
        return;
      }

      setPassword("");
      await loadLeads();
    } catch (error) {
      console.error(error);
      setError("Login failed");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();

    setAuthenticated(false);
    setLeads([]);
  };

  const handleStatusChange = async (id: string, status: Lead["status"]) => {
    const result = await updateLeadStatus({
      data: {
        id,
        status,
      },
    });

    if (!result.success) {
      setError(result.error ?? "Failed to update status");
      return;
    }

    setLeads((current) =>
      current.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status,
            }
          : lead,
      ),
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-muted-foreground">Loading RIVORA Admin…</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="glass w-full max-w-md rounded-3xl p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">RIVORA</p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Admin panel</h1>

            <p className="mt-2 text-sm text-muted-foreground">Sign in to manage incoming leads.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="mt-2 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={loggingIn}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loggingIn ? "Signing in…" : "Sign in"}
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">RIVORA</p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Leads</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage incoming requests from the website.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void loadLeads()}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm transition hover:bg-secondary"
            >
              <RefreshCw className="size-4" />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm transition hover:bg-secondary"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-muted-foreground">Total leads</p>

            <p className="mt-2 text-3xl font-semibold">{leads.length}</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-muted-foreground">New</p>

            <p className="mt-2 text-3xl font-semibold">
              {leads.filter((lead) => lead.status === "new").length}
            </p>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-muted-foreground">In progress</p>

            <p className="mt-2 text-3xl font-semibold">
              {leads.filter((lead) => lead.status === "in_progress").length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">No leads yet.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <article key={lead.id} className="glass rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold">{lead.name}</h2>

                      <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                        {statusLabels[lead.status]}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">{lead.company}</p>

                    <div className="mt-4 grid gap-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Email: </span>
                        {lead.email}
                      </p>

                      <p>
                        <span className="text-muted-foreground">Phone: </span>
                        {lead.phone || "Not provided"}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border border-border bg-card/60 p-4">
                      <p className="text-xs text-muted-foreground">Request</p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                        {lead.message}
                      </p>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <label className="text-xs text-muted-foreground">Status</label>

                    <select
                      value={lead.status}
                      onChange={(e) =>
                        void handleStatusChange(lead.id, e.target.value as Lead["status"])
                      }
                      className="mt-2 h-10 w-full min-w-44 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
