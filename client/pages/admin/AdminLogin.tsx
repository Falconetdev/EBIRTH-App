import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const { login, user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = (location.state as { from?: Location })?.from?.pathname ?? "/admin/blog";

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast({ title: "Welcome back", description: "You are now signed in." });
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_30px_80px_rgba(10,0,20,0.55)] backdrop-blur">
        <h1 className=" text-3xl font-semibold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-white/70">Sign in to publish Inner Racers stories.</p>
        {error && <p className="mt-4 rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-100">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/40"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/40"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#FFE500] py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-white/60">
          Need access? Contact the Inner Racers web team.
          <br />
          <Link to="/" className="font-semibold text-[#FFE500] hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
