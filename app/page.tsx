import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, DollarSign } from "lucide-react";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

export default function LandingPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 md:px-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center space-y-8 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            <ShieldCheck size={16} />
            <span>Accepting Applications for Q3</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            We Help <span className="text-primary italic">Serious Businesses</span> Grow Through Strategic Marketing
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            More Leads. Better Positioning. Stronger Growth. If you're ready to take your business seriously, let's talk.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
            <Link href="/apply" className="btn-primary flex items-center justify-center gap-2 text-lg">
              Book Free Demo Call <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="pt-8 md:pt-12 w-full text-muted-foreground/80 text-sm flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary shrink-0" /> <span>Proven Systems</span></span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary shrink-0" /> <span>Selective Client Roster</span></span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary shrink-0" /> <span>High-Ticket Results</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT DESCRIPTION / OFFER SECTION */}
      <section className="w-full py-24 px-4 md:px-8 bg-card border-y border-border text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Do.</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            We don't offer generic templates or overnight miracles. We build custom lead generation and brand visibility systems that connect you with your ideal customers. 
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
            {[
              "Targeted Ad Strategy that actually converts",
              "Scalable Client Acquisition Systems",
              "Advanced Customer Targeting",
              "Premium Digital Presence Improvement"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. RESULTS / SOCIAL PROOF */}
      <section className="w-full py-24 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Results Speak Louder.</h2>
            <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
          </div>
          
          <TestimonialsCarousel />
        </div>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="w-full py-24 px-4 md:px-8 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">A clear path to scaling your operations.</p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-border z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 z-10 relative">
              {[
                { step: "01", title: "Apply", desc: "Submit your application to see if you qualify." },
                { step: "02", title: "Review", desc: "We analyze your business needs and current growth barriers." },
                { step: "03", title: "Strategy", desc: "We build a custom marketing strategy." },
                { step: "04", title: "Launch", desc: "We execute, optimize, and scale the winning systems." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-primary flex items-center justify-center text-3xl font-bold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <span className="text-primary">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 6. QUALIFICATION / CLOSURE */}
      <section className="w-full py-32 px-4 md:px-8 text-center relative">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Are You Ready?</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            This application is for serious business owners ready to grow. We review each submission carefully and only reach out to qualified applicants.
          </p>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-border text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Premium Marketing. All rights reserved.</p>
      </footer>
    </main>
  );
}
