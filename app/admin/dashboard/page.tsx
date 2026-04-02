"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, PhoneCall, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      
      const { data, error } = await supabase.from('leads').select('lead_status');
      
      if (data && !error) {
        setMetrics({
          total: data.length,
          new: data.filter(l => l.lead_status === 'New').length,
          contacted: data.filter(l => l.lead_status === 'Contacted').length,
          qualified: data.filter(l => l.lead_status === 'Qualified').length,
        });
      }
    };
    
    fetchMetrics();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Total Leads</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
          </div>
          <p className="text-4xl font-bold">{metrics.total}</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">New Submissions</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><UserPlus size={20} /></div>
          </div>
          <p className="text-4xl font-bold">{metrics.new}</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Contacted</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><PhoneCall size={20} /></div>
          </div>
          <p className="text-4xl font-bold">{metrics.contacted}</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Qualified Leads</h3>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><CheckCircle size={20} /></div>
          </div>
          <p className="text-4xl font-bold">{metrics.qualified}</p>
        </div>
      </div>
      
      <div className="mt-12 glass-card p-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions & Notes</h2>
        <p className="text-gray-400 mb-6">Welcome back to the portal. Review the leads tab to process incoming applications.</p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <CheckCircle className="text-primary" size={20}/>
            <div>
              <p className="font-semibold">Review Pending Leads</p>
              <p className="text-sm text-gray-400">You have {metrics.new} unseen applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
