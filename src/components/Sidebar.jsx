import React from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Home
} from 'lucide-react';

export function Sidebar({ activeTab, onTabChange, ticketAlertCount = 1, unreadMsgCount = 1 }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Portfolio Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'maintenance',
      label: 'AI Maintenance Triage',
      icon: Wrench,
      badge: ticketAlertCount > 0 ? `${ticketAlertCount} Critical` : null,
      badgeColor: 'bg-rose-50 text-rose-600 border border-rose-200'
    },
    {
      id: 'leases',
      label: 'Smart Leases & AI Q&A',
      icon: FileText,
      badge: 'AI Vault',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'messages',
      label: 'Tenant Inbox & AI Reply',
      icon: MessageSquare,
      badge: unreadMsgCount > 0 ? `${unreadMsgCount} New` : null,
      badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200'
    },
    {
      id: 'payments',
      label: 'Payments & Ledgers',
      icon: CreditCard,
      badge: null
    },
    {
      id: 'audit',
      label: 'Security & Audit Logs',
      icon: ShieldCheck,
      badge: 'Compliant',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0 shadow-[1px_0_3px_rgba(0,0,0,0.02)] min-h-[calc(100vh-61px)]">
      {/* Navigation Links */}
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations & Management
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-700 shadow-sm border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Portfolio Snapshot mini-card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700">Aura AI Autonomous Agent</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
            Active visual triage, automated lease parsing & fraud prevention running on 372 units.
          </p>
          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 font-medium">
            <span className="text-slate-500">Auto-triage accuracy</span>
            <span className="font-bold text-emerald-600">99.4%</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-400 font-medium">
          <span>AuraProp Suite v2.6</span>
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> SOC-2 Type II
          </span>
        </div>
      </div>
    </aside>
  );
}
