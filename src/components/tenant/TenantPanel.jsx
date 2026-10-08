import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  Plus, 
  ShieldCheck, 
  Camera, 
  Send,
  AlertTriangle,
  Building2,
  ChevronRight
} from 'lucide-react';
import { SmartLeasingVaultView } from '../SmartLeasingVaultView';

export function TenantPanel({
  currentUser,
  onLogout,
  onSwitchRole,
  tickets,
  onAddNewTicket,
  onShowToast
}) {
  const [tenantTab, setTenantTab] = useState('overview'); // 'overview' | 'tickets' | 'report' | 'lease' | 'messages'
  const [showPayModal, setShowPayModal] = useState(false);
  const [rentPaid, setRentPaid] = useState(false);

  // New issue report state
  const [reportDesc, setReportDesc] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState('/images/maintenance-ai.jpg');
  const [isScanning, setIsScanning] = useState(false);

  // Messages state
  const [chatMessages, setChatMessages] = useState([
    { sender: "system", time: "08:43 AM", text: "AuraProp AI: Ticket #TICK-8092 created for master bathroom pipe rupture. Plumber matched." },
    { sender: "manager", time: "10:20 AM", text: "Hi Sarah, Apex Plumbing is en route with an ETA of 25 minutes. Industrial drying fans will be provided at no cost." },
    { sender: "tenant", time: "10:22 AM", text: "Thank you so much! I have placed towels around the baseboards." }
  ]);
  const [newMsgText, setNewMsgText] = useState('');

  const residentTicket = tickets.find(t => t.unit.includes('408')) || tickets[0];

  const handlePayRent = (e) => {
    e.preventDefault();
    setRentPaid(true);
    setShowPayModal(false);
    if (onShowToast) {
      onShowToast("Rent payment of $2,850.00 successfully transferred via ACH Direct Debit!");
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportDesc.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const newTicketObj = {
        id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyId: "prop-1",
        propertyName: "Skyline Crest Luxury Tower",
        unit: currentUser?.property?.includes('Unit') ? currentUser.property : "Unit 408",
        tenantName: currentUser?.name || "Sarah Jenkins",
        tenantPhone: "(555) 349-8812",
        reportedAt: "Just now",
        description: reportDesc,
        imageUrl: selectedPhoto,
        aiAnalysis: {
          category: "Plumbing & Fixture Inspection",
          urgency: "HIGH",
          urgencyScore: 88,
          riskLevel: "Moderate Ingress Risk",
          estimatedCost: "$160 - $220",
          confidence: 96.5,
          diagnosisText: "Computer vision scan identified localized water ingress. Automated dispatch queued.",
          recommendedContractor: {
            id: "CONT-101",
            name: "Apex 24/7 Rapid Response Plumbing",
            rating: 4.95,
            completedJobs: 142,
            eta: "30 - 45 mins",
            phone: "(555) 911-PIPE",
            insuranceVerified: true
          }
        },
        status: "AI Triaged",
        stageIndex: 1,
        assignedContractor: "Apex 24/7 Rapid Response Plumbing",
        timeline: [
          { stage: "Requested", time: "Just now", desc: "Submitted by resident with image." },
          { stage: "AI Triaged", time: "Just now", desc: "AuraVision AI triaged with 96.5% confidence." }
        ]
      };

      onAddNewTicket(newTicketObj);
      setIsScanning(false);
      setReportDesc('');
      setTenantTab('tickets');
    }, 1200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { sender: "tenant", time: "Just now", text: newMsgText }
    ]);
    setNewMsgText('');
    if (onShowToast) {
      onShowToast("Message sent to Building Operations Office");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Resident Dedicated Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900">Resident Portal</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Unit 408 • Sarah Jenkins
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Skyline Crest Luxury Tower</p>
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

      {/* Resident Sub-Navigation Tabs */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setTenantTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              tenantTab === 'overview'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home & Rent Status</span>
          </button>

          <button
            onClick={() => setTenantTab('tickets')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              tenantTab === 'tickets'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Maintenance Tracker</span>
            {residentTicket && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setTenantTab('report')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              tenantTab === 'report'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Report Issue (AI Scan)</span>
          </button>

          <button
            onClick={() => setTenantTab('lease')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              tenantTab === 'lease'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Lease & AI Q&A</span>
          </button>

          <button
            onClick={() => setTenantTab('messages')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              tenantTab === 'messages'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages with Office</span>
          </button>
        </div>
      </div>

      {/* Main Resident Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Tab 1: Home & Rent Overview */}
        {tenantTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-100 text-xs font-bold border border-blue-400/30">
                    Apartment 4B • Active Lease
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome home, {currentUser?.name || "Sarah"}!</h2>
                <p className="text-xs text-blue-100/90 max-w-lg">
                  Rent is scheduled for automated ACH settlement. Emergency facilities team is currently resolving ticket #TICK-8092.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPayModal(true)}
                  className="px-5 py-3 bg-white text-blue-900 font-bold text-xs rounded-2xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  {rentPaid ? 'View Payment Receipt' : 'Pay Rent ($2,850)'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Rent Due Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Upcoming Month Rent</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    AutoPay ON
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {rentPaid ? '$0.00' : '$2,850.00'}
                </div>
                <p className="text-xs text-slate-500">
                  {rentPaid ? 'Paid in full for November 2026' : 'Scheduled on November 1, 2026 via Chase (****4109)'}
                </p>
              </div>

              {/* Maintenance Snapshot */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Active Work Order</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                    Emergency
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900 line-clamp-1">
                  Bathroom Pipe Rupture
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Apex Plumbing ETA: 25 mins
                </p>
              </div>

              {/* Quick AI Lease Help */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">Lease Concierge AI</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have questions about pet fees, overnight guests, or parking spaces?
                </p>
                <button
                  onClick={() => setTenantTab('lease')}
                  className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-blue-700 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Ask AI Assistant</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Maintenance Tracker */}
        {tenantTab === 'tickets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Live Work Order Progress</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {residentTicket.id} — {residentTicket.aiAnalysis.category}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                  {residentTicket.aiAnalysis.urgency} Urgency
                </span>
              </div>

              {/* Visual 5-Stage Tracker */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  {['Requested', 'AI Triaged', 'Assigned', 'In Progress', 'Resolved'].map((stg, i) => (
                    <div key={stg} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        i <= residentTicket.stageIndex ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {i + 1}
                      </div>
                      <span className="text-[11px] mt-1.5 text-slate-700">{stg}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${((residentTicket.stageIndex + 1) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Emergency Instructions Card */}
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>AuraProp Protective Protocol:</span>
                </div>
                <p>
                  1. Turn the clockwise angle-stop valve beneath the sink 90 degrees to shut off water pressure.<br />
                  2. Keep bathroom door shut to prevent humidity transfer.<br />
                  3. Apex 24/7 Rapid Response is arriving shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Report Issue with AI Vision */}
        {tenantTab === 'report' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl mx-auto space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">AuraVision™ AI Triage</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Submit Issue with Computer Vision Scan</h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload a photo of any leak, appliance malfunction, or electrical anomaly for instant AI risk assessment.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Description</label>
                <textarea
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder="Describe what happened, where the issue is, and if there is active water or power loss..."
                  rows={4}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Upload Photo for AI Inspection</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50">
                  <img
                    src={selectedPhoto}
                    alt="Inspection preview"
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <div className="text-xs text-slate-600 font-semibold flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>Photo attached: Multi-point inspection image ready</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <span>Running Computer Vision Diagnostic...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Triage & Submit Work Order</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: My Lease & AI Q&A */}
        {tenantTab === 'lease' && (
          <SmartLeasingVaultView />
        )}

        {/* Tab 5: Messages with Management */}
        {tenantTab === 'messages' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-3xl mx-auto space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Direct Message with Building Operations</h3>
                <p className="text-xs text-slate-500">Concierge & maintenance messaging thread</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Online Desk
              </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'tenant' ? 'items-end' : m.sender === 'system' ? 'items-center' : 'items-start'}`}
                >
                  {m.sender === 'system' ? (
                    <div className="p-2 bg-slate-100 rounded-full text-[10px] text-slate-600 font-medium">
                      {m.text}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'tenant'
                          ? 'bg-blue-700 text-white font-medium rounded-tr-xs'
                          : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                      }`}
                    >
                      <div className="text-[10px] opacity-75 mb-1">{m.sender === 'tenant' ? 'You' : 'Operations Desk'} • {m.time}</div>
                      {m.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={newMsgText}
                onChange={(e) => setNewMsgText(e.target.value)}
                placeholder="Type your message to building operations..."
                className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Pay Rent Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-slate-900">Authorize Rent Payment</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 font-bold text-lg">×</button>
            </div>
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <span>Monthly Rent (Unit 408)</span>
                <span className="font-bold text-base text-slate-900">$2,850.00 USD</span>
              </div>
              <p className="text-xs text-slate-500">
                Payment will be debited from linked Chase checking account (****4109) with zero transaction fees.
              </p>
              <button
                onClick={handlePayRent}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>Confirm & Transfer $2,850.00</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
