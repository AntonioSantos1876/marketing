"use client";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ArrowDown, CheckCircle2 } from "lucide-react";

const DAYS_DESKTOP = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAYS_MOBILE = ["Mon", "Wed", "Fri"];

function CalendarGrid({ mobile = false }: { mobile?: boolean }) {
  const days = mobile ? DAYS_MOBILE : DAYS_DESKTOP;

  return (
    <div className={`p-3 grid gap-1.5 h-[240px]`} style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
      {days.map((day, i) => {
        // Map mobile indices back to desktop positions
        const col = mobile ? [0, 2, 4][i] : i;
        return (
          <div key={day} className="flex flex-col gap-1 h-full">
            <div className="text-center font-bold text-[9px] text-white/80 uppercase border-b border-white/10 pb-1.5">{day}</div>
            <div className="flex-1 relative border-l border-white/10">
              {col === 0 && (
                <>
                  <div className="absolute top-[5%] left-0.5 right-0 h-10 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Strategy Call</div>
                  <div className="absolute top-[45%] left-0.5 right-0 h-8 bg-orange-500/20 text-orange-400 rounded text-[6px] font-bold p-0.5 leading-tight outline outline-1 outline-orange-500/30">Discovery</div>
                  <div className="absolute top-[68%] left-0.5 right-0 h-12 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Scale Session</div>
                </>
              )}
              {col === 1 && (
                <>
                  <div className="absolute top-[2%] left-0.5 right-0 h-16 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Onboarding</div>
                  <div className="absolute top-[50%] left-0.5 right-0 h-10 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Strategy</div>
                  <div className="absolute top-[80%] left-0.5 right-0 h-9 bg-orange-500/20 text-orange-400 rounded text-[6px] font-bold p-0.5 leading-tight outline outline-1 outline-orange-500/30">Closing</div>
                </>
              )}
              {col === 2 && (
                <>
                  <div className="absolute top-[10%] left-0.5 right-0 h-14 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Demo</div>
                  <div className="absolute top-[45%] left-0.5 right-0 h-20 bg-white text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Intensive Setup</div>
                </>
              )}
              {col === 3 && (
                <>
                  <div className="absolute top-[0%] left-0.5 right-0 h-10 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Deep Dive</div>
                  <div className="absolute top-[28%] left-0.5 right-0 h-14 bg-orange-500/20 text-orange-400 rounded text-[6px] font-bold p-0.5 leading-tight outline outline-1 outline-orange-500/30">Consulting</div>
                  <div className="absolute top-[65%] left-0.5 right-0 h-12 bg-orange-500 text-black rounded shadow text-[6px] font-black p-0.5 leading-tight">Closing Call</div>
                </>
              )}
              {col === 4 && (
                <>
                  <div className="absolute top-[5%] left-0.5 right-0 h-16 bg-orange-500 text-black rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] text-[6px] font-black p-0.5 leading-tight overflow-hidden">
                    <CheckCircle2 size={8} className="text-black float-right mt-0.5" />
                    Signed Client
                  </div>
                  <div className="absolute top-[55%] left-0.5 right-0 h-10 bg-orange-500/20 text-orange-400 rounded text-[6px] font-bold p-0.5 leading-tight outline outline-1 outline-orange-500/30">Follow Up</div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CalendarProof() {
  return (
    <div className="w-full py-10">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
          The Volume <span className="text-orange-500">Difference.</span>
        </h3>
        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold">
          This is what happens when you plug into our architecture.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto px-4">

        {/* BEFORE */}
        <div className="w-full bg-zinc-900 border border-white/5 rounded overflow-hidden shadow-2xl relative border-t-4 border-t-zinc-700">
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded font-black uppercase tracking-widest text-xs backdrop-blur-sm transform -rotate-3 shadow-xl">
              Empty Pipeline
            </span>
          </div>
          <div className="p-3 border-b border-white/5 bg-zinc-950">
            <div className="flex items-center gap-2 text-white/20">
              <CalendarIcon size={13} />
              <span className="font-bold text-[10px] uppercase tracking-widest">Before</span>
            </div>
          </div>
          <div className="p-3 grid grid-cols-3 md:grid-cols-5 gap-1.5 h-[180px] opacity-35">
            {["Mon", "Wed", "Fri"].map((day, i) => (
              <div key={day} className="flex flex-col gap-1 h-full">
                <div className="text-center font-bold text-[9px] text-white/20 uppercase border-b border-white/5 pb-1">{day}</div>
                <div className="flex-1 relative border-l border-white/5">
                  {i === 1 && <div className="absolute top-[20%] left-0.5 right-0 h-10 bg-white/5 rounded border border-white/10 text-[6px] p-0.5 text-white/20 truncate">General Inquiry</div>}
                  {i === 2 && <div className="absolute top-[55%] left-0.5 right-0 h-8 bg-zinc-800 rounded border border-zinc-700 text-[6px] p-0.5 text-red-400/40 line-through truncate">Canceled</div>}
                </div>
              </div>
            ))}
            {/* Hidden on mobile, visible md+ */}
            {["Tue", "Thu"].map((day) => (
              <div key={day} className="hidden md:flex flex-col gap-1 h-full">
                <div className="text-center font-bold text-[9px] text-white/20 uppercase border-b border-white/5 pb-1">{day}</div>
                <div className="flex-1 border-l border-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* ARROW */}
        <ArrowDown size={32} className="text-orange-500 shrink-0" />

        {/* AFTER */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full bg-zinc-900 border border-orange-500/30 rounded overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.12)] border-t-4 border-t-orange-500 relative"
        >
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-orange-500/10 text-orange-500 border border-orange-500/30 px-2.5 py-1 rounded font-black uppercase tracking-widest text-[8px] flex items-center gap-1">
              <CheckCircle2 size={10} /> Active Scale
            </span>
          </div>
          <div className="p-3 border-b border-white/5 bg-zinc-950">
            <div className="flex items-center gap-2 text-orange-500">
              <CalendarIcon size={13} />
              <span className="font-bold text-[10px] uppercase tracking-widest">After</span>
            </div>
          </div>
          {/* Mobile: 3-col */}
          <div className="md:hidden">
            <CalendarGrid mobile />
          </div>
          {/* Desktop: 5-col */}
          <div className="hidden md:block">
            <CalendarGrid />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
