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
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    // Close sidebar on mobile when navigating
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
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
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading Admin...</div>;
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">Admin Portal</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/dashboard' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link 
            href="/admin/leads" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/leads') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Users size={20} /> Lead Management
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-primary">Admin</h2>
          <div className="w-8" /> {/* Balance */}
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
