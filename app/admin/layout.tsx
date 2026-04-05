"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Basic setup: scroll position and sidebar reset
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setIsSidebarOpen(false);

    // One-time initialization for auth state
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    initAuth();

    // Listen for auth changes globally
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []); // Explicitly stable dependency array to fix React size mismatch errors

  if (isLoginPage) {
    return <div className="h-screen w-full flex items-center justify-center bg-background p-4 overflow-hidden">{children}</div>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header / Branding */}
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-lg tracking-tight text-foreground flex items-center gap-2 text-nowrap group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
            </div>
            Admin<span className="text-primary italic">Portal</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 mt-2 opacity-50">Main Menu</p>
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === '/admin/dashboard' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <LayoutDashboard size={18} /> Dashboard Overview
          </Link>
          <Link 
            href="/admin/leads" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${pathname.startsWith('/admin/leads') ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Users size={18} /> Lead Management
          </Link>
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-border/50 bg-muted/20">
          <div className="mb-4 px-4 py-3 rounded-2xl bg-card/50 border border-border/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shadow-inner">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-foreground">Admin User</p>
              <p className="text-[10px] text-muted-foreground truncate opacity-70">Portal Manager</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-muted/10">
        {/* Header (Always Visible Title for Small Screens) */}
        <header className="sticky top-0 z-30 h-16 border-b border-border/50 bg-background/60 backdrop-blur-md flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-foreground md:text-lg">
                {pathname === '/admin/dashboard' ? 'Dashboard Summary' : pathname.startsWith('/admin/leads') ? 'Lead Database' : 'Portal'}
              </h1>
              <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest hidden md:block">Real-time performance analytics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Live System</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 min-h-0 relative custom-scrollbar">
          <div className="max-w-[1600px] mx-auto h-full min-h-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
