import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Filter,
  LogOut,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

import { adminLogin, adminLogout, getAdminLeads, updateLeadStatus } from "@/lib/admin";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type LeadStatus = "new" | "contacted" | "in_progress" | "completed";

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

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  completed: "Completed",
};

const statusOptions: Array<{
  value: "all" | LeadStatus;
  label: string;
}> = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");

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
    try {
      await adminLogout();
    } finally {
      setAuthenticated(false);
      setLeads([]);
    }
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setError("");

    try {
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
    } catch (error) {
      console.error(error);
      setError("Failed to update status");
    }
  };

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...leads]
      .filter((lead) => {
        if (statusFilter === "all") {
          return true;
        }

        return lead.status === statusFilter;
      })
      .filter((lead) => {
        if (!query) {
          return true;
        }

        return [lead.name, lead.company, lead.email, lead.phone ?? "", lead.message].some((value) =>
          value.toLowerCase().includes(query),
        );
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [leads, search, statusFilter]);

  const newCount = leads.filter((lead) => lead.status === "new").length;

  const contactedCount = leads.filter((lead) => lead.status === "contacted").length;

  const inProgressCount = leads.filter((lead) => lead.status === "in_progress").length;

  const completedCount = leads.filter((lead) => lead.status === "completed").length;

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

          <div className="flex flex-wrap gap-2">
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

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total leads</p>

              <Users className="size-4 text-muted-foreground" />
            </div>

            <p className="mt-2 text-3xl font-semibold">{leads.length}</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">New</p>

              <span className="size-2.5 rounded-full bg-primary" />
            </div>

            <p className="mt-2 text-3xl font-semibold">{newCount}</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">In progress</p>

              <Clock3 className="size-4 text-muted-foreground" />
            </div>

            <p className="mt-2 text-3xl font-semibold">{inProgressCount}</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Completed</p>

              <CheckCircle2 className="size-4 text-muted-foreground" />
            </div>

            <p className="mt-2 text-3xl font-semibold">{completedCount}</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="glass mb-6 rounded-2xl p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, company, email, phone or message..."
                className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="relative lg:w-56">
              <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | LeadStatus)}
                className="h-11 w-full appearance-none rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-primary"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Leads */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">
                {leads.length === 0 ? "No leads yet." : "No leads match your search or filter."}
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <article
                key={lead.id}
                className="glass rounded-2xl p-5 transition hover:border-primary/20 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
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

                  <div className="w-full shrink-0 lg:w-48">
                    <label htmlFor={`status-${lead.id}`} className="text-xs text-muted-foreground">
                      Status
                    </label>

                    <select
                      id={`status-${lead.id}`}
                      value={lead.status}
                      onChange={(e) =>
                        void handleStatusChange(lead.id, e.target.value as LeadStatus)
                      }
                      className="mt-2 h-10 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary"
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
