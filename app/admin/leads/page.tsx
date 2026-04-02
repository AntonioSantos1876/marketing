"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('leads')
          .select('id, full_name, business_name, email, lead_status, created_at, monthly_budget, ready_to_start')
          .order('created_at', { ascending: false });
        
        if (data) setLeads(data);
      }
      setLoading(false);
    };
    
    fetchLeads();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Reviewed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Contacted': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Qualified': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Unqualified': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredLeads = leads.filter(l => 
    l.full_name.toLowerCase().includes(search.toLowerCase()) || 
    l.business_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-primary outline-none"
          />
        </div>
      </div>
      
      <div className="glass-card overflow-x-auto p-0 border border-border relative">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading leads...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-border text-sm text-gray-400">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Business</th>
                <th className="p-4 font-medium">Budget</th>
                <th className="p-4 font-medium">Timeline</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{lead.full_name}</td>
                    <td className="p-4">{lead.business_name}</td>
                    <td className="p-4">{lead.monthly_budget}</td>
                    <td className="p-4">{lead.ready_to_start}</td>
                    <td className="p-4 text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs border ${getStatusColor(lead.lead_status || 'New')}`}>
                        {lead.lead_status || 'New'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/leads/${lead.id}`} className="inline-flex items-center gap-1 text-primary hover:text-white transition-colors">
                        <Eye size={16} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
