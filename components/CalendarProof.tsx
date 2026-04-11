"use client";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

// --- DATA ---
type DayData = { day: number; amount: string; isBooked: boolean; isLoss?: boolean };

// BEFORE: Sparse / empty month
const beforeDays: DayData[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const bookedDays = [3, 11, 18, 24];
  const isBooked = bookedDays.includes(day);
  return { day, amount: isBooked ? `$${[47, 82, 35, 62][bookedDays.indexOf(day)]}` : "", isBooked };
});

// AFTER: Fully packed with revenue
const amounts = [
  "$476", "$47", "$277", "$577", "$149", "$57", "$125",
  "$447", "$106", "$120", "$574", "$470", "$55", "$193",
  "$394", "$35", "$128", "$4.46", "$287", "$126", "$240",
  "$314", "$129", "$182", "$391", "$267", "$6.26", "$34",
  "$198", "$312"
];
const afterDays: DayData[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  amount: amounts[i] ?? `$${Math.floor(Math.random() * 400 + 50)}`,
  isBooked: true,
  isLoss: [6, 14, 18].includes(i + 1),
}));

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
// Month starts on Friday (index 5 in 0-Sun grid) = offset 5
const START_OFFSET = 5;

function MonthCalendar({ days, dim = false }: { days: DayData[]; dim?: boolean }) {
  return (
    <div className="p-3">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className={`text-center text-[9px] font-bold uppercase pb-1 ${dim ? "text-white/20" : "text-white/50"}`}>{d}</div>
        ))}
      </div>
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Offset blanks */}
        {Array.from({ length: START_OFFSET }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map(({ day, amount, isBooked, isLoss }) => (
          <div
            key={day}
            className={`rounded aspect-square flex flex-col items-center justify-center text-center transition-all ${!isBooked
                ? dim
                  ? "bg-zinc-900 border border-white/5"
                  : "bg-zinc-800/40 border border-white/5"
                : isLoss
                  ? "bg-red-500/80 border border-red-400/50 shadow-sm"
                  : dim
                    ? "bg-zinc-800 border border-white/10"
                    : "bg-green-500 border border-green-400/60 shadow-[0_0_6px_rgba(34,197,94,0.3)]"
              }`}
          >
            <span className={`text-[7px] font-bold leading-none ${isBooked ? (isLoss ? "text-white" : "text-black") : "text-white/20"}`}>
              {day}
            </span>
            {isBooked && amount && (
              <span className={`text-[6px] font-black leading-none mt-0.5 ${isLoss ? "text-white" : "text-black"}`}>{amount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarProof() {
  return (
    <div className="w-full py-10">
      <div className="text-center mb-10 md:mb-12">
        <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
          The Volume <span className="text-orange-500">Difference.</span>
        </h3>
        <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-widest font-bold px-4">
          What your calendar looks like before vs. after plugging into our system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">

        {/* BEFORE */}
        <div className="bg-zinc-950 border border-white/5 rounded-xl overflow-hidden shadow-xl border-t-4 border-t-zinc-700 relative">
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none rounded-xl" />
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg font-black uppercase tracking-widest text-[10px] md:text-xs backdrop-blur-sm transform -rotate-3 shadow-xl">
              Empty Pipeline
            </span>
          </div>
          <div className="p-3 border-b border-white/5 bg-zinc-900/80 flex items-center gap-2">
            <CalendarIcon size={12} className="text-white/20" />
            <span className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-white/20">November — Before</span>
          </div>
          <MonthCalendar days={beforeDays} dim />
          <div className="px-3 pb-3 border-t border-white/5 pt-2 flex justify-between items-center">
            <span className="text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-widest">Monthly Revenue</span>
            <span className="text-xs md:text-sm font-black text-red-500/70">$226</span>
          </div>
        </div>

        {/* AFTER */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-950 border border-green-500/20 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.08)] border-t-4 border-t-green-500 relative"
        >
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-lg font-black uppercase tracking-widest text-[7px] md:text-[8px] flex items-center gap-1">
              <CheckCircle2 size={8} /> Fully Booked
            </span>
          </div>
          <div className="p-3 border-b border-white/5 bg-zinc-900/80 flex items-center gap-2">
            <CalendarIcon size={12} className="text-green-500" />
            <span className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-green-500">November — After</span>
          </div>
          <MonthCalendar days={afterDays} />
          <div className="px-3 pb-3 border-t border-white/5 pt-2 flex justify-between items-center">
            <span className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase tracking-widest">Monthly Revenue</span>
            <span className="text-xs md:text-sm font-black text-green-400">+$7,229.13</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
