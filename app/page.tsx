import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, ShieldCheck } from "lucide-react";

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
              See If You Qualify <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="pt-12 text-muted-foreground/80 text-sm flex gap-6 justify-center">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Proven Systems</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Selective Client Roster</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> High-Ticket Results</span>
          </div>
        </div>
      </section>

      {/* 2. SHORT DESCRIPTION / OFFER SECTION */}
      <section className="w-full py-24 px-4 md:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Do.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don't offer generic templates or overnight miracles. We build custom lead generation and brand visibility systems that connect you with your ideal customers. 
            </p>
            <ul className="space-y-4">
              {[
                "Targeted Ad Strategy that actually converts",
                "Scalable Client Acquisition Systems",
                "Advanced Customer Targeting",
                "Premium Digital Presence Improvement"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-card flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 border-b border-border pb-4">Who This Is For</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3"><Target className="text-primary" size={20} /> Business owners ready to grow</li>
              <li className="flex items-center gap-3"><Target className="text-primary" size={20} /> Companies ready to invest in real marketing</li>
              <li className="flex items-center gap-3"><Target className="text-primary" size={20} /> Brands that need better lead generation</li>
            </ul>
            <div className="mt-8 p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-200">
                <span className="font-bold text-red-400">Not for everyone:</span> We do not work with businesses looking for instant miracles or companies unprepared to invest in their own growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESULTS / SOCIAL PROOF */}
      <section className="w-full py-24 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Results Speak Louder.</h2>
            <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <div className="glass-card hover:bg-card-hover transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <h4 className="text-4xl font-bold text-foreground mb-2">+240%</h4>
              <p className="text-muted-foreground font-medium mb-4">Increased inquiries in 30 days</p>
              <p className="text-sm text-muted-foreground/80 italic">"They completely transformed how we capture leads. The quality of prospects is night and day."</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-bold">Sarah J.</p>
                  <p className="text-xs text-muted-foreground/80">Premium Consultant</p>
                </div>
              </div>
            </div>
            
            {/* Stat Card 2 */}
            <div className="glass-card hover:bg-card-hover transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Users className="text-primary" size={24} />
              </div>
              <h4 className="text-4xl font-bold text-foreground mb-2">50+</h4>
              <p className="text-muted-foreground font-medium mb-4">Qualified leads per week</p>
              <p className="text-sm text-muted-foreground/80 italic">"We had to pause our ads because we got too many highly qualified calls. Best problem to have."</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-bold">Michael R.</p>
                  <p className="text-xs text-muted-foreground/80">B2B SaaS Founder</p>
                </div>
              </div>
            </div>
            
            {/* Stat Card 3 */}
            <div className="glass-card hover:bg-card-hover transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Target className="text-primary" size={24} />
              </div>
              <h4 className="text-4xl font-bold text-foreground mb-2">$120k</h4>
              <p className="text-muted-foreground font-medium mb-4">Added revenue in Q1</p>
              <p className="text-sm text-muted-foreground/80 italic">"The strategy was incredibly sharp. They filtered out the noise and brought us only serious buyers."</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-bold">David L.</p>
                  <p className="text-xs text-muted-foreground/80">Service Business Owner</p>
                </div>
              </div>
            </div>
          </div>
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

      {/* 5. FAQ SECTION */}
      <section className="w-full py-24 px-4 md:px-8 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know before applying.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">Who is this service for?</h4>
              <p className="text-muted-foreground">Our services are strictly for serious business owners and established brands who are ready to invest in scaling their lead generation and overall digital presence.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">What happens after I apply?</h4>
              <p className="text-muted-foreground">We carefully review your application to determine if you are a strategic fit. If qualified, our team will reach out via your preferred contact method within 24-48 hours to schedule a growth consultation.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">Do you work with all types of businesses?</h4>
              <p className="text-muted-foreground">No. We focus on quality over quantity. We do not work with businesses looking for "overnight viral success" or those unwilling to commit a proper monthly marketing budget.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">How soon will I hear back?</h4>
              <p className="text-muted-foreground">If your application is accepted, you will hear back from us typically within 24 to 48 hours.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">What makes this different from regular marketing help?</h4>
              <p className="text-muted-foreground">We do not provide generic templates or random ad deployments. We build customized, high-converting growth systems specifically engineered to acquire premium clients and produce measurable ROI.</p>
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
          <Link href="/apply" className="btn-primary inline-flex items-center gap-2 text-xl px-12 py-4">
            Apply Now <ArrowRight size={24} />
          </Link>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-border text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Premium Marketing. All rights reserved.</p>
      </footer>
    </main>
  );
}
