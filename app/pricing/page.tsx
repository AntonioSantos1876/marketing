import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen py-32 px-4 md:px-8 bg-black text-white selection:bg-orange-500 selection:text-white flex flex-col items-center relative overflow-hidden">
      {/* Background Image Strict Grayscale Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920&auto=format&fit=crop" 
          alt="Strategy and Planning" 
          className="w-full h-full object-cover filter grayscale contrast-125 opacity-70"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full text-center mb-16 relative z-10 mt-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-orange-500 uppercase tracking-widest text-xs font-bold mb-8">
          <ShieldCheck size={16} />
          <span>Secure Checkout Center</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter uppercase mb-6">
          Invest In <br className="hidden md:block" />
          <span className="text-orange-500">Scale.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto border-l-4 border-orange-500 pl-6 text-left inline-block">
          You've completed your demo call and seen the infrastructure in action. Finalize your custom growth package below to officially initiate the onboarding cycle.
        </p>
      </div>

      <div className="flex justify-center w-full max-w-6xl relative z-10 mt-6">
        <div className="bg-zinc-900 flex flex-col p-8 md:p-12 border border-white/10 hover:border-orange-500/50 transition-colors duration-500 relative max-w-2xl w-full">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-black px-8 py-2 text-xs font-black uppercase tracking-widest">
            Strategic Ascension
          </div>
          
          <div className="mb-10 text-center mt-4">
            <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">Omnichannel Master Setup</h3>
            <p className="text-gray-400 font-medium text-lg">The absolute foundation required to systematically scale with premium paid advertising.</p>
            <div className="mt-10 flex justify-center items-baseline gap-2">
              <span className="text-7xl font-black tracking-tighter text-white">$1,500</span>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">/ One-time</span>
            </div>
          </div>
          
          <div className="bg-black/50 p-6 border border-white/10 mb-10 flex-1">
            <ul className="space-y-5">
              <PricingFeature text="Complete Paid Advertising Infrastructure Setup" />
              <PricingFeature text="High-Converting Ad Creatives & Direct-Response Copy" />
              <PricingFeature text="Advanced Audience Tracking and Deep Targeting" />
              <PricingFeature text="Pixel Installation & Precision Pipeline Tracking" />
            </ul>
          </div>
          
          <Link href="/checkout?tier=system" className="group w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-black text-xl py-5 transition-all duration-300 uppercase tracking-widest">
            Proceed with Capital <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      <p className="mt-16 text-sm text-gray-500 max-w-2xl text-center relative z-10 font-medium">
        * Transactions are processed securely via Stripe's encrypted banking gateway. By proceeding, you agree to our internal Terms of Service. If you bypass the demo, your capital will be returned and access denied.
      </p>
    </main>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4">
      <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={24} />
      <span className="text-gray-200 text-lg font-medium leading-snug">{text}</span>
    </li>
  );
}
