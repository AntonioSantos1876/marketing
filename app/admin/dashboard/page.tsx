"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, UserPlus, PhoneCall, CheckCircle, TrendingUp, DollarSign, Calendar, ArrowRight, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    potentialRevenue: 0,
    conversionRate: 0
  });

  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        // Calculate Metrics
        const newLeads = data.filter(l => l.lead_status === 'New').length;
        const contactedLeads = data.filter(l => l.lead_status === 'Contacted').length;
        const qualifiedLeads = data.filter(l => l.lead_status === 'Qualified').length;
        
        const revenue = data.reduce((acc, lead) => {
          if (lead.lead_status !== 'Qualified') return acc;
          const budget = lead.monthly_revenue || lead.monthly_budget || "";
          if (budget.includes('Under $10,000')) return acc + 5000;
          if (budget.includes('$10,000 - $30,000')) return acc + 20000;
          if (budget.includes('$30,000 - $100,000')) return acc + 65000;
          if (budget.includes('$100,000+')) return acc + 150000;
          return acc;
        }, 0);

        setMetrics({
          total: data.length,
          new: newLeads,
          contacted: contactedLeads,
          qualified: qualifiedLeads,
          potentialRevenue: revenue,
          conversionRate: data.length > 0 ? (qualifiedLeads / data.length) * 100 : 0
        });

        setRecentLeads(data.slice(0, 5));

        const counts = data.reduce((acc: any, lead) => {
          const status = lead.lead_status || 'New';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 overflow-hidden">
      {/* HEADER METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        <MetricCard 
          title="Total Leads" 
          value={metrics.total} 
          icon={<Users size={18} />} 
          color="bg-blue-500/10 text-blue-400"
          trend="+12%"
        />
        <MetricCard 
          title="Potential Revenue" 
          value={`$${(metrics.potentialRevenue / 1000).toFixed(0)}k`} 
          icon={<DollarSign size={18} />} 
          color="bg-primary/10 text-primary"
          subtitle="Qualified"
        />
        <MetricCard 
          title="Conversion" 
          value={`${metrics.conversionRate.toFixed(1)}%`} 
          icon={<TrendingUp size={18} />} 
          color="bg-green-500/10 text-green-400"
        />
        <MetricCard 
          title="New Submissions" 
          value={metrics.new} 
          icon={<UserPlus size={18} />} 
          color="bg-purple-500/10 text-purple-400"
        />
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ANALYTICS CHARTS & RECENT LEADS */}
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
          {/* Chart Section - Fixed relative height */}
          <div className="glass-card p-6 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground leading-tight">Lead Distribution</h3>
              <Calendar size={18} className="text-muted-foreground" />
            </div>
            
            <div className="flex flex-row items-center justify-around gap-4 py-2">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-muted/20"></circle>
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="3.5" 
                    strokeDasharray={`${(metrics.qualified / (metrics.total || 1)) * 100} 100`}
                    className="text-primary"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">{metrics.qualified}</span>
                  <span className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Qualified</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <LegendItem label="New" count={metrics.new} color="bg-blue-400" />
                <LegendItem label="Contacted" count={metrics.contacted} color="bg-purple-400" />
                <LegendItem label="Qualified" count={metrics.qualified} color="bg-primary" />
                <LegendItem label="Others" count={metrics.total - metrics.new - metrics.contacted - metrics.qualified} color="bg-muted" />
              </div>
            </div>
          </div>

          {/* Recent Leads Section - Takes remaining height */}
          <div className="glass-card flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="p-6 pb-4 flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-bold">Recent Leads</h3>
              <Link href="/admin/leads" className="text-xs text-primary hover:underline flex items-center gap-1 font-bold italic">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin">
              <table className="w-full text-left text-xs relative">
                <thead className="text-muted-foreground border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                  <tr>
                    <th className="py-2 pr-4 font-bold uppercase tracking-tighter">Name</th>
                    <th className="py-2 pr-4 font-bold uppercase tracking-tighter">Budget</th>
                    <th className="py-2 pr-4 font-bold uppercase tracking-tighter">Status</th>
                    <th className="py-2 font-bold uppercase tracking-tighter text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLeads.length === 0 ? (
                    <tr><td colSpan={4} className="py-8 text-center text-muted-foreground italic">No recent activity detected.</td></tr>
                  ) : (
                    recentLeads.map((lead) => (
                      <tr key={lead.id} className="group hover:bg-muted/30 transition-colors">
                        <td className="py-3 pr-4">
                          <p className="font-bold text-foreground">{lead.full_name}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(lead.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground font-medium">{lead.monthly_budget || lead.monthly_revenue || "N/A"}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getStatusColor(lead.lead_status || 'New')}`}>
                            {lead.lead_status || 'New'}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Link href={`/admin/leads/${lead.id}`} className="p-1.5 inline-block rounded-lg bg-muted group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <Eye size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="flex flex-col gap-6 min-h-0 overflow-y-auto pr-1 scrollbar-thin">
          <div className="glass-card p-6 bg-primary/5 border-primary/20 flex-shrink-0">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest text-primary/80">
              <TrendingUp size={16} className="text-primary" />
              Action Center
            </h3>
            <div className="space-y-3">
              <ActionButton title="Export Sales Report" desc="Download leads as CSV" />
              <ActionButton title="Bulk Follow-up" desc="Draft emails for new leads" />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col flex-1 min-h-0">
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-muted-foreground flex items-center justify-between">
              Recent Milestones
              <CheckCircle size={14} className="text-green-500" />
            </h3>
            <div className="space-y-6 flex-1 overflow-y-auto scrollbar-thin pr-2">
              <ActivityItem 
                title="Goal Reached" 
                desc="Collected 20 qualified leads this week." 
                time="2h ago"
                icon={<CheckCircle size={12} />}
                color="text-green-500"
              />
              <ActivityItem 
                title="System Update" 
                desc="Lead routing logic was optimized." 
                time="1d ago"
                icon={<Users size={12} />}
                color="text-blue-500"
              />
              <ActivityItem 
                title="Status Change" 
                desc="5 leads moved to Contacted." 
                time="2d ago"
                icon={<ArrowRight size={12} />}
                color="text-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ title, desc }: any) {
  return (
    <button className="w-full p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-left transition-all group">
      <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{title}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
    </button>
  );
}

function MetricCard({ title, value, icon, color, trend, subtitle }: any) {
  return (
    <div className="glass-card p-5 border border-border/40 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-3 text-nowrap">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        {trend && <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded uppercase">{trend}</span>}
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-foreground truncate">{value}</p>
        {subtitle && <p className="text-[9px] text-muted-foreground mt-0.5 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}

function LegendItem({ label, count, color }: any) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-[100px]">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-xs font-medium text-foreground">{label}</span>
      </div>
      <span className="text-xs font-bold text-muted-foreground/60">{count}</span>
    </div>
  );
}

function ActivityItem({ title, desc, time, icon, color }: any) {
  return (
    <div className="flex gap-3">
      <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-muted flex items-center justify-center ${color} border border-border`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-foreground truncate">{title}</p>
        <p className="text-[10px] text-muted-foreground leading-snug">{desc}</p>
        <p className="text-[9px] font-bold text-muted-foreground/40 mt-1 uppercase tracking-tighter">{time}</p>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch(status) {
    case 'New': return 'bg-blue-500/10 text-blue-500';
    case 'Reviewed': return 'bg-yellow-500/10 text-yellow-500';
    case 'Contacted': return 'bg-purple-500/10 text-purple-500';
    case 'Qualified': return 'bg-green-500/10 text-green-500';
    case 'Unqualified': return 'bg-red-500/10 text-red-500';
    case 'Closed': return 'bg-gray-500/10 text-gray-500';
    default: return 'bg-gray-500/10 text-gray-500';
  }
}
