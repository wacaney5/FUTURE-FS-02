import { useState } from "react";
import { Lead } from "./types";
import { initialLeads } from "./data/leads";
import Sidebar, { Page } from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LeadList from "./components/LeadList";
import LeadForm from "./components/LeadForm";
import LeadDetail from "./components/LeadDetail";

export default function App() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  const generateId = () => String(Date.now()) + Math.random().toString(36).slice(2, 8);

  const handleSaveLead = (data: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id
            ? { ...editingLead, ...data, updatedAt: now }
            : l
        )
      );
    } else {
      const newLead: Lead = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setLeads((prev) => [newLead, ...prev]);
    }
    setShowForm(false);
    setEditingLead(null);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setViewingLead(null);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setViewingLead(null);
    }
  };

  const handleAddNew = () => {
    setEditingLead(null);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        leadCount={leads.length}
      />

      {/* Main Content */}
      <main className="ml-[var(--sidebar-w)] flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {currentPage === "dashboard" && (
            <Dashboard leads={leads} onNavigate={setCurrentPage} />
          )}

          {currentPage === "leads" && (
            <LeadList
              leads={leads}
              onAdd={handleAddNew}
              onSelect={(lead) => setViewingLead(lead)}
            />
          )}
        </div>
      </main>

      {/* Lead Form Modal */}
      {showForm && (
        <LeadForm
          lead={editingLead}
          onSave={handleSaveLead}
          onCancel={() => {
            setShowForm(false);
            setEditingLead(null);
          }}
        />
      )}

      {/* Lead Detail Modal */}
      {viewingLead && (
        <LeadDetail
          lead={viewingLead}
          onClose={() => setViewingLead(null)}
          onEdit={() => handleEdit(viewingLead)}
          onDelete={() => handleDelete(viewingLead.id)}
        />
      )}
    </div>
  );
}
