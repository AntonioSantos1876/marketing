"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Mail, Phone, ExternalLink, Globe, Briefcase, Target, ShieldCheck, Clock, Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', id)
          .single();
          
        if (data) {
          setLead(data);
          setStatus(data.lead_status || "New");
          setNotes(data.admin_notes || "");
        }
      }
      setLoading(false);
    };
    
    fetchLead();
  }, [id]);

  // Intelligent Note Parser Pipeline
  useEffect(() => {
    if (!lead || !notes) return;
    
    let updatedLead = { ...lead };
    let hasChanges = false;
    
    // Parse Business
    const bMatch = notes.match(/Business(?:\sName)?:\s*(.+)/i);
    if (bMatch && bMatch[1].trim() !== lead.business_name) {
      updatedLead.business_name = bMatch[1].trim();
      hasChanges = true;
    }
    
    // Parse Website / Social
    const wMatch = notes.match(/Website:\s*(.+)/i);
    const sMatch = notes.match(/Social:\s*(.+)/i);
    let webStr = [];
    if (wMatch) webStr.push(`Web: ${wMatch[1].trim()}`);
    if (sMatch) webStr.push(`Social: ${sMatch[1].trim()}`);
    if (webStr.length > 0) {
      const combined = webStr.join(' | ');
      if (combined !== lead.website_or_social) {
        updatedLead.website_or_social = combined;
        hasChanges = true;
      }
    }
    
    // Parse Budget
    const budMatch = notes.match(/Budget:\s*(.+)/i);
    if (budMatch && budMatch[1].trim() !== lead.monthly_budget) {
      updatedLead.monthly_budget = budMatch[1].trim();
      hasChanges = true;
    }

    if (hasChanges) {
      setLead(updatedLead);
    }
  }, [notes]); // Re-parse instantly on every keystroke

  const saveUpdates = async (forceStatus?: string) => {
    setSaving(true);
    const finalStatus = forceStatus || status;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase
        .from('leads')
        .update({ 
          lead_status: finalStatus, 
          admin_notes: notes, 
          business_name: lead.business_name,
          website_or_social: lead.website_or_social,
          monthly_budget: lead.monthly_budget,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
    }
    if (forceStatus) setStatus(forceStatus);
    setSaving(false);
  };

  const performSave = async () => {
    await saveUpdates();
    alert("Record completely synced to database.");
  };

  const sendPricingEmail = async () => {
    if (!lead || !lead.email) return;
    setSendingEmailId(lead.id);
    
    try {
      const res = await fetch('/api/send-pricing-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lead.email, full_name: lead.full_name })
      });
      
      const responseData = await res.json();
      
      if (res.ok) {
         await saveUpdates('Contacted');
         alert(`Success! Automated Pricing Email dispatched directly to ${lead.full_name}.`);
      } else {
         alert(`Failed to dispatch email. System intercept: ${responseData.error?.message || responseData.error || 'Check active API keys.'}`);
      }
    } catch (e) {
      console.error(e);
      alert('Network failure reaching delivery grids.');
    } finally {
      setSendingEmailId(null);
    }
  };

  if (loading) return <div className="p-12 text-center text-muted-foreground animate-pulse flex items-center justify-center h-full font-bold uppercase tracking-widest text-xs">Accessing Infrastructure...</div>;
  if (!lead) return (
    <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center h-full">
      <p className="text-red-500 font-bold">Data entity not found or corrupted.</p>
      <button onClick={() => router.push('/admin/leads')} className="btn-primary py-2 px-6">Return to Database</button>
    </div>
  );

  return (
    <div className="h-full flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 overflow-hidden">
      {/* HEADER SECTION - Fixed height */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div className="space-y-1">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-1 transition-colors"
          >
            <ArrowLeft size={12} /> Back to Database
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground truncate max-w-[300px]">{lead.full_name}</h1>
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase border ${getStatusColorActive(status)}`}>
              {status}
            </span>
          </div>
          <p className="text-muted-foreground text-[10px] sm:text-xs flex items-center gap-2 font-medium">
            <Clock size={12} /> Target Identified {new Date(lead.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={sendPricingEmail}
            disabled={sendingEmailId === lead.id}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
              sendingEmailId === lead.id 
              ? 'bg-orange-500/20 text-orange-500 border-orange-500/30 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600 text-black border-transparent shadow-[0_0_20px_rgba(255,102,0,0.2)]'
            }`}
          >
            {sendingEmailId === lead.id ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Send Pricing
          </button>
          <a 
            href={`mailto:${lead.email}`}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-bold border border-border transition-all"
          >
            <Mail size={16} /> Email
          </a>
          <a 
            href={`tel:${lead.phone}`}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold border border-primary/20 transition-all"
          >
            <Phone size={16} /> Call
          </a>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DATA COLUMN - Scrollable */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 scrollbar-thin">
          
          {/* CORE INTELLIGENCE CARD */}
          <div className="glass-card p-0 overflow-hidden border border-border/40 shadow-xl">
            <div className="px-6 py-4 border-b border-border bg-muted/10 flex items-center gap-3">
              <ShieldCheck size={18} className="text-green-500" />
              <h2 className="text-base font-bold">Profile Intelligence</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <DetailItem label="Industry / Niche" value={lead.industry} />
              <DetailItem label="Reported Revenue" value={lead.monthly_budget || lead.monthly_revenue} highlight />
              <DetailItem label="Agency Experience" value={lead.worked_with_agency || lead.worked_with_agency_before || "Not yet"} />
              <DetailItem label="Preferred Contact" value={lead.preferred_contact_method || "Email"} />
            </div>
          </div>

          {/* PARSED METRICS CARD */}
          <div className="glass-card p-0 overflow-hidden border border-border/40 shadow-xl">
            <div className="px-6 py-4 border-b border-border bg-muted/10 flex items-center gap-3">
              <Globe size={18} className="text-blue-500" />
              <h2 className="text-base font-bold">Parsed Business Data</h2>
              <span className="text-[9px] uppercase tracking-widest text-primary/80 font-bold bg-primary/10 px-2 py-0.5 rounded ml-auto">Auto-Generated</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <DetailItem label="Business Name" value={lead.business_name} />
              <DetailItem label="Website / Social" isLink value={lead.website_or_social} />
            </div>
          </div>
        </div>

        {/* SIDEBAR - ACTION CENTER - Scrollable if needed */}
        <div className="flex flex-col gap-6 min-h-0 overflow-y-auto pr-1 scrollbar-thin">
          <div className="glass-card p-6 border border-border shadow-2xl flex flex-col h-full lg:max-h-none relative">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border flex-shrink-0">
               <Briefcase size={18} className="text-primary" />
               <h3 className="font-bold text-base">Control Center</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-6 min-h-0">
              <div className="flex-shrink-0">
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Lead Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl p-3 text-xs font-bold text-foreground focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="New">New Application</option>
                  <option value="Reviewed">Under Review</option>
                  <option value="Contacted">Contact Initialized</option>
                  <option value="Qualified">Qualified Prospect</option>
                  <option value="Unqualified">Not a Strategic Fit</option>
                  <option value="Closed">Closed / Signed</option>
                </select>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0 relative">
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex-shrink-0">Intelligent Notes</label>
                <div className="absolute right-0 top-0 text-[8px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 uppercase tracking-widest">
                  Auto-Scanner Active
                </div>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  className="flex-1 w-full bg-background border border-border rounded-xl p-4 text-xs text-foreground focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 resize-none min-h-[150px]"
                  placeholder="Type 'Business: [name]' or 'Website: [url]' to auto-fill their profile. Record other insights here..."
                />
              </div>

              <button 
                onClick={performSave}
                disabled={saving}
                className="w-full btn-primary py-3.5 flex justify-center items-center gap-2.5 shadow-lg shadow-primary/20 flex-shrink-0"
              >
                {saving ? "Syncing Logic..." : "Commit Record"} <Save size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, fullWidth, isLink, highlight }: any) {
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
      {isLink && value ? (
        <a href={value.includes('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex flex-col gap-1 text-xs break-all">
           {value.split(' | ').map((part: string) => (
             <span key={part} className="flex items-center gap-1.5 font-bold"><ExternalLink size={10} /> {part}</span>
           ))}
        </a>
      ) : (
        <p className={`text-foreground leading-relaxed truncate ${highlight ? 'text-lg font-bold text-primary' : 'text-sm font-medium'}`}>
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}

function getStatusColorActive(status: string) {
  switch(status) {
    case 'New': return 'border-blue-500/40 text-blue-500 bg-blue-500/5';
    case 'Reviewed': return 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5';
    case 'Contacted': return 'border-purple-500/40 text-purple-500 bg-purple-500/5';
    case 'Qualified': return 'border-green-500/40 text-green-500 bg-green-500/5';
    case 'Unqualified': return 'border-red-500/40 text-red-500 bg-red-500/5';
    case 'Closed': return 'border-gray-500/40 text-gray-500 bg-gray-500/5';
    default: return 'border-gray-500/40 text-gray-500 bg-gray-500/5';
  }
}
