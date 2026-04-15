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
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded flex items-center justify-center group-hover:rotate-6 transition-transform">
            <LayoutDashboard size={20} className="text-black" />
          </div>
          <span>Marketing<span className="text-orange-500 italic">Funnel</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/apply" className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2.5 rounded-sm font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            Book Call
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black z-40 flex flex-col p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6 mt-8">
            <Link href="/apply" className="bg-orange-500 text-black p-5 text-center font-black uppercase tracking-widest text-lg mt-4 shadow-xl">
              Book Your Call Now
            </Link>
          </nav>
          
          <div className="mt-auto pb-12 text-center text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Restricted Access.
          </div>
        </div>
      )}
    </header>
  );
}

