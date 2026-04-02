import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen py-20 px-4 md:px-8 bg-background flex flex-col items-center justify-center text-center">
      <div className="max-w-lg w-full glass-card p-12">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <CheckCircle2 className="text-primary" size={40} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Application Received</h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Thank you for applying. We review each submission carefully. If your business appears to be a strong fit for our strategic services, we will reach out via your preferred contact method within 24-48 hours.
        </p>
        
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg mb-8">
          <p className="text-sm text-gray-300">
            <strong>Next Step:</strong> Keep an eye on your inbox. Applications are processed in the order they are received.
          </p>
        </div>
        
        <Link href="/" className="btn-secondary inline-flex items-center gap-2">
          Return Home <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}
