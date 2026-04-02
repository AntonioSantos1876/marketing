import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-foreground flex items-center gap-2">
          <img src="/logo.png" alt="Marketing Funnel Logo" className="w-10 h-10 object-contain rounded-md" />
          Marketing<span className="text-primary italic">Funnel</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Admin Login
          </Link>
          <div className="h-4 w-px bg-border"></div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
