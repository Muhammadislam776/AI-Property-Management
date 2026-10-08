import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Key, 
  DollarSign, 
  ShieldCheck, 
  Camera, 
  LogOut, 
  FileCheck2, 
  Check, 
  AlertTriangle,
  Building2,
  Navigation
} from 'lucide-react';

export function ContractorPanel({
  currentUser,
  onLogout,
  onSwitchRole,
  tickets,
  onUpdateTicketStatus,
  onShowToast,
  onAddAuditLog
}) {
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id || 'TICK-8092');
  const [laborHours, setLaborHours] = useState('1.5');
  const [invoiceAmount, setInvoiceAmount] = useState('245.00');
  const [partsDesc, setPartsDesc] = useState('1/2" Brass PEX Angle Stop Valve + Stainless Steel Braided Flex Line');
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleAdvanceStatus = (stageIdx, stageName) => {
    onUpdateTicketStatus(selectedTicket.id, stageIdx, stageName);
    if (onShowToast) {
      onShowToast(`Ticket ${selectedTicket.id} updated to "${stageName}"`);
    }
  };

  const handleSubmitInvoice = (e) => {
    e.preventDefault();
    setInvoiceSubmitted(true);
    handleAdvanceStatus(4, "Resolved");
    if (onShowToast) {
      onShowToast(`Invoice for $${invoiceAmount} submitted! Net-7 direct deposit queued.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Contractor Dedicated Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-md shadow-slate-900/20">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900">Apex Rapid Dispatch</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Certified Trade Vendor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Partner ID: VEND-4019 • 4.95★ Rating (142 Jobs)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSwitchRole('manager')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-600 hover:text-blue-700 bg-slate-50 border border-slate-200"
            >
              Switch Role
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200/80 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Vendor Work Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Work-Order Queue List (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Assigned Work Orders ({tickets.length})
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Live Dispatch
              </span>
            </div>

            <div className="space-y-2">
              {tickets.map((t) => {
                const isSelected = t.id === selectedTicket?.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                        : 'hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">{t.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.aiAnalysis.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t.aiAnalysis.urgency}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                      {t.aiAnalysis.category}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>{t.unit}</span>
                      <span className="font-bold text-blue-700">{t.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job Details, Lockbox Access & Workflow Actions (8 cols) */}
          {selectedTicket && (
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Active Job Ticket</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    {selectedTicket.id} — {selectedTicket.aiAnalysis.category}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Status:</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              {/* Location, Resident Contact & Lockbox Entry Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Building & Unit
                  </div>
                  <div className="font-bold text-slate-900">{selectedTicket.unit}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{selectedTicket.propertyName}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Resident Phone
                  </div>
                  <div className="font-bold text-slate-900">{selectedTicket.tenantName}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{selectedTicket.tenantPhone}</div>
                </div>

                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-1">
                    <Key className="w-3.5 h-3.5 text-amber-600" /> Keycode / Entry
                  </div>
                  <div className="font-bold text-amber-900 font-mono text-sm">Lockbox #4819</div>
                  <div className="text-amber-800 text-[11px] mt-0.5">Tenant is on premises</div>
                </div>
              </div>

              {/* Scope & Evidence Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={selectedTicket.imageUrl}
                    alt="Damage inspection"
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-900">AI Diagnostic Scope:</div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    {selectedTicket.description}
                  </p>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-800 font-semibold">
                    <span>Approved Repair Budget:</span>
                    <span className="font-bold">{selectedTicket.aiAnalysis.estimatedCost}</span>
                  </div>
                </div>
              </div>

              {/* Progression Action Buttons */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Update Service Status
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAdvanceStatus(2, "Assigned")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTicket.status === 'Assigned'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Accept Dispatch
                  </button>

                  <button
                    onClick={() => handleAdvanceStatus(3, "In Progress")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTicket.status === 'In Progress'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Arrived On-Site / In Progress
                  </button>

                  <button
                    onClick={() => handleAdvanceStatus(4, "Resolved")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTicket.status === 'Resolved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Work Completed & Certified
                  </button>
                </div>
              </div>

              {/* Direct Invoicing Settlement Form */}
              <form onSubmit={handleSubmitInvoice} className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900">Direct Vendor Settlement Stub</h4>
                  <span className="text-[11px] text-emerald-700 font-semibold">Automated ACH Net-7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Labor (Hours)</label>
                    <input
                      type="text"
                      value={laborHours}
                      onChange={(e) => setLaborHours(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Billed Amount ($)</label>
                    <input
                      type="text"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Itemized Parts Description</label>
                  <input
                    type="text"
                    value={partsDesc}
                    onChange={(e) => setPartsDesc(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Submit Certified Invoice & Settle</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
