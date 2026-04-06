"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-foreground flex items-center gap-2">
          <img src="/logo.png" alt="Marketing Funnel Logo" className="w-10 h-10 object-contain rounded-md" />
          Marketing<span className="text-primary italic">Funnel</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Admin Login
          </Link>
          <div className="h-4 w-px bg-border"></div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border bg-card animate-in slide-in-from-top-4 duration-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/admin/login" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LayoutDashboard size={20} /> Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
