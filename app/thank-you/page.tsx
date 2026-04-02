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

        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Thank you for applying. We review each submission carefully. If your business appears to be a strong fit for our strategic services, we will reach out via your preferred contact method within 24-48 hours.
        </p>

        <div className="p-4 bg-muted/50 border border-border rounded-lg mb-8">
          <p className="text-sm text-foreground">
            <strong>Next Step:</strong> Keep an eye on your inbox. Applications are processed in the order they are received.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a 
            href="https://calendly.com/your-business/demo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Book Your Demo Call <ArrowRight size={18} />
          </a>
          
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
