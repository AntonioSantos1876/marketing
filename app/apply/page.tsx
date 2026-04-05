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
    monthly_revenue: "Under $10,000",
    ready_to_start: "Immediately",
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
    // Basic numeric check: digits, and optional leading +
    return /^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-()]/g, ''));
  };

  const nextStep = () => {
    // Basic validation before moving to next step
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

    // If Supabase keys are not set, just simulate success for testing
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000);
      return;
    }

    try {
      // Filter out fields that are NOT in the database table 'leads'
      // 'worked_with_agency' is currently not in the schema.sql columns
      const { ...submissionData } = formData;
      // For now, let's omit 'worked_with_agency' from the database insert (it will stay in local state)
      const sanitizedData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        monthly_revenue: formData.monthly_revenue,
        ready_to_start: formData.ready_to_start,
        worked_with_agency: formData.worked_with_agency,
        why_good_fit: formData.why_good_fit,
        preferred_contact_method: formData.preferred_contact_method,
        consent_to_contact: formData.consent_to_contact
      };

      const { error: dbError } = await supabase.from('leads').insert([sanitizedData]);
      
      if (dbError) throw dbError;
      
      router.push("/thank-you");
    } catch (err: any) {
      console.error("Submission error:", err);
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
                  <label className="block text-sm text-muted-foreground mb-1">Phone Number *</label>
                  <input required type="tel" value={formData.phone} onChange={(e: any) => updateForm('phone', e.target.value)} placeholder="e.g. 1234567890" className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2 flex items-start gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="consent"
                    checked={formData.consent_to_contact} 
                    onChange={(e: any) => updateForm('consent_to_contact', e.target.checked)} 
                    className="mt-1 w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground leading-tight">
                    I consent to be contacted via email or phone regarding my application and future marketing services.
                  </label>
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
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Have you worked with a marketing agency before?</label>
                <select value={formData.worked_with_agency} onChange={(e: any) => updateForm('worked_with_agency', e.target.value)} className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none">
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
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  We've received your details. To expedite the process, please book your free growth consultation call below.
                </p>
                
                <a 
                  href="https://calendly.com/macrawford1876/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full max-w-sm flex items-center justify-center gap-3 text-xl py-5"
                >
                  Book Your Free Demo <ArrowRight size={24} />
                </a>
                
                <p className="mt-6 text-sm text-muted-foreground italic">
                  * Note: You will be redirected to our scheduling page.
                </p>
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
                {step === 3 ? "Submit & Continue" : "Next Step"} <ArrowRight size={18} />
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </main>
  );
}
