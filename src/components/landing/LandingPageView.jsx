import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Lock, 
  Users, 
  Droplets,
  Zap,
  ChevronRight,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export function LandingPageView({ onGoToAuth, onQuickLaunchRole }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">AuraProp</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" /> Enterprise AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">Multi-Property Operations Suite</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#triage" className="hover:text-blue-700 transition-colors">AI Maintenance Triage</a>
            <a href="#leases" className="hover:text-blue-700 transition-colors">Smart Leases</a>
            <a href="#portals" className="hover:text-blue-700 transition-colors">Role Portals</a>
            <a href="#security" className="hover:text-blue-700 transition-colors">SOC-2 Security</a>
          </nav>

          {/* CTAs: Sign Up First then Sign In */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onGoToAuth('login')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onGoToAuth('signup')}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Sign Up Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>AuraProp AI Operations Suite v2.6 Released</span>
            <span className="text-blue-400">•</span>
            <span className="text-blue-600 font-semibold">99.8% SLA Uptime</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Autonomous Operations for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              Modern Real Estate Portfolios
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Automate emergency maintenance triage with computer-vision diagnostics, query complex lease contracts in natural language with in-document citations, and eliminate rent delinquency across your entire portfolio.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onGoToAuth('signup')}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started (Sign Up)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onQuickLaunchRole('manager')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Launch Interactive Live Demo</span>
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 372+ Units Under Management
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 14.2 Min Avg Triage SLA
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> SOC-2 Type II Certified
            </div>
          </div>
        </div>

        {/* Hero Visual Image Showcase with Floating Telemetry */}
        <div className="mt-12 relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900 group">
          <img
            src="/images/hero-tower.jpg"
            alt="Skyline Crest Luxury Tower - AuraProp Portfolio"
            className="w-full h-[440px] sm:h-[540px] object-cover opacity-95 transition-transform duration-700 group-hover:scale-102"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none"></div>

          {/* Floating Telemetry Card 1: Occupancy */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 max-w-xs hidden sm:block animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Portfolio Occupancy</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">97.4%</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +1.4% MoM vs Industry Avg (92%)
            </div>
          </div>

          {/* Floating Telemetry Card 2: AI Triage Scan */}
          <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700 max-w-xs text-white hidden md:block">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-300">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>AuraVision™ Multimodal Scan</span>
            </div>
            <p className="text-xs text-slate-200 leading-snug">
              Pipe rupture isolated in Unit 408. Contractor <strong className="text-white">Apex 24/7</strong> matched with 25m ETA.
            </p>
            <div className="mt-2 text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 w-fit">
              CONFIDENCE SCORE: 99.4%
            </div>
          </div>

          {/* Floating Bottom Card: Financial Ledger */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Monthly Portfolio Revenue</span>
                <div className="text-xl font-extrabold text-slate-900">$829,900 Collected</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onQuickLaunchRole('manager')}
                className="w-full sm:w-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Manager Operations Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Role-Based Access Portals (RBAC Section) */}
      <section id="portals" className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Role-Based Access Control (RBAC)
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Specialized Portals for Every Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Each user role receives a dedicated, distraction-free operations panel with customized workflows and access controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Property Manager */}
            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-700/20 mb-4 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Executive Suite</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Property Manager Portal</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Portfolio-wide operations dashboard, financial ledgers, auto-dispatch approvals, 60-day lease renewal automation, and SOC-2 audit logs.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-Property Occupancy & Cashflow
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Multimodal AI Triage Command Desk
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AI Reply Drafting with 3 Dynamic Tones
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => onQuickLaunchRole('manager')}
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Manager Panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Resident Tenant */}
            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Resident Living</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Resident / Tenant Portal</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Simplified resident interface for zero-friction rent payment via ACH/Card, instant photo maintenance reporting, and in-document AI lease Q&A.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 1-Click Rent Pay & AutoPay Management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> AI Photo Triage with Instant Guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Live 5-Stage Work-Order Progress Bar
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => onQuickLaunchRole('tenant')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Resident Panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Certified Contractor */}
            <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/20 mb-4 group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Trade Vendor</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Contractor Dispatch Panel</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Fast work-order queue for trade technicians with job diagnostics, digital lockbox codes, timeline state progression, and direct invoice billing.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Live Priority Dispatch Queue
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unit Access Codes & Tenant Contact
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Direct Invoice & Parts Settlement
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => onQuickLaunchRole('contractor')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Contractor Panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Feature Showcase with High-Resolution Generated Imagery */}
      <section id="triage" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        {/* Showcase Item 1: Smart Maintenance Scan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Multimodal Diagnostics
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Autonomous AI Triage with Computer Vision & Rapid Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When tenants report an issue, AuraVision inspects uploaded photos using specialized computer-vision models to identify pooling water, HVAC refrigerant faults, and electrical sparks in milliseconds.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Immediate Risk Assessment</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Calculates structural delamination risks and issues automatic water shutoff instructions to prevent flood damage.</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Intelligent Vendor Matching</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Auto-matches licensed, insured contractors based on historical ratings, proximity, and active trade certifications.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
            <img
              src="/images/maintenance-ai.jpg"
              alt="Smart Maintenance Scan with Holographic Diagnostic Interface"
              className="w-full h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Showcase Item 2: Resident Living Suite */}
        <div id="leases" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl group order-2 lg:order-1">
            <img
              src="/images/resident-suite.jpg"
              alt="Contemporary Luxury Living Suite"
              className="w-full h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4 order-1 lg:order-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Modern Resident Experience
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Smart Leases with In-Document AI Citation Highlighting
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No more searching through 20-page legal contracts. Residents and managers ask questions naturally like <em>"What is the late fee policy?"</em> or <em>"Can I bring a dog?"</em>, and AuraProp AI jumps directly to the clause, highlighting the exact legal text.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-900">Clause 4: Rent & Late Fees</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">Verified Citation</span>
              </div>
              <p className="text-xs text-slate-600 italic bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                "A grace period is extended through 11:59 PM on the 5th calendar day... initial late assessment fee of $75.00 shall immediately apply."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Enterprise CTA Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Transform Your Multi-Property Operations?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Join premier operators, property managers, and certified contractors delivering autonomous 99.8% SLA operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onGoToAuth('signup')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Account (Sign Up)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onGoToAuth('login')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Existing Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span className="font-bold text-slate-800">AuraProp AI Operations Suite</span>
            <span>• Enterprise Edition v2.6</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SOC-2 Type II
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <Lock className="w-3.5 h-3.5 text-blue-600" /> AES-256 Encryption
            </span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
