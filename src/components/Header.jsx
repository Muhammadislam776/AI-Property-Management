import React from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  Wrench, 
  User, 
  ChevronDown,
  Building,
  LogOut,
  ArrowLeft
} from 'lucide-react';

export function Header({ 
  currentRole, 
  currentUser,
  onRoleChange, 
  onLogout,
  selectedProperty, 
  onPropertyChange, 
  properties,
  unreadCount = 1 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Property Filter */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">AuraProp</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" /> Enterprise AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Multi-Property Operations Suite</p>
            </div>
          </div>

          {/* Property Selector (When in Manager view) */}
          {currentRole === 'manager' && (
            <div className="relative hidden md:block">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-lg hover:border-slate-300 transition-colors">
                <Building className="w-4 h-4 text-slate-500" />
                <select 
                  value={selectedProperty} 
                  onChange={(e) => onPropertyChange(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-3"
                >
                  <option value="all">Portfolio: All 4 Properties (372 Units)</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.totalUnits} Units)</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search units, tenants, work-orders, lease clauses (Ctrl + K)..." 
              className="w-full pl-9 pr-12 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800 placeholder-slate-400"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Role Switcher & Profile & Logout */}
        <div className="flex items-center gap-3">
          {/* RBAC Role Switcher */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onRoleChange('manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'manager'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Property Manager Workspace"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manager</span>
            </button>

            <button
              onClick={() => onRoleChange('tenant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'tenant'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Resident / Tenant Portal"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tenant</span>
            </button>

            <button
              onClick={() => onRoleChange('contractor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'contractor'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Contractor Work-Order Queue"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contractor</span>
            </button>
          </div>

          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
              {currentUser?.avatarInitials || (currentRole === 'manager' ? 'AH' : currentRole === 'tenant' ? 'SJ' : 'AP')}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {currentUser?.name || (currentRole === 'manager' ? 'Alex Hayes' : currentRole === 'tenant' ? 'Sarah Jenkins' : 'Apex Dispatch')}
              </div>
              <div className="text-[10px] text-slate-500 capitalize font-medium">
                {currentUser?.roleTitle || (currentRole === 'manager' ? 'Lead Portfolio Exec' : currentRole === 'tenant' ? 'Unit 408 Resident' : 'Certified Vendor')}
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Sign Out to Landing Page"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
