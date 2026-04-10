"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Activity, DollarSign, Globe, Target } from "lucide-react";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { motion } from "framer-motion";

const images = {
  hero: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop",
  bento1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  bento2: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  bento3: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  process: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
  results: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop",
  cta: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
};

export default function LandingPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center bg-black text-white font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 1. ARCHITECTURAL HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-12 py-20 overflow-hidden">
        {/* Background Image Strict Grayscale Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={images.hero} 
            alt="Corporate Architecture" 
            className="w-full h-full object-cover filter grayscale contrast-125 opacity-70"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start justify-center flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-orange-500 uppercase tracking-widest text-xs font-bold mb-8"
          >
            <ShieldCheck size={16} />
            <span>Accepting Applications for Q3</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter uppercase max-w-5xl"
          >
            Scale Your <br />
            Business <br />
            <span className="text-orange-500 block mt-2">With Precision.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-3xl text-gray-300 font-medium max-w-2xl mt-10 border-l-4 border-orange-500 pl-6"
          >
            More Leads. Better Positioning. Stronger Growth. We build omnipresent marketing systems for serious enterprises.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/apply" className="group flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-bold text-xl px-10 py-5 transition-all duration-300">
              Book Your Strategy Call <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. HIGH-IMPACT BENTO GRID SECTION */}
      <section className="w-full py-32 px-4 md:px-12 bg-black relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Our <span className="text-orange-500">Arsenal.</span></h2>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl font-medium">We don't rely on guesswork. We deploy highly calibrated, scalable digital advertising campaigns built specifically to penetrate your high-value market sectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
            
            {/* Bento 1: Targeted Strategy */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative col-span-1 bg-zinc-900 overflow-hidden group border border-white/10 hover:border-orange-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors z-10" />
              <img src={images.bento1} alt="Target Strategy" className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-20 p-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 bg-orange-500 text-black flex items-center justify-center rounded-sm">
                  <Target size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase mb-4">Targeted Execution</h3>
                  <ul className="space-y-3 font-medium text-gray-200">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" size={20} /> Laser-focused Ad Strategy</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" size={20} /> High-Converting Creative</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Bento 2: Global Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative col-span-1 bg-zinc-900 overflow-hidden group border border-white/10 hover:border-orange-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors z-10" />
              <img src={images.bento2} alt="Global Tracking" className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-20 p-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 bg-white text-black flex items-center justify-center rounded-sm">
                  <Globe size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase mb-4">Omnipresent Tracking</h3>
                  <ul className="space-y-3 font-medium text-gray-200">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" size={20} /> Deep Audience Analytics</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orange-500" size={20} /> Omnichannel Remarketing</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Bento 3: Financial ROI (Spans 2 columns on large screens) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 bg-orange-500 overflow-hidden group border border-white/10"
            >
              <div className="absolute inset-0 bg-orange-600/20 group-hover:bg-orange-600/40 mix-blend-multiply transition-colors z-10" />
              <img src={images.bento3} alt="Financial Strategy" className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-20 p-10 h-full flex flex-col justify-between text-black">
                <div className="w-16 h-16 bg-black text-orange-500 flex items-center justify-center rounded-sm shadow-xl">
                  <DollarSign size={36} />
                </div>
                <div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-none">Measured In Revenue.</h3>
                  <p className="text-black/80 font-bold text-lg mb-8">We systematically scale operations. We ensure our partners make at least their entire investment back in hard, measurable returns.</p>
                  
                  <div className="space-y-4">
                    <div className="bg-black/90 backdrop-blur-sm p-4 text-white border-l-4 border-white">
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Total Generated</p>
                      <p className="text-4xl font-black">$7.2M+</p>
                    </div>
                    <div className="bg-black/90 backdrop-blur-sm p-4 text-white border-l-4 border-white">
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Average ROAS</p>
                      <p className="text-4xl font-black text-orange-500">4.2X</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

             {/* Bento 4: Scalability */}
             <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative col-span-1 md:col-span-2 lg:col-span-2 bg-zinc-900 overflow-hidden group border border-white/10 hover:border-orange-500/50 transition-colors duration-500 h-[300px] lg:h-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10" />
              <img src={images.process} alt="Scalable Systems" className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-40 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-20 p-10 h-full flex flex-col justify-center max-w-xl">
                <div className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-sm mb-6 border border-white/20">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">Infinite Scale.</h3>
                <p className="text-lg text-gray-300 font-medium">Over 28+ enterprises scaled successfully using our proprietary infrastructure and continuous optimization methodology.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section className="w-full py-32 px-4 md:px-12 bg-black border-y border-white/10 overflow-hidden relative z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/90 z-10" />
          <img src={images.process} alt="Process Flow" className="w-full h-full object-cover filter grayscale" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">The Blueprint.</h2>
              <p className="text-xl text-gray-400 mt-4 font-medium">A clear, aggressive path to scaling operations without the fluff.</p>
            </div>
            <div className="hidden md:block h-0.5 bg-white/20 w-full relative top-[-15px]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", desc: "Submit your application to see if you qualify. Strict standards apply." },
              { step: "02", title: "Review", desc: "Deep analytical teardown of your current funnels and barriers." },
              { step: "03", title: "Strategy", desc: "Custom omnichannel architecture designed for immediate impact." },
              { step: "04", title: "Execution", desc: "We launch, ruthlessly optimize, and drive relentless scale." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-zinc-900 border border-white/10 p-10 hover:bg-zinc-800 transition-colors group"
              >
                <div className="text-6xl font-black text-white/10 group-hover:text-orange-500/20 transition-colors mb-6">{item.step}</div>
                <h4 className="text-2xl font-black uppercase text-white mb-4 border-l-2 border-orange-500 pl-3">{item.title}</h4>
                <p className="text-base font-medium text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESULTS / SOCIAL PROOF */}
      <section className="w-full py-40 px-4 md:px-12 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/85 z-10" />
          <img src={images.results} alt="Client Results" className="w-full h-full object-cover filter grayscale contrast-125" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Social <span className="text-orange-500">Proof.</span></h2>
            <p className="text-xl text-gray-400 mt-4 font-medium uppercase tracking-widest">Do not just take our word for it.</p>
          </div>
          
          <div className="backdrop-blur-sm">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* 5. QUALIFICATION / CLOSURE */}
      <section className="w-full py-48 px-4 md:px-12 text-center relative overflow-hidden bg-orange-500 text-black border-t border-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-orange-500/90 mix-blend-multiply z-10" />
          <img src={images.cta} alt="Are you ready?" className="w-full h-full object-cover filter grayscale mix-blend-overlay opacity-60" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            Are You <br/> Ready To Scale?
          </h2>
          <p className="text-xl md:text-3xl font-bold mb-12 leading-tight max-w-3xl mx-auto opacity-80">
            This invitation is strictly for serious business owners ready to grow out of their current plateau.
          </p>
          
          <Link href="/apply" className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-900 font-black uppercase tracking-widest text-xl px-12 py-6 transition-all duration-300 hover:scale-105 border-4 border-transparent shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            Book Free Demo Call <ArrowRight size={24} />
          </Link>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full py-12 border-t border-white/10 bg-black text-center text-gray-400 font-bold uppercase tracking-widest text-xs z-20 relative">
        <p>&copy; {new Date().getFullYear()} Premium Marketing Portfolio. Restricted Access.</p>
      </footer>
    </main>
  );
}
