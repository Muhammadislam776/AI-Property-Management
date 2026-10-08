import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Send,
  Eye,
  FileText,
  Calendar,
  Layers,
  Users
} from 'lucide-react';
import { expiringLeasesData } from '../data/mockData';

export function DashboardView({ 
  properties, 
  selectedProperty, 
  tickets, 
  onNavigateToTab, 
  onSelectTicket 
}) {
  // Filter data based on selected property
  const activeProps = selectedProperty === 'all' 
    ? properties 
    : properties.filter(p => p.id === selectedProperty);

  const totalUnits = activeProps.reduce((acc, p) => acc + p.totalUnits, 0);
  const occupiedUnits = activeProps.reduce((acc, p) => acc + p.occupiedUnits, 0);
  const overallOccupancy = ((occupiedUnits / totalUnits) * 100).toFixed(1);
  const totalRevenue = activeProps.reduce((acc, p) => acc + p.monthlyRevenue, 0);
  const activeTicketCount = tickets.filter(t => t.status !== 'Resolved').length;
  const criticalTickets = tickets.filter(t => t.aiAnalysis.urgency === 'CRITICAL' && t.status !== 'Resolved');

  return (
    <div className="space-y-6">
      {/* Top Welcome & AI Executive Briefing */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg shadow-blue-950/10 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-40 top-0 w-48 h-48 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/30 text-blue-100 border border-blue-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" /> Executive AI Briefing
              </span>
              <span className="text-blue-200 text-xs">Today, Oct 8, 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Operations Overview & Portfolio Health
            </h1>
            <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed">
              Portfolio occupancy is stable at <strong className="text-white font-bold">{overallOccupancy}%</strong> across {totalUnits} units. 
              {criticalTickets.length > 0 ? (
                <span className="text-rose-200 font-semibold ml-1">
                  1 critical emergency plumbing incident was auto-triaged and matched with Apex 24/7.
                </span>
              ) : (
                <span className="ml-1">All high-priority operational workflows are within SLA benchmarks.</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => onNavigateToTab('maintenance')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-blue-600" />
              Triage Center
              {criticalTickets.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>
            <button 
              onClick={() => onNavigateToTab('leases')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              Smart Leases
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core High-Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Occupancy */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Portfolio Occupancy</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-900">{overallOccupancy}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +1.4%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${overallOccupancy}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>{occupiedUnits} Leased</span>
            <span>{totalUnits - occupiedUnits} Vacant Units</span>
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Monthly Gross Rent</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-900">
              ${(totalRevenue).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-blue-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +4.2% MoM
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Collection Rate</span>
            <span className="font-bold text-slate-800">98.2% on-time</span>
          </div>
        </div>

        {/* Card 3: Pending Maintenance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Active Maintenance</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              criticalTickets.length > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
            }`}>
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-900">{activeTicketCount} Tickets</span>
            {criticalTickets.length > 0 ? (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                1 Emergency
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-500">Normal queue</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Mean Response Time</span>
            <span className="font-bold text-emerald-600">14.2 min (AI auto)</span>
          </div>
        </div>

        {/* Card 4: Expiring Leases */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Expiring Leases (60d)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-900">3 Renewals</span>
            <span className="text-xs font-semibold text-amber-600">Action Needed</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Avg. Uplift Potential</span>
            <span className="font-bold text-blue-600">+$185/unit/mo</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Critical Action Center & Property Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): AI Action Center & Urgent Triage Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent AI Triage Alert Banner */}
          {criticalTickets.length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-rose-200/90 p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        CRITICAL TRIAGE REQUIRED
                      </span>
                      <span className="text-xs font-medium text-slate-400">TICK-8092</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      Pipe rupture under bathroom sink at Skyline Crest (Unit 408)
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      AI Computer Vision diagnosed pressurized supply line rupture with high risk of sub-floor delamination. 
                      Recommended vendor <strong className="text-slate-900">Apex 24/7 Rapid Response</strong> (4.95★, 25 min ETA).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectTicket('TICK-8092');
                    onNavigateToTab('maintenance');
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 transition-all shrink-0 flex items-center gap-1.5"
                >
                  Inspect & Dispatch
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Properties Performance Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Portfolio Properties Breakdown</h3>
                <p className="text-xs text-slate-500">Real-time occupancy, revenue yield, and ticket load</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> 4 Active Portfolios
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {activeProps.map((prop) => (
                <div key={prop.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 rounded-xl px-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <img 
                      src={prop.image} 
                      alt={prop.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs" 
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{prop.name}</h4>
                      <p className="text-[11px] text-slate-500">{prop.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 self-end sm:self-auto">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Occupancy</div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        {prop.occupancyRate}%
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Monthly Rev</div>
                      <div className="text-xs font-bold text-slate-800">
                        ${prop.monthlyRevenue.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Tickets</div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-slate-400" />
                        {prop.activeTickets}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Automated Reminders & Upcoming Leases */}
        <div className="space-y-6">
          {/* Automated Reminders Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Automated Reminders</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                AI Watcher
              </span>
            </div>

            <div className="space-y-3">
              {expiringLeasesData.map((lease) => (
                <div 
                  key={lease.id} 
                  className="p-3 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{lease.unit} • {lease.property}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {lease.daysLeft} days left
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2 font-medium">
                    Tenant: <strong className="text-slate-800">{lease.tenant}</strong>
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                    <span className="text-slate-500">
                      Current: {lease.currentRent} → <strong className="text-emerald-600">{lease.marketRate}</strong> ({lease.suggestedIncrease})
                    </span>
                    <button 
                      onClick={() => onNavigateToTab('leases')}
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                    >
                      Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Auto-renewal dispatch</span>
              <span className="text-[11px] font-bold text-emerald-600">Enabled (60-day rule)</span>
            </div>
          </div>

          {/* Quick AI System Actions Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-200">
                AuraOperations Co-Pilot
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AI scanned 12 active leases and detected 1 overdue payment notice ready for automated generation.
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigateToTab('messages')}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Review AI Draft Replies (1 Pending)
              </button>
              <button 
                onClick={() => onNavigateToTab('payments')}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5" />
                Open Rent Ledgers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
