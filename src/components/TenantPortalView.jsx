import React from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Upload, 
  MessageSquare,
  ShieldCheck,
  Send,
  Droplets
} from 'lucide-react';

export function TenantPortalView({ 
  onNavigateToTab, 
  onOpenReportModal, 
  tickets 
}) {
  const tenantTicket = tickets.find(t => t.unit.includes('408')) || tickets[0];

  return (
    <div className="space-y-6">
      {/* Resident Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-100 text-[11px] font-semibold border border-blue-400/30">
                Resident Portal
              </span>
              <span className="text-xs text-blue-200">Skyline Crest Luxury Tower</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome home, Sarah Jenkins
            </h1>
            <p className="text-xs text-blue-100/90 mt-1">
              Apartment 4B • Lease valid through Oct 31, 2026 • Dedicated Resident Concierge
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToTab('leases')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              View My Lease
            </button>
            <button
              onClick={() => onNavigateToTab('messages')}
              className="px-4 py-2 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-blue-700" />
              Message Manager
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Resident Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Rent & Financials */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Rent Payment</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> AutoPay Scheduled
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] text-slate-500 font-medium">Due on November 1, 2026</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">$2,850.00</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Chase Premier Checking (****4109)</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateToTab('payments')}
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Make Manual Payment or Update Bank
              </button>
              <div className="text-[11px] text-slate-400 text-center font-medium">
                Grace period applies through Nov 5, 11:59 PM
              </div>
            </div>
          </div>

          {/* Quick AI Lease Inquiries Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Instant Lease Answers
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have questions about guest policies, parking, pets, or painting walls? Our AI reads your lease instantly.
            </p>
            <button
              onClick={() => onNavigateToTab('leases')}
              className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
            >
              Ask AI About My Lease
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Active Maintenance Request & Report Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Active Maintenance Request</h3>
                <p className="text-xs text-slate-500">Live multi-stage tracker for your reported issues</p>
              </div>
              <button
                onClick={() => onNavigateToTab('maintenance')}
                className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                Report New Issue
              </button>
            </div>

            {tenantTicket && (
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500">{tenantTicket.id}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                      {tenantTicket.aiAnalysis.category}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">
                    {tenantTicket.aiAnalysis.urgency} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  "{tenantTicket.description}"
                </p>

                {/* Live Progress Bar */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                    <span>Current Status: <strong className="text-blue-700">{tenantTicket.status}</strong></span>
                    <span className="text-slate-500 font-normal">Assigned: {tenantTicket.assignedContractor}</span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${((tenantTicket.stageIndex + 1) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
                  <Droplets className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">AuraProp Emergency Advice:</span>
                    <p className="mt-0.5">
                      Turn the clockwise shutoff valve beneath the sink 90 degrees to isolate line pressure. The technician is arriving shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
