import React, { useState, useEffect } from 'react';
import { LandingPageView } from './components/landing/LandingPageView';
import { AuthView } from './components/auth/AuthView';
import { ManagerPanel } from './components/manager/ManagerPanel';
import { TenantPanel } from './components/tenant/TenantPanel';
import { ContractorPanel } from './components/contractor/ContractorPanel';
import { propertiesData, initialMaintenanceTickets } from './data/mockData';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & auth states
  // view: 'landing' | 'auth' | 'app'
  const [currentView, setCurrentView] = useState('landing');
  const [authMode, setAuthMode] = useState('signup'); // 'signup' first, then 'login'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Shared app operational states
  const [tickets, setTickets] = useState(initialMaintenanceTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(initialMaintenanceTickets[0].id);
  const [customAuditLogs, setCustomAuditLogs] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAddAuditLog = (logItem) => {
    const newLog = {
      id: `AUDIT-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: "192.168.1.100",
      hash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      status: "Verified",
      ...logItem
    };
    setCustomAuditLogs(prev => [newLog, ...prev]);
  };

  const handleUpdateTicketStatus = (ticketId, stageIdx, stageName) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          stageIndex: stageIdx,
          status: stageName,
          timeline: t.timeline.map((item, idx) => {
            if (idx === stageIdx) {
              return { ...item, time: 'Just now' };
            }
            return item;
          })
        };
      }
      return t;
    }));

    showToast(`Work-order ${ticketId} updated to stage: ${stageName}`);
    handleAddAuditLog({
      actor: currentUser?.name || "System Actor",
      role: currentUser?.role === 'manager' ? "Property Manager" : currentUser?.role === 'contractor' ? "Contractor" : "Tenant",
      action: `TICKET_STAGE_${stageName.toUpperCase().replace(/\s+/g, '_')}`,
      target: `Ticket #${ticketId}`,
      details: `Advanced workflow state to ${stageName}`
    });
  };

  const handleAddNewTicket = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
    showToast(`AI auto-triaged new incident ${newTicket.id} with ${newTicket.aiAnalysis.urgency} urgency!`);
    handleAddAuditLog({
      actor: currentUser?.name || "Sarah Jenkins (Tenant)",
      role: "Tenant",
      action: "TICKET_CREATED_AI_TRIAGED",
      target: `Ticket #${newTicket.id}`,
      details: `AI classified ${newTicket.aiAnalysis.category} with ${newTicket.aiAnalysis.confidence}% confidence`
    });
  };

  // Auth Handlers
  const handleGoToAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  const handleAuthSuccess = (userObj) => {
    setCurrentUser(userObj);
    setCurrentView('app');
    showToast(`Welcome back, ${userObj.name}! Authenticated into ${userObj.role.toUpperCase()} workspace.`);
    handleAddAuditLog({
      actor: `${userObj.name} (${userObj.role})`,
      role: userObj.role === 'manager' ? "Property Manager" : userObj.role === 'contractor' ? "Contractor" : "Tenant",
      action: "USER_AUTHENTICATED",
      target: `Session Authorization`,
      details: `User granted clearance for ${userObj.roleTitle || userObj.role}`
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    showToast("Signed out successfully.");
  };

  const handleQuickLaunchRole = (roleKey) => {
    const quickUsers = {
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
        property: "Metro Service Region",
        avatarInitials: "AP"
      }
    };

    handleAuthSuccess(quickUsers[roleKey]);
  };

  const handleSwitchRole = (newRoleKey) => {
    handleQuickLaunchRole(newRoleKey);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-3.5 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border border-slate-800 max-w-md">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-xs font-semibold flex-1">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white font-bold text-sm px-1 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Screen 1: Landing Page */}
      {currentView === 'landing' && (
        <LandingPageView
          onGoToAuth={handleGoToAuth}
          onQuickLaunchRole={handleQuickLaunchRole}
        />
      )}

      {/* Screen 2: Sign-Up & Login Authentication Screen */}
      {currentView === 'auth' && (
        <AuthView
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}

      {/* Screen 3: Role-Authorized Panels */}
      {currentView === 'app' && currentUser && (
        <>
          {currentUser.role === 'manager' && (
            <ManagerPanel
              currentUser={currentUser}
              onLogout={handleLogout}
              onSwitchRole={handleSwitchRole}
              properties={propertiesData}
              tickets={tickets}
              onSelectTicket={setSelectedTicketId}
              selectedTicketId={selectedTicketId}
              onUpdateTicketStatus={handleUpdateTicketStatus}
              onAddNewTicket={handleAddNewTicket}
              customAuditLogs={customAuditLogs}
              onAddAuditLog={handleAddAuditLog}
              onShowToast={showToast}
            />
          )}

          {currentUser.role === 'tenant' && (
            <TenantPanel
              currentUser={currentUser}
              onLogout={handleLogout}
              onSwitchRole={handleSwitchRole}
              tickets={tickets}
              onAddNewTicket={handleAddNewTicket}
              onShowToast={showToast}
            />
          )}

          {currentUser.role === 'contractor' && (
            <ContractorPanel
              currentUser={currentUser}
              onLogout={handleLogout}
              onSwitchRole={handleSwitchRole}
              tickets={tickets}
              onUpdateTicketStatus={handleUpdateTicketStatus}
              onShowToast={showToast}
              onAddAuditLog={handleAddAuditLog}
            />
          )}
        </>
      )}
    </div>
  );
}
