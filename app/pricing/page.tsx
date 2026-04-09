import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8 bg-background flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
          <ShieldCheck size={16} />
          <span>Secure Checkout Center</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Invest in <span className="text-primary italic">Growth</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You've completed your demo call and seen the system in action. Select your custom growth package below to officially start your onboarding process.
        </p>
      </div>

      <div className="flex justify-center w-full max-w-6xl">
        <div className="glass-card flex flex-col p-8 md:p-12 border-2 border-primary relative shadow-[0_10px_40px_-15px_rgba(212,175,55,0.3)] max-w-xl w-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
            Digital Ads Mastery
          </div>
          <div className="mb-8 text-center mt-2">
            <h3 className="text-3xl font-bold mb-2">Omnichannel Marketing Setup</h3>
            <p className="text-muted-foreground">Everything you need to systematically scale with premium ads.</p>
            <div className="mt-8 flex justify-center items-baseline gap-2">
              <span className="text-6xl font-extrabold tracking-tighter">$1,500</span>
              <span className="text-muted-foreground font-medium text-lg">/one-time</span>
            </div>
          </div>
          <ul className="space-y-5 mb-10 flex-1">
            <PricingFeature text="Complete Paid Advertising Infrastructure Setup" />
            <PricingFeature text="High-Converting Ad Creatives & Copy" />
            <PricingFeature text="Advanced Audience Tracking and Targeting" />
            <PricingFeature text="Pixel Setup & Precision Tracking" />
          </ul>
          <Link href="/checkout?tier=system" className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xl">
            Proceed to Secure Payment <ArrowRight size={24} />
          </Link>
        </div>
      </div>
      
      <p className="mt-12 text-sm text-muted-foreground/70 max-w-2xl text-center">
        * Payments are processed securely via Stripe. By proceeding with payment, you agree to our comprehensive Terms of Service. If you have not yet completed a demo, please book one first.
      </p>
    </main>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
      <span className="text-muted-foreground text-sm leading-snug">{text}</span>
    </li>
  );
}
