import { cn } from "../utils/cn";

export type Page = "dashboard" | "leads";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  leadCount: number;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "leads", label: "Leads", icon: "👥" },
];

export default function Sidebar({ currentPage, onNavigate, leadCount }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-[var(--sidebar-w)] flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
          LF
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900">LeadFlow</h1>
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">CRM</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
              currentPage === item.id
                ? "bg-violet-50 text-violet-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === "leads" && (
              <span
                className={cn(
                  "ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                  currentPage === "leads"
                    ? "bg-violet-200 text-violet-800"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {leadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 px-6 py-4">
        <p className="text-xs text-slate-400">LeadFlow CRM v1.0</p>
      </div>
    </aside>
  );
}
