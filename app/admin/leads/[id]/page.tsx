"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Mail, Phone, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LeadDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', params.id)
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
  }, [params.id]);

  const saveUpdates = async () => {
    setSaving(true);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase
        .from('leads')
        .update({ lead_status: status, admin_notes: notes, updated_at: new Date().toISOString() })
        .eq('id', params.id);
    }
    setSaving(false);
    alert("Lead updated successfully.");
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading lead details...</div>;
  if (!lead) return <div className="p-8 text-red-500">Lead not found.</div>;

  return (
    <div className="p-8 pb-32">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Leads
      </button>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form Details */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Application Details</h1>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-border pb-4">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Full Name</span>
                <span className="font-medium text-lg">{lead.full_name}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Business Name</span>
                <span className="font-medium text-lg">{lead.business_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone || 'N/A'}</a>
              </div>
              <div className="md:col-span-2">
                <span className="block text-sm text-muted-foreground/80 mb-1">Website / Social</span>
                {lead.website_or_social ? (
                  <a href={lead.website_or_social} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                    {lead.website_or_social} <ExternalLink size={14} />
                  </a>
                ) : 'N/A'}
              </div>
              <div className="md:col-span-2">
                <span className="block text-sm text-muted-foreground/80 mb-1">Prefers Contact Via</span>
                <span className="font-medium">{lead.preferred_contact_method}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-border pb-4">Business & Goals</h2>
            <div className="space-y-6">
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Industry</span>
                <span className="font-medium">{lead.industry || 'Not Provided'}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Interested Service</span>
                <span className="font-medium text-primary">{lead.interested_service || 'Not Provided'}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Business Description</span>
                <p className="bg-muted/50 p-4 rounded-lg border border-border">{lead.business_description || 'N/A'}</p>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Current Challenge</span>
                <p className="bg-muted/50 p-4 rounded-lg border border-border">{lead.current_challenge}</p>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Goals</span>
                <p className="bg-muted/50 p-4 rounded-lg border border-border">{lead.goals || 'N/A'}</p>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Why Good Fit?</span>
                <p className="bg-primary/5 p-4 rounded-lg border border-primary/20 text-foreground italic">"{lead.why_good_fit}"</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4 border-b border-border pb-4">Logistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Budget</span>
                <span className="font-medium text-lg text-primary">{lead.monthly_budget}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Ready to Start</span>
                <span className="font-medium">{lead.ready_to_start}</span>
              </div>
              <div>
                <span className="block text-sm text-muted-foreground/80 mb-1">Worked with Agency?</span>
                <span className="font-medium">{lead.worked_with_agency_before}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Admin Actions */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="glass-card p-6 sticky top-8">
            <h2 className="text-lg font-bold mb-4">Admin Controls</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Lead Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none"
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unqualified">Unqualified</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Admin Notes (Hidden from Lead)</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                  className="w-full bg-background border border-border rounded p-3 text-foreground focus:border-primary outline-none"
                  placeholder="Record call notes, next steps, etc."
                />
              </div>
            </div>
            
            <button 
              onClick={saveUpdates}
              disabled={saving}
              className="w-full btn-primary py-3 flex justify-center items-center gap-2"
            >
              {saving ? "Saving..." : "Save Updates"} <Save size={18} />
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Submitted on: {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
