import { Lead, STATUS_LABELS, STATUS_COLORS, SOURCE_LABELS } from "../types";
import { cn } from "../utils/cn";

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LeadDetail({ lead, onClose, onEdit, onDelete }: LeadDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{lead.name}</h3>
              <p className="text-xs text-slate-500">{lead.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded-full border px-3 py-0.5 text-xs font-medium",
                STATUS_COLORS[lead.status]
              )}
            >
              {STATUS_LABELS[lead.status]}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-600">
              {SOURCE_LABELS[lead.source]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-400">Email</p>
              <p className="text-slate-700">{lead.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Phone</p>
              <p className="text-slate-700">{lead.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Company</p>
              <p className="text-slate-700">{lead.company || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Budget</p>
              <p className="font-semibold text-slate-700">
                {lead.budget ? `$${lead.budget.toLocaleString()}` : "—"}
              </p>
            </div>
          </div>

          {lead.notes && (
            <div>
              <p className="mb-1 text-xs font-medium text-slate-400">Notes</p>
              <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{lead.notes}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <p>Created: {new Date(lead.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p>Updated: {new Date(lead.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button
            onClick={onDelete}
            className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-violet-700 hover:to-indigo-700"
            >
              Edit Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
