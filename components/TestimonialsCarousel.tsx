"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    icon: <TrendingUp className="text-primary" size={24} />,
    value: "240",
    label: "Increased inquiries in 30 days",
    quote: "They completely transformed how we capture leads. The quality of prospects is night and day.",
    author: "Sarah J.",
    role: "Premium Consultant"
  },
  {
    id: 2,
    icon: <Users className="text-primary" size={24} />,
    value: "30+",
    label: "Qualified leads per week",
    quote: "We had to pause our ads because we got too many highly qualified calls. Best problem to have.",
    author: "Michael R.",
    role: "B2B SaaS Founder"
  },
  {
    id: 3,
    icon: <DollarSign className="text-primary" size={24} />,
    value: "$120k",
    label: "Added revenue in Q1",
    quote: "The strategy was incredibly sharp. They filtered out the noise and brought us only serious buyers.",
    author: "David L.",
    role: "Service Business Owner"
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
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden px-4 py-8">
      <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
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
            <div className="glass-card mx-auto max-w-2xl bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    {testimonials[currentIndex].icon}
                  </div>
                  <h4 className="text-5xl font-bold text-foreground mb-1">{testimonials[currentIndex].value}</h4>
                  <p className="text-primary font-medium text-sm tracking-wide uppercase">{testimonials[currentIndex].label}</p>
                </div>
                
                <div className="flex-1">
                  <p className="text-xl md:text-2xl text-foreground italic mb-8 leading-relaxed font-medium">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <div className="w-12 h-12 bg-muted rounded-full overflow-hidden border border-border">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold">
                        {testimonials[currentIndex].author[0]}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonials[currentIndex].author}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
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
