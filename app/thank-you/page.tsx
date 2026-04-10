import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8 bg-black flex flex-col items-center justify-center text-center relative overflow-hidden text-white selection:bg-orange-500 selection:text-white">
      {/* Background Image Strict Grayscale Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/85 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop" 
          alt="Partnership Background" 
          className="w-full h-full object-cover filter grayscale contrast-125 opacity-60"
        />
      </div>

      <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 p-12 relative z-10 shadow-2xl">
        <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/30">
          <CheckCircle2 className="text-orange-500" size={48} />
        </div>

        <h1 className="text-5xl font-black uppercase tracking-tight mb-4">Application <span className="text-orange-500">Received.</span></h1>

        <p className="text-gray-300 font-medium text-lg mb-8 leading-relaxed">
          Your data has been successfully transmitted to our strategic team. We review each submission manually. If your enterprise metrics align with our infrastructure, we will coordinate next steps shortly.
        </p>

        <div className="p-6 bg-black/60 border border-white/10 mb-10 text-left">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Priority Action Required</p>
          <p className="text-white font-medium">To bypass the queue and instantly begin your funnel analysis, immediately secure a time block on the active strategic calendar below.</p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <a
            href="https://calendly.com/macrawford1876/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-widest text-xl py-6 transition-all shadow-[0_0_30px_rgba(255,102,0,0.3)] hover:scale-105"
          >
            Lock Call Time <ArrowRight size={24} />
          </a>

          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-2 mt-4">
            <ArrowLeft size={16} /> Return to Infrastructure Overview
          </Link>
        </div>
      </div>
    </main>
  );
}

const ArrowLeft = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)
