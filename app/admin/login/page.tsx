"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "authenticating" | "redirecting">("idle");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setStatus("redirecting");
        router.push("/admin/dashboard");
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    // Safety check: if we land back on this page, reset the status to idle
    if (status === "redirecting") {
      const timer = setTimeout(() => setStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("authenticating");
    setError(null);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn("Supabase URL not configured, bypassing login.");
      router.push("/admin/dashboard");
      return;
    }

    // Set a client-side timeout for the auth request
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 15000); // 15s timeout

    try {
      console.log("Attempting authentication...");
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      clearTimeout(timeoutId);

      if (signInError) throw signInError;

      console.log("Authentication successful, redirecting...");
      setStatus("redirecting");
      router.push("/admin/dashboard");
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Login error:", err);
      if (err.name === 'AbortError') {
        setError("The authentication request timed out. Please check your connection and try again.");
      } else {
        setError(err.message || "Invalid login credentials.");
      }
      setLoading(false);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full glass-card p-8 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
            <ShieldCheck className="text-primary" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-center text-muted-foreground text-sm mb-8">Secure login for business owner</p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm text-center animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Email Address</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-background border border-border rounded-xl p-3.5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
              placeholder="admin@marketing.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-background border border-border rounded-xl p-3.5 pr-12 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 flex justify-center items-center gap-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>{status === "redirecting" ? "Redirecting..." : "Authenticating..."}</span>
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-tighter font-medium">
            Authorized Personnel Only • Secure Session
          </p>
        </div>
      </div>
    </div>
  );
}
