import { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, type ApiResponse } from '../lib/api';

type Lead = {
  id: number;
  name: string;
  email: string;
  service_name: string;
  message: string;
  source: string;
  created_at: string;
  updated_at: string;
};

type LeadsApiResponse = ApiResponse & {
  page: number;
  per_page: number;
  count: number;
  data: Lead[];
};

type AdminLoginResponse = ApiResponse & {
  token: string;
  expires_in: number;
  admin: {
    id: number;
    email: string;
  };
};

const TOKEN_STORAGE_KEY = 'admin_session_token';
const ADMIN_EMAIL_STORAGE_KEY = 'admin_session_email';

export default function AdminPage() {
  const [email, setEmail] = useState(() => sessionStorage.getItem(ADMIN_EMAIL_STORAGE_KEY) ?? '');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? '');
  const [adminEmail, setAdminEmail] = useState(() => sessionStorage.getItem(ADMIN_EMAIL_STORAGE_KEY) ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rows, setRows] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [count, setCount] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / perPage)), [count, perPage]);
  const isLoggedIn = token.trim().length > 0;

  const handleUnauthorized = (message: string) => {
    if (!message.toLowerCase().includes('unauthorized')) return false;

    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_STORAGE_KEY);
    setToken('');
    setAdminEmail('');
    setRows([]);
    setCount(0);
    setError('Session expired or invalid. Please login again.');
    return true;
  };

  const loadLeads = async (authToken: string, nextPage = page, nextPerPage = perPage) => {
    const response = (await apiGet(
      `/project-queries?page=${nextPage}&per_page=${nextPerPage}`,
      authToken
    )) as LeadsApiResponse;

    setRows(Array.isArray(response.data) ? response.data : []);
    setCount(typeof response.count === 'number' ? response.count : 0);
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    setError('');
    void loadLeads(token, page, perPage)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Could not load leads.';
        if (!handleUnauthorized(message)) {
          setError(message);
        }
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn, page, perPage, token]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const entered = password.trim();
    if (!normalizedEmail) {
      setError('Email is required.');
      return;
    }
    if (!entered) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const login = (await apiPost('/admin/login', {
        email: normalizedEmail,
        password: entered,
      })) as AdminLoginResponse;

      if (!login.token) {
        throw new Error('Invalid login response.');
      }

      await loadLeads(login.token, 1, perPage);
      sessionStorage.setItem(TOKEN_STORAGE_KEY, login.token);
      sessionStorage.setItem(ADMIN_EMAIL_STORAGE_KEY, login.admin?.email ?? normalizedEmail);
      setToken(login.token);
      setAdminEmail(login.admin?.email ?? normalizedEmail);
      setPage(1);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_STORAGE_KEY);
    setToken('');
    setAdminEmail('');
    setRows([]);
    setCount(0);
    setError('');
  };

  const handleRefresh = async () => {
    if (!token) return;

    setLoading(true);
    setError('');
    try {
      await loadLeads(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Refresh failed.';
      if (!handleUnauthorized(message)) {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-md mx-auto surface border border-dark-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-300 text-sm mb-6">
            Enter admin email and password to view all leads from <code>/api/project-queries</code>.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 rounded-xl btn-primary font-semibold disabled:opacity-60"
            >
              {loading ? 'Checking...' : 'Login'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Leads Dashboard</h1>
            <p className="text-slate-300 text-sm mt-1">
              Showing project queries from backend. Signed in as {adminEmail || 'admin'}.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleRefresh} className="px-4 py-2 rounded-xl btn-secondary font-semibold">
              Refresh
            </button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl btn-primary font-semibold">
              Logout
            </button>
          </div>
        </div>

        <div className="surface rounded-2xl border border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-dark-light/80 text-slate-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => (
                  <tr key={lead.id} className="border-t border-dark-border">
                    <td className="px-4 py-3 text-slate-200">{lead.id}</td>
                    <td className="px-4 py-3 text-slate-200">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.service_name}</td>
                    <td className="px-4 py-3 text-slate-300 max-w-md whitespace-pre-wrap">{lead.message}</td>
                    <td className="px-4 py-3 text-slate-400">{lead.created_at}</td>
                  </tr>
                ))}
                {!loading && rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-slate-400" colSpan={6}>
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-dark-border px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              {loading ? 'Loading leads...' : `Total leads: ${count}`}
            </p>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-400">
                Per page
                <select
                  className="ml-2 bg-dark-card border border-dark-border rounded-lg px-2 py-1 text-slate-200"
                  value={perPage}
                  onChange={(event) => {
                    setPerPage(Number(event.target.value));
                    setPage(1);
                  }}
                >
                  {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={loading || page <= 1}
                className="px-3 py-1.5 rounded-lg btn-secondary disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-xs text-slate-300">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={loading || page >= totalPages}
                className="px-3 py-1.5 rounded-lg btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
      </div>
    </main>
  );
}
