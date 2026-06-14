import { Lead, LeadStatus, STATUS_LABELS, STATUS_COLORS } from "../types";
import { cn } from "../utils/cn";

interface DashboardProps {
  leads: Lead[];
  onNavigate: (page: "leads") => void;
}

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

export default function Dashboard({ leads, onNavigate }: DashboardProps) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contacted = leads.filter((l) => l.status === "contacted").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const proposal = leads.filter((l) => l.status === "proposal").length;
  const closedWon = leads.filter((l) => l.status === "closed_won").length;
  const totalBudget = leads.reduce((sum, l) => sum + (l.budget || 0), 0);

  const stats: StatCard[] = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: "📋",
      color: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      label: "New",
      value: newLeads,
      icon: "🆕",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    {
      label: "Contacted",
      value: contacted,
      icon: "📞",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
    {
      label: "Qualified",
      value: qualified,
      icon: "⭐",
      color: "text-purple-700",
      bgColor: "bg-purple-100",
    },
    {
      label: "Proposal",
      value: proposal,
      icon: "📄",
      color: "text-indigo-700",
      bgColor: "bg-indigo-100",
    },
    {
      label: "Closed Won",
      value: closedWon,
      icon: "🏆",
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
    },
  ];

  const statusBreakdown = Object.keys(STATUS_LABELS).map((key) => {
    const status = key as LeadStatus;
    const count = leads.filter((l) => l.status === status).length;
    const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
    return { status, label: STATUS_LABELS[status], count, percentage, color: STATUS_COLORS[status] };
  });

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your lead pipeline and performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-lg", stat.bgColor)}>
                {stat.icon}
              </span>
            </div>
            <p className={cn("mt-3 text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-700">Lead Status Breakdown</h3>
          <div className="space-y-3">
            {statusBreakdown.map((item) => (
              <div key={item.status}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      item.status === "new" && "bg-blue-500",
                      item.status === "contacted" && "bg-amber-500",
                      item.status === "qualified" && "bg-purple-500",
                      item.status === "proposal" && "bg-indigo-500",
                      item.status === "closed_won" && "bg-emerald-500",
                      item.status === "closed_lost" && "bg-rose-500"
                    )}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue / Budget Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-700">Budget Overview</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-emerald-600">
              ${totalBudget.toLocaleString()}
            </span>
            <span className="mb-1 text-sm text-slate-500">total pipeline value</span>
          </div>
          <div className="mt-6 space-y-3">
            {leads
              .filter((l) => l.budget && l.budget > 0)
              .slice(0, 5)
              .map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{lead.company}</span>
                  <span className="font-semibold text-slate-600">
                    ${lead.budget!.toLocaleString()}
                  </span>
                </div>
              ))}
            {leads.filter((l) => l.budget).length === 0 && (
              <p className="text-sm text-slate-400">No budget data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Recent Leads</h3>
          <button
            onClick={() => onNavigate("leads")}
            className="text-xs font-medium text-violet-600 hover:text-violet-700"
          >
            View all &rarr;
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{lead.name}</td>
                  <td className="py-3 pr-4 text-slate-500">{lead.company}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        STATUS_COLORS[lead.status]
                      )}
                    >
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
