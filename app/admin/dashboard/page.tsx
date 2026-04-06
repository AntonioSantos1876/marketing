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
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
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
        setAllLeads(data);

        // Derive Live Activities from Leads
        const recentActivities: any[] = [];
        if (qualifiedLeads > 0 && qualifiedLeads % 5 === 0) {
          recentActivities.push({
            id: 'goal-reached',
            title: "Goal Reached",
            desc: `Collected ${qualifiedLeads} qualified leads.`,
            time: "Recently",
            icon: <CheckCircle size={12} />,
            color: "text-green-500"
          });
        }

        data.slice(0, 5).forEach(lead => {
          const status = lead.lead_status || 'New';
          const diffHour = Math.floor((new Date().getTime() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60));
          const timeStr = diffHour === 0 ? 'Just now' : diffHour < 24 ? `${diffHour}h ago` : `${Math.floor(diffHour/24)}d ago`;
          
          if (status === 'New') {
            recentActivities.push({ id: lead.id + '-new', title: "New Lead Received", desc: `${lead.full_name} submitted an application.`, time: timeStr, icon: <UserPlus size={12} />, color: "text-blue-500" });
          } else if (status === 'Qualified') {
             recentActivities.push({ id: lead.id + '-qual', title: "Lead Qualified", desc: `${lead.full_name} meets criteria!`, time: timeStr, icon: <CheckCircle size={12} />, color: "text-green-500" });
          } else if (status === 'Contacted') {
             recentActivities.push({ id: lead.id + '-cont', title: "Lead Contacted", desc: `Followed up with ${lead.full_name}.`, time: timeStr, icon: <PhoneCall size={12} />, color: "text-purple-500" });
          } else {
             recentActivities.push({ id: lead.id + '-upd', title: "Status Update", desc: `${lead.full_name} marked as ${status}.`, time: timeStr, icon: <TrendingUp size={12} />, color: "text-gray-500" });
          }
        });
        
        setActivities(recentActivities.slice(0, 4));
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const exportToCSV = () => {
    if (allLeads.length === 0) return;
    const headers = ["Lead Name", "Email", "Phone", "Business", "Budget", "Status", "Date"];
    const rows = allLeads.map(l => [
      l.full_name, l.email, l.phone || "N/A", l.business_name || "N/A", 
      l.monthly_budget || l.monthly_revenue || "N/A", l.lead_status || "New", 
      new Date(l.created_at).toLocaleDateString()
    ]);
    const csvContent = [headers, ...rows].map(e => e.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const bulkFollowUp = () => {
    const emails = allLeads.filter(l => l.lead_status === 'New').map(l => l.email).filter(Boolean);
    if (emails.length === 0) {
      alert("No new leads to follow up with!");
      return;
    }
    const mailtoLink = `mailto:?bcc=${emails.join(',')}&subject=Follow up regarding your application&body=Hi there,%0D%0A%0D%0AWe received your application to work with us...`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* HEADER METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ANALYTICS CHARTS & RECENT LEADS */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Chart Section */}
          <div className="glass-card p-6 flex flex-col flex-shrink-0 min-h-[220px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">Lead Distribution</h3>
              <Calendar size={18} className="text-muted-foreground opacity-50" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2 overflow-hidden">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-lg">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-muted/10"></circle>
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
                  <span className="text-2xl font-bold tracking-tighter">{metrics.qualified}</span>
                  <span className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">Qualified</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <LegendItem label="New" count={metrics.new} color="bg-blue-400" />
                <LegendItem label="Contacted" count={metrics.contacted} color="bg-purple-400" />
                <LegendItem label="Qualified" count={metrics.qualified} color="bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
                <LegendItem label="Others" count={metrics.total - metrics.new - metrics.contacted - metrics.qualified} color="bg-muted" />
              </div>
            </div>
          </div>

          {/* Recent Leads Section */}
          <div className="glass-card flex flex-col">
            <div className="p-6 pb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">Recent Leads</h3>
              <Link href="/admin/leads" className="text-[10px] text-primary hover:text-primary/80 flex items-center gap-1 font-bold uppercase tracking-wider transition-colors">
                View Database <ArrowRight size={12} />
              </Link>
            </div>
            <div className="px-6 pb-6">
              <table className="w-full text-left text-xs relative border-separate border-spacing-0">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="py-3 pr-4 font-bold uppercase tracking-tighter border-b border-border/50">Lead Name</th>
                    <th className="py-3 pr-4 font-bold uppercase tracking-tighter border-b border-border/50">Revenue/Budget</th>
                    <th className="py-3 pr-4 font-bold uppercase tracking-tighter border-b border-border/50">Current Status</th>
                    <th className="py-3 font-bold uppercase tracking-tighter text-right border-b border-border/50">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentLeads.length === 0 ? (
                    <tr><td colSpan={4} className="py-12 text-center text-muted-foreground italic opacity-50">No recent activity detected.</td></tr>
                  ) : (
                    recentLeads.map((lead) => (
                      <tr key={lead.id} className="group hover:bg-primary/5 transition-all duration-200">
                        <td className="py-4 pr-4">
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">{lead.full_name}</p>
                          <p className="text-[10px] text-muted-foreground opacity-60">{new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </td>
                        <td className="py-4 pr-4 text-muted-foreground font-medium">{lead.monthly_budget || lead.monthly_revenue || "N/A"}</td>
                        <td className="py-4 pr-4">
                          <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusColor(lead.lead_status || 'New')}`}>
                            {lead.lead_status || 'New'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <Link href={`/admin/leads/${lead.id}`} className="size-8 inline-flex items-center justify-center rounded-xl bg-muted border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
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
        <div className="flex flex-col gap-6 pb-4 md:pb-0">
          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 flex-shrink-0 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full translate-x-12 -translate-y-12 blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <h3 className="font-bold flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-primary/80">
              <TrendingUp size={16} className="text-primary" />
              Action Center
            </h3>
            <div className="space-y-3 relative z-10">
              <ActionButton title="Export Sales Report" desc="Download leads as CSV" onClick={exportToCSV} />
              <ActionButton title="Bulk Follow-up" desc="Draft emails for new leads" onClick={bulkFollowUp} />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col">
            <h3 className="font-bold mb-6 text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between opacity-70">
              Activity Milestones
              <CheckCircle size={14} className="text-green-500" />
            </h3>
            <div className="space-y-6">
              {activities.length === 0 ? (
                <p className="text-xs text-muted-foreground italic opacity-70">No recent activity detected.</p>
              ) : (
                activities.map(activity => (
                  <ActivityItem 
                    key={activity.id}
                    title={activity.title} 
                    desc={activity.desc} 
                    time={activity.time}
                    icon={activity.icon}
                    color={activity.color}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ title, desc, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-left transition-all group">
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
