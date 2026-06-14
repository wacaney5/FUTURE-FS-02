import { useState, useEffect } from "react";
import { Lead, LeadStatus, LeadSource, STATUS_LABELS, SOURCE_LABELS } from "../types";

interface LeadFormProps {
  lead: Lead | null;
  onSave: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export default function LeadForm({ lead, onSave, onCancel }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [source, setSource] = useState<LeadSource>("website");
  const [notes, setNotes] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setEmail(lead.email);
      setPhone(lead.phone);
      setCompany(lead.company);
      setStatus(lead.status);
      setSource(lead.source);
      setNotes(lead.notes);
      setBudget(lead.budget ? String(lead.budget) : "");
    }
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      phone,
      company,
      status,
      source,
      notes,
      budget: budget ? Number(budget) : undefined,
    });
  };

  const statusOptions = Object.entries(STATUS_LABELS) as [LeadStatus, string][];
  const sourceOptions = Object.entries(SOURCE_LABELS) as [LeadSource, string][];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            {lead ? "Edit Lead" : "New Lead"}
          </h3>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                placeholder="Company Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              >
                {statusOptions.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as LeadSource)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              >
                {sourceOptions.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Budget ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              placeholder="10000"
              min="0"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              placeholder="Add any notes about this lead..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-violet-700 hover:to-indigo-700 hover:shadow-md"
            >
              {lead ? "Update Lead" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
