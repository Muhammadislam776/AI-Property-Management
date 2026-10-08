import React, { useState } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { DashboardView } from '../DashboardView';
import { MaintenanceTriageView } from '../MaintenanceTriageView';
import { SmartLeasingVaultView } from '../SmartLeasingVaultView';
import { CommunicationCenterView } from '../CommunicationCenterView';
import { PaymentsFinancialsView } from '../PaymentsFinancialsView';
import { AuditTrailView } from '../AuditTrailView';

export function ManagerPanel({
  currentUser,
  onLogout,
  onSwitchRole,
  properties,
  tickets,
  onSelectTicket,
  selectedTicketId,
  onUpdateTicketStatus,
  onAddNewTicket,
  customAuditLogs,
  onAddAuditLog,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState('all');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Property Manager Top Navigation */}
      <Header
        currentRole="manager"
        currentUser={currentUser}
        onRoleChange={onSwitchRole}
        onLogout={onLogout}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        properties={properties}
        unreadCount={1}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Operations Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          ticketAlertCount={tickets.filter(t => t.aiAnalysis.urgency === 'CRITICAL' && t.status !== 'Resolved').length}
          unreadMsgCount={1}
        />

        {/* Manager Main Work Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              properties={properties}
              selectedProperty={selectedProperty}
              tickets={tickets}
              onNavigateToTab={setActiveTab}
              onSelectTicket={(ticketId) => {
                onSelectTicket(ticketId);
                setActiveTab('maintenance');
              }}
            />
          )}

          {activeTab === 'maintenance' && (
            <MaintenanceTriageView
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={onSelectTicket}
              onUpdateTicketStatus={onUpdateTicketStatus}
              onAddNewTicket={onAddNewTicket}
            />
          )}

          {activeTab === 'leases' && (
            <SmartLeasingVaultView />
          )}

          {activeTab === 'messages' && (
            <CommunicationCenterView 
              onAddAuditLog={onAddAuditLog}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsFinancialsView
              onAddAuditLog={onAddAuditLog}
              onShowToast={onShowToast}
            />
          )}

          {activeTab === 'audit' && (
            <AuditTrailView
              customLogs={customAuditLogs}
            />
          )}
        </main>
      </div>
    </div>
  );
}
