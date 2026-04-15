"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    industry: "",
    monthly_revenue: "Under $5,000",
    worked_with_agency: "Not yet",
    why_good_fit: "",
    preferred_contact_method: "Email",
    consent_to_contact: true,
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-()]/g, ''));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.full_name || !formData.email) {
        setError("Please fill out all required fields to continue.");
        return;
      }
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address (e.g. name@example.com).");
        return;
      }
      if (formData.phone && !validatePhone(formData.phone)) {
        setError("Please enter a valid phone number (digits only).");
        return;
      }
    }
    if (step === 3) {
      submitForm(null);
    }
    setError(null);
    setStep((prev: number) => prev + 1);
  };
  
  const prevStep = () => setStep((prev: number) => prev - 1);

  const submitForm = async (e: any) => {
    e?.preventDefault?.();
    if (!formData.consent_to_contact) {
      setError("You must consent to be contacted to submit the application.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000);
      return;
    }

    try {
      const sanitizedData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        monthly_revenue: formData.monthly_revenue,
        worked_with_agency: formData.worked_with_agency,
        why_good_fit: formData.why_good_fit,
        preferred_contact_method: formData.preferred_contact_method,
        consent_to_contact: formData.consent_to_contact
      };

      const { error: dbError } = await supabase.from('leads').insert([sanitizedData]);
      
      if (dbError) throw dbError;
      
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, full_name: formData.full_name }),
        });
      } catch (emailErr) {
        console.error("Failed to trigger email system:", emailErr);
      }
      
      router.push("/thank-you");
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("An error occurred while submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-black border border-white/20 p-4 text-white font-medium focus:border-orange-500 outline-none transition-colors";
  const labelStyle = "block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2";

  return (
    <main className="min-h-screen py-32 px-4 md:px-8 bg-black flex flex-col items-center justify-center relative overflow-hidden text-white selection:bg-orange-500 selection:text-white">
      
      {/* Background Image Strict Grayscale Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/85 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1920&auto=format&fit=crop" 
          alt="Application Background" 
          className="w-full h-full object-cover filter grayscale contrast-125 opacity-70"
        />
      </div>

      <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 relative overflow-hidden z-10 shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-black w-full">
          <div 
            className="h-full bg-orange-500 transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Application for <span className="text-orange-500">Scale.</span></h1>
            <p className="text-gray-400 font-medium leading-relaxed">
              Please fill out this form truthfully. We use this to evaluate if your business is a strategic fit for our highly exclusive infrastructure.
            </p>
            {error && (
              <div className="mt-6 p-4 bg-red-900/40 border border-red-500/50 text-red-400 text-sm font-bold">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={step === 4 ? submitForm : (e: any) => { e.preventDefault(); nextStep(); }} className="space-y-8">
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-orange-500">1. Required Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Full Name *</label>
                    <input required type="text" value={formData.full_name} onChange={(e: any) => updateForm('full_name', e.target.value)} className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Email Address *</label>
                    <input required type="email" value={formData.email} onChange={(e: any) => updateForm('email', e.target.value)} className={inputStyle} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelStyle}>Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={(e: any) => updateForm('phone', e.target.value)} placeholder="e.g. +1 (555) 000-0000" className={inputStyle} />
                  </div>
                  <div className="md:col-span-2 flex items-start gap-4 pt-4 border-t border-white/10">
                    <input 
                      type="checkbox" 
                      id="consent"
                      checked={formData.consent_to_contact} 
                      onChange={(e: any) => updateForm('consent_to_contact', e.target.checked)} 
                      className="mt-1 w-5 h-5 accent-orange-500 bg-black border border-white/20"
                    />
                    <label htmlFor="consent" className="text-sm font-medium text-gray-400 leading-tight">
                      I consent to be contacted via email or phone regarding my application and future strategic services.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Business Info */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-orange-500">2. Organization</h2>
                <div>
                  <label className={labelStyle}>Industry / Niche *</label>
                  <input required type="text" value={formData.industry} onChange={(e: any) => updateForm('industry', e.target.value)} placeholder="e.g. Real Estate, E-Commerce..." className={inputStyle} />
                </div>
              </div>
            )}

            {/* STEP 3: Revenue Info */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-orange-500">3. Scale Potential</h2>
                <div>
                  <label className={labelStyle}>Approximate monthly revenue?</label>
                  <select value={formData.monthly_revenue} onChange={(e: any) => updateForm('monthly_revenue', e.target.value)} className={inputStyle}>
                    <option>Under $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $30,000</option>
                    <option>$30,000 - $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Have you worked with a marketing agency before?</label>
                  <select value={formData.worked_with_agency} onChange={(e: any) => updateForm('worked_with_agency', e.target.value)} className={inputStyle}>
                    <option>Not yet</option>
                    <option>Yes, in the past</option>
                    <option>Yes, currently working with one</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Success & Calendly */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 py-8 text-center px-4">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-8 border border-orange-500/30">
                    <CheckCircle2 size={48} className="text-orange-500" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Data Received.</h2>
                  <p className="text-gray-400 font-medium text-lg mb-10 max-w-sm mx-auto">
                    To immediately accelerate this process, secure your onboarding call block below.
                  </p>
                  
                  <a 
                    href="https://calendly.com/macrawford1876/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-widest text-xl py-6 transition-colors shadow-[0_0_30px_rgba(255,102,0,0.3)]"
                  >
                    Lock Call Time <ArrowRight size={24} />
                  </a>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="text-gray-400 hover:text-white font-bold uppercase tracking-widest text-sm flex items-center gap-3 py-3 transition-colors">
                  <ArrowLeft size={18} /> Back
                </button>
              ) : <span />}
              
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="flex items-center gap-3 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-widest text-sm py-4 px-8 transition-colors">
                  {step === 3 ? "Submit Data" : "Continue"} <ArrowRight size={18} />
                </button>
              ) : null}
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
