"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only check auth if we are not on the login page
    // If Supabase isn't configured, we just bypass for local demo if needed, but here we strictly check.
    const checkAuth = async () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Bypass if no supabase configured for UI preview purposes
        setLoading(false);
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isLoginPage) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, isLoginPage, router]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Admin...</div>;
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link 
            href="/admin/leads" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/leads') ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={20} /> Lead Management
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
