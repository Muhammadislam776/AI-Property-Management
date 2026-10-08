import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Key, 
  AlertTriangle, 
  Upload, 
  DollarSign, 
  ShieldCheck, 
  Camera,
  ChevronRight,
  FileCheck2
} from 'lucide-react';

export function ContractorPortalView({ 
  tickets, 
  onUpdateTicketStatus, 
  onShowToast, 
  onAddAuditLog 
}) {
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id || 'TICK-8092');
  const [invoiceAmount, setInvoiceAmount] = useState('245.00');
  const [laborHours, setLaborHours] = useState('1.5');
  const [partsDesc, setPartsDesc] = useState('1/2" Brass PEX Angle Stop Valve + Stainless Steel Braided Flex Hose');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleUpdateStatus = (stageIdx, stageName) => {
    onUpdateTicketStatus(selectedTicket.id, stageIdx, stageName);
    if (onShowToast) {
      onShowToast(`Ticket ${selectedTicket.id} updated to status: "${stageName}"`);
    }
    if (onAddAuditLog) {
      onAddAuditLog({
        actor: "Apex 24/7 Rapid Response (Contractor)",
        role: "Contractor",
        action: `STATUS_UPDATED_${stageName.toUpperCase().replace(/\s+/g, '_')}`,
        target: `Ticket ${selectedTicket.id}`,
        details: `Contractor updated stage to ${stageName}`
      });
    }
  };

  const handleSubmitInvoice = (e) => {
    e.preventDefault();
    handleUpdateStatus(4, "Resolved");
    if (onShowToast) {
      onShowToast(`Invoice for $${invoiceAmount} submitted and ticket marked Resolved!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Contractor Vendor Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[11px] font-semibold border border-blue-400/30">
                Vendor Dispatch Workspace
              </span>
              <span className="text-xs text-slate-300">Certified Plumbing & MEP Partner</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Apex 24/7 Rapid Response Plumbing
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Partner ID: VEND-4019 • 4.95★ Master Rating • Priority Direct-Billing Active
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              General Liability & Worker's Comp Validated
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Work-Order Queue Left, Active Job Detail Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Queue */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Assigned Work Orders ({tickets.length})
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
              Live Queue
            </span>
          </div>

          <div className="space-y-2">
            {tickets.map((t) => {
              const isSelected = t.id === selectedTicket?.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'hover:bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{t.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.aiAnalysis.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.aiAnalysis.urgency}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
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

        {/* Right Column (8 cols): Job Site Details, Action & Invoice Submission */}
        {selectedTicket && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Dispatch Detail
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedTicket.id} — {selectedTicket.aiAnalysis.category}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Current Status:</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {selectedTicket.status}
                </span>
              </div>
            </div>

            {/* Job Site & Entry Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> Job Location
                </div>
                <div className="font-bold text-slate-900">{selectedTicket.unit}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{selectedTicket.propertyName}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                  <Phone className="w-3.5 h-3.5 text-blue-600" /> Resident Contact
                </div>
                <div className="font-bold text-slate-900">{selectedTicket.tenantName}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{selectedTicket.tenantPhone}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                  <Key className="w-3.5 h-3.5 text-amber-600" /> Entry Instructions
                </div>
                <div className="font-bold text-slate-900">Digital Lockbox #4819</div>
                <div className="text-emerald-700 text-[11px] font-semibold mt-0.5">Tenant is on-site</div>
              </div>
            </div>

            {/* Scope of Work & Evidence Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img 
                  src={selectedTicket.imageUrl} 
                  alt="Job site damage" 
                  className="w-full h-44 object-cover" 
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-900">AI Diagnostic Scope & Symptoms:</div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {selectedTicket.description}
                </p>
                <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between">
                  <span className="text-blue-900 font-medium">Approved Budget Range:</span>
                  <span className="font-bold text-blue-800">{selectedTicket.aiAnalysis.estimatedCost}</span>
                </div>
              </div>
            </div>

            {/* Contractor Workflow Actions */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Vendor Workflow Progression
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(2, "Assigned")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTicket.status === 'Assigned'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Accept Dispatch
                </button>

                <button
                  onClick={() => handleUpdateStatus(3, "In Progress")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTicket.status === 'In Progress'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Arrived On-Site / In Progress
                </button>

                <button
                  onClick={() => handleUpdateStatus(4, "Resolved")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTicket.status === 'Resolved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Work Completed
                </button>
              </div>
            </div>

            {/* Quick Invoice Submission */}
            <form onSubmit={handleSubmitInvoice} className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900">Direct Invoice Settlement Stub</h4>
                <span className="text-[11px] text-emerald-700 font-semibold">Net 7 Direct Deposit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Labor (Hours)</label>
                  <input
                    type="text"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Billed Amount ($)</label>
                  <input
                    type="text"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Itemized Parts & Materials</label>
                <input
                  type="text"
                  value={partsDesc}
                  onChange={(e) => setPartsDesc(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Submit Invoice & Close Work-Order
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
