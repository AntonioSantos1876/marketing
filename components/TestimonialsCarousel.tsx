"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, DollarSign, ChevronLeft, ChevronRight, Target, Activity, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    id: 1,
    icon: <TrendingUp className="text-orange-500" size={24} />,
    value: "240",
    label: "Increased inquiries in 30 days",
    quote: "They completely re-engineered our acquisition pipeline. The sheer volume and quality of prospects jumping into our funnel right now is unprecedented.",
    author: "Sarah J.",
    role: "Senior Partner, Global Consulting",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    icon: <Users className="text-orange-500" size={24} />,
    value: "45+",
    label: "Qualified strategy calls per week",
    quote: "We had to pause our advertising engines because my sales team could not handle the calendar volume. The targeting is flawless.",
    author: "Michael R.",
    role: "B2B SaaS Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    icon: <DollarSign className="text-orange-500" size={24} />,
    value: "$420k",
    label: "Added pipeline revenue in Q1",
    quote: "Their omnipresent infrastructure is incredibly aggressive. They filtered out the tire-kickers and brought us only highly-capitalized buyers ready to execute.",
    author: "David L.",
    role: "Enterprise Logistics Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    icon: <Target className="text-orange-500" size={24} />,
    value: "18",
    label: "High-ticket enterprise clients closed",
    quote: "We stopped competing on price instantly. The brand positioning they engineered allowed us to immediately close contracts that were previously completely out of reach.",
    author: "Elena M.",
    role: "Managing Director, Tech Solutions",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 5,
    icon: <Activity className="text-orange-500" size={24} />,
    value: "3.8x",
    label: "Return on Ad Spend Strategy",
    quote: "It felt like turning on a light switch. Within 14 days, the volume of active, qualified discovery calls completely outpaced anything we had built internally over the last two years.",
    author: "James T.",
    role: "Co-Founder, Real Estate Group",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 6,
    icon: <ShieldCheck className="text-orange-500" size={24} />,
    value: "0",
    label: "Days spent cold-calling",
    quote: "I haven't picked up the phone to cold prospect once since the systems launched. The entire funnel is inbound, completely automated, and populated with targeted traffic.",
    author: "Rachel K.",
    role: "Principal Wealth Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-x-hidden px-4 md:px-12 py-8">
      <div className="relative min-h-[420px] sm:min-h-[380px] md:min-h-[260px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50;
              if (swipe) {
                if (offset.x > 0) prevSlide();
                else nextSlide();
              }
            }}
            className="absolute w-full"
          >
            <div className="glass-card mx-auto max-w-2xl bg-zinc-950 border border-white/5 rounded-xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-0 md:min-w-[140px]">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center md:mb-3">
                    {testimonials[currentIndex].icon}
                  </div>
                  <div className="text-left md:text-inherit">
                    <h4 className="text-2xl md:text-4xl font-black text-white mb-0.5">{testimonials[currentIndex].value}</h4>
                    <p className="text-orange-500 font-bold text-[8px] md:text-[9px] tracking-widest uppercase">{testimonials[currentIndex].label}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-base md:text-lg text-gray-300 italic leading-relaxed font-medium">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        className="w-full h-full object-cover filter grayscale contrast-125"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-foreground text-sm md:text-base">{testimonials[currentIndex].author}</p>
                      <p className="text-[10px] md:text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? "bg-primary w-8"
                : "bg-border hover:bg-primary/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border text-foreground hover:bg-primary hover:text-white transition-all z-20 hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border text-foreground hover:bg-primary hover:text-white transition-all z-20 hidden md:block"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
