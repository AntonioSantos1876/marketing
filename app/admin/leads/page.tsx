"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Search, Download, Filter, ChevronDown, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setLeads(data);
    }
    setLoading(false);
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase
        .from('leads')
        .update({ lead_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (!error) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, lead_status: newStatus } : l));
      }
    }
    setUpdatingId(null);
  };

  const sendPricingEmail = async (id: string, email: string, full_name: string) => {
    if (!email) return;
    setSendingEmailId(id);
    
    try {
      const res = await fetch('/api/send-pricing-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name })
      });
      
      const responseData = await res.json();
      
      if (res.ok) {
         // Auto upgrade their pipeline status
         await updateLeadStatus(id, 'Contacted');
         alert(`Success! Strategic Pricing Email was dispatched to ${full_name}.`);
      } else {
         alert(`Failed to send email. Resend system message: ${responseData.error?.message || responseData.error || 'Check API keys.'}`);
      }
    } catch (e) {
      console.error(e);
      alert('Network failure connecting to email system.');
    } finally {
      setSendingEmailId(null);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["Full Name", "Email", "Phone", "Industry", "Budget", "Status", "Date"];
    const rows = leads.map(l => [
      l.full_name,
      l.email,
      l.phone || "N/A",
      l.industry || "N/A",
      l.monthly_budget || l.monthly_revenue || "N/A",
      l.lead_status || "New",
      new Date(l.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.full_name.toLowerCase().includes(search.toLowerCase()) || 
                         (l.industry && l.industry.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "All" || (l.lead_status || "New") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Lead Management</h2>
          <p className="text-muted-foreground text-xs mt-0.5 uppercase tracking-widest opacity-60">Manage and track your business applications</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-bold border border-border/50 transition-all hover:border-primary/30"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4 border border-border/40 flex-shrink-0">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or industry..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground appearance-none outline-none focus:border-primary"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Unqualified">Unqualified</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          </div>
        </div>
      </div>
      
      <div className="glass-card border border-border/40 flex flex-col">
        <div className="">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-muted/50 border-b border-border text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground">Loading lead database...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground font-medium italic">No leads found matching your criteria.</td></tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                          {lead.full_name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate">{lead.full_name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-foreground truncate max-w-[150px]">{lead.industry || "N/A"}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-tighter">Budget</p>
                        <p className="text-foreground truncate">{lead.monthly_budget || lead.monthly_revenue}</p>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <div className="relative inline-block w-32">
                        <select 
                          value={lead.lead_status || 'New'}
                          disabled={updatingId === lead.id}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`w-full appearance-none px-2.5 py-1.5 rounded text-[10px] font-bold uppercase border bg-transparent outline-none cursor-pointer transition-all ${updatingId === lead.id ? 'opacity-50' : ''} ${getStatusColorStyle(lead.lead_status || 'New')}`}
                        >
                          <option value="New">New</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Unqualified">Unqualified</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                          <ChevronDown size={10} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                        <button 
                          onClick={() => sendPricingEmail(lead.id, lead.email, lead.full_name)}
                          disabled={sendingEmailId === lead.id}
                          className={`flex items-center gap-1.5 font-bold text-xs py-1.5 px-3 rounded whitespace-nowrap transition-all shadow-sm ${
                            sendingEmailId === lead.id 
                            ? 'bg-orange-500/20 text-orange-500 cursor-not-allowed border border-orange-500/30' 
                            : 'bg-orange-500 hover:bg-orange-600 text-black border border-transparent shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                          }`}
                          title="Send Automated Pricing Link"
                        >
                          {sendingEmailId === lead.id ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                          Send Pricing
                        </button>
                        <Link 
                          href={`/admin/leads/${lead.id}`} 
                          className="flex items-center gap-1 hover:text-foreground transition-colors font-bold text-xs bg-muted text-muted-foreground py-1.5 px-3 rounded border border-border/50 whitespace-nowrap"
                        >
                          <Eye size={14} /> Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getStatusColorStyle(status: string) {
  switch(status) {
    case 'New': return 'border-blue-500/30 text-blue-500 bg-blue-500/5 hover:bg-blue-500/10';
    case 'Reviewed': return 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5 hover:bg-yellow-500/10';
    case 'Contacted': return 'border-purple-500/30 text-purple-500 bg-purple-500/5 hover:bg-purple-500/10';
    case 'Qualified': return 'border-green-500/30 text-green-500 bg-green-500/5 hover:bg-green-500/10';
    case 'Unqualified': return 'border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10';
    case 'Closed': return 'border-gray-500/30 text-gray-500 bg-gray-500/5 hover:bg-gray-500/10';
    default: return 'border-gray-500/30 text-gray-500 bg-gray-500/5 hover:bg-gray-500/10';
  }
}
