"use client";

// Temporary declaration to prevent 'process' TS error until node modules are installed
declare var process: any;

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
    monthly_revenue: "Under $10,000",
    ready_to_start: "Immediately",
    why_good_fit: "",
    preferred_contact_method: "Email",
    consent_to_contact: false,
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Basic validation before moving to next step
    if (step === 1 && (!formData.full_name || !formData.email)) {
      setError("Please fill out all required fields to continue.");
      return;
    }
    setError(null);
    setStep((prev: number) => prev + 1);
  };
  const prevStep = () => setStep((prev: number) => prev - 1);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!formData.consent_to_contact) {
      setError("You must consent to be contacted to submit the application.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    // If Supabase keys are not set, just simulate success for testing
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000);
      return;
    }

    try {
      const { error: dbError } = await supabase.from('leads').insert([formData]);
      
      if (dbError) throw dbError;
      
      router.push("/thank-you");
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 bg-background flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full glass-card relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-border w-full">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="mb-8 mt-2">
          <h1 className="text-3xl font-bold mb-2">Application for Partnership</h1>
          <p className="text-muted-foreground text-sm">
            Please fill out this form truthfully. We use this to evaluate if your business is a strategic fit for our services.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={step === 4 ? submitForm : (e: any) => { e.preventDefault(); nextStep(); }} className="space-y-6">
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">1. Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Full Name *</label>
                  <input required type="text" value={formData.full_name} onChange={(e: any) => updateForm('full_name', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Email Address *</label>
                  <input required type="email" value={formData.email} onChange={(e: any) => updateForm('email', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e: any) => updateForm('phone', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Business Info */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">2. Your Business</h2>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Industry</label>
                <input type="text" value={formData.industry} onChange={(e: any) => updateForm('industry', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
              </div>
            </div>
          )}
          {/* STEP 3: Revenue Info */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">3. Revenue per month</h2>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Approximate monthly revenue?</label>
                <select value={formData.monthly_revenue} onChange={(e: any) => updateForm('monthly_revenue', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none">
                  <option>Under $10,000</option>
                  <option>$10,000 - $30,000</option>
                  <option>$30,000 - $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">How soon are you ready to start?</label>
                <select value={formData.ready_to_start} onChange={(e: any) => updateForm('ready_to_start', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none">
                  <option>Immediately</option>
                  <option>In 1-2 weeks</option>
                  <option>Within a month</option>
                  <option>Just researching</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Final Questions */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">4. Final Details</h2>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Why do you feel you are a good fit for this service? *</label>
                <textarea required rows={3} value={formData.why_good_fit} onChange={(e: any) => updateForm('why_good_fit', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Preferred contact method</label>
                <select value={formData.preferred_contact_method} onChange={(e: any) => updateForm('preferred_contact_method', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none">
                  <option>Email</option>
                  <option>Phone Call</option>
                  <option>Text Message</option>
                </select>
              </div>
              <div className="pt-4 border-t border-border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1" checked={formData.consent_to_contact} onChange={(e: any) => updateForm('consent_to_contact', e.target.checked)} />
                  <span className="text-sm text-muted-foreground">
                    I consent to be contacted regarding this application and agree that I am a serious business owner actively looking to invest in my growth.
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-4 border-t border-border/50">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="text-muted-foreground hover:text-foreground flex items-center gap-2 px-4 py-2">
                <ArrowLeft size={18} /> Back
              </button>
            ) : <span />}
            
            {step < 4 ? (
              <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2 py-2 px-6">
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2 py-2 px-8">
                {isSubmitting ? "Submitting..." : "Submit Application"} <CheckCircle2 size={18} />
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
