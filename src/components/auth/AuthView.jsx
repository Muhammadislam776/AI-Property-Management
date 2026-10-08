import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Wrench, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  KeyRound,
  Eye,
  EyeOff,
  ChevronLeft,
  Building
} from 'lucide-react';

export function AuthView({ initialMode = 'signup', onAuthSuccess, onBackToLanding }) {
  const [authMode, setAuthMode] = useState(initialMode); // 'signup' or 'login'
  const [selectedRole, setSelectedRole] = useState('manager'); // 'manager' | 'tenant' | 'contractor'
  
  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyOrUnit, setCompanyOrUnit] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & feedback
  const [successBanner, setSuccessBanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Pre-configured demo users for quick 1-click login
  const demoUsers = {
    manager: {
      name: "Alexander Hayes",
      email: "alex.hayes@auraprop.com",
      role: "manager",
      roleTitle: "Lead Portfolio Executive",
      property: "Portfolio: All 4 Properties",
      avatarInitials: "AH"
    },
    tenant: {
      name: "Sarah Jenkins",
      email: "sarah.j@skylinecrest.com",
      role: "tenant",
      roleTitle: "Resident (Unit 408)",
      property: "Skyline Crest Luxury Tower",
      avatarInitials: "SJ"
    },
    contractor: {
      name: "Apex Rapid Dispatch",
      email: "dispatch@apexplumbing.com",
      role: "contractor",
      roleTitle: "Certified MEP Vendor",
      property: "Assigned Service Region",
      avatarInitials: "AP"
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // Save temporary registered user
    const newUser = {
      name: fullName,
      email: email,
      role: selectedRole,
      roleTitle: selectedRole === 'manager' 
        ? 'Portfolio Operations Lead' 
        : selectedRole === 'tenant' 
        ? `Resident (${companyOrUnit || 'Unit 408'})` 
        : 'Certified Service Partner',
      property: selectedRole === 'tenant' ? (companyOrUnit || 'Skyline Crest Luxury Tower') : 'All Portfolios',
      avatarInitials: fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };

    // Store in localStorage for persistence
    localStorage.setItem('auraprop_registered_user', JSON.stringify(newUser));

    setSuccessBanner(`Account registered successfully as ${selectedRole.toUpperCase()}! Please enter your credentials to log in.`);
    setAuthMode('login');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    // Check if registered user exists
    const stored = localStorage.getItem('auraprop_registered_user');
    let authenticatedUser = null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email.toLowerCase() === email.toLowerCase()) {
          authenticatedUser = parsed;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // If matches demo credentials or fallback to demo role
    if (!authenticatedUser) {
      authenticatedUser = demoUsers[selectedRole];
      authenticatedUser.email = email;
      if (fullName) authenticatedUser.name = fullName;
    }

    onAuthSuccess(authenticatedUser);
  };

  const handleQuickDemoLogin = (roleKey) => {
    onAuthSuccess(demoUsers[roleKey]);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      {/* Back button */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-4">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Public Overview
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/25 mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            AuraProp AI Operations Suite
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm">
            {authMode === 'signup' 
              ? 'Create your role-authorized workspace account' 
              : 'Sign in to access your designated operations portal'}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl border border-slate-200/80">
          {/* Tab Selector: Sign Up (Default) vs Sign In */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 text-xs font-bold text-slate-600 border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
                setSuccessBanner(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                authMode === 'signup' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'hover:text-slate-900'
              }`}
            >
              Step 1: Sign Up (New Account)
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                authMode === 'login' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'hover:text-slate-900'
              }`}
            >
              Step 2: Sign In (Existing User)
            </button>
          </div>

          {/* Feedback Banners */}
          {successBanner && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Account Created!</span>
                <span>{successBanner}</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMessage}
            </div>
          )}

          {/* Role Selection Box */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Your Access Role & Clearance Level:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Manager Role */}
              <div
                onClick={() => setSelectedRole('manager')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'manager'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                    selectedRole === 'manager' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Manager</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Portfolio KPIs, leases, auto-triage & audit trails
                </p>
              </div>

              {/* Tenant Role */}
              <div
                onClick={() => setSelectedRole('tenant')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'tenant'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                    selectedRole === 'tenant' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Resident</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Unit rent pay, AI lease Q&A & photo tickets
                </p>
              </div>

              {/* Contractor Role */}
              <div
                onClick={() => setSelectedRole('contractor')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'contractor'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                    selectedRole === 'contractor' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Contractor</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Work orders, site lockbox codes & direct billing
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          {authMode === 'signup' ? (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins or Alex Hayes"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work / Personal Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-xs pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === 'tenant' ? 'Apartment & Building Name' : selectedRole === 'contractor' ? 'Trade Company / Specialization' : 'Property Management Firm'}
                </label>
                <input
                  type="text"
                  value={companyOrUnit}
                  onChange={(e) => setCompanyOrUnit(e.target.value)}
                  placeholder={selectedRole === 'tenant' ? 'e.g. Unit 408 - Skyline Crest Tower' : selectedRole === 'contractor' ? 'e.g. Apex 24/7 Rapid Response MEP' : 'e.g. Skyline Crest Portfolio Management'}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password (min. 6 chars)"
                    className="w-full text-xs pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 cursor-pointer">
                  I agree to the <span className="text-blue-700 font-semibold underline">Terms of Service</span> and <span className="text-blue-700 font-semibold underline">Fair Housing Privacy Protocols</span>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create Role Account & Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email || (demoUsers[selectedRole]?.email || '')}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full text-xs pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <span className="text-[11px] text-blue-700 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password || '••••••••'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-xs pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Authorize & Enter {selectedRole.toUpperCase()} Workspace</span>
              </button>
            </form>
          )}

          {/* Quick Demo One-Click Access Shortcuts */}
          <div className="mt-6 pt-5 border-t border-slate-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              Instant 1-Click Role Testing Access
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('manager')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Manager Panel</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('tenant')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <User className="w-3.5 h-3.5 text-blue-700" />
                <span>Tenant Panel</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('contractor')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Wrench className="w-3.5 h-3.5 text-blue-700" />
                <span>Vendor Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SOC-2 Type II Certified • 256-Bit TLS Military-Grade Encryption</span>
        </div>
      </div>
    </div>
  );
}
