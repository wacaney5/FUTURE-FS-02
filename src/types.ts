export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "closed_won"
  | "closed_lost";

export type LeadSource = "website" | "referral" | "social_media" | "email" | "phone" | "walk_in" | "other";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdAt: string;
  updatedAt: string;
  budget?: number;
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost",
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-amber-100 text-amber-800 border-amber-200",
  qualified: "bg-purple-100 text-purple-800 border-purple-200",
  proposal: "bg-indigo-100 text-indigo-800 border-indigo-200",
  closed_won: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed_lost: "bg-rose-100 text-rose-800 border-rose-200",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  website: "Website",
  referral: "Referral",
  social_media: "Social Media",
  email: "Email Campaign",
  phone: "Phone Inquiry",
  walk_in: "Walk-in",
  other: "Other",
};
