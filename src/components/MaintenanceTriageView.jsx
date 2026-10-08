import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Upload, 
  Send, 
  ShieldCheck, 
  User, 
  Phone, 
  DollarSign, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Zap,
  Flame,
  Droplets,
  Cpu,
  RefreshCw,
  Plus
} from 'lucide-react';

export function MaintenanceTriageView({ 
  tickets, 
  selectedTicketId, 
  onSelectTicket, 
  onUpdateTicketStatus, 
  onAddNewTicket 
}) {
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  // New ticket form state
  const [newTitle, setNewTitle] = useState('');
  const [newUnit, setNewUnit] = useState('Unit 408 - Skyline Crest');
  const [newDescription, setNewDescription] = useState('Dishwasher started spewing hot suds across the kitchen hardwood floor during the rinse cycle. Motor is grinding loudly.');
  const [newCategory, setNewCategory] = useState('Plumbing & Appliances');
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80');

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    if (activeTabFilter === 'critical') return t.aiAnalysis.urgency === 'CRITICAL' || t.aiAnalysis.urgency === 'HIGH';
    if (activeTabFilter === 'active') return t.status !== 'Resolved';
    if (activeTabFilter === 'resolved') return t.status === 'Resolved';
    return true;
  });

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleSimulateAiSubmit = (e) => {
    e.preventDefault();
    setIsAiAnalyzing(true);

    setTimeout(() => {
      const newTicketObj = {
        id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyId: "prop-1",
        propertyName: "Skyline Crest Luxury Tower",
        unit: newUnit,
        tenantName: "Sarah Jenkins",
        tenantPhone: "(555) 349-8812",
        reportedAt: "Just now",
        description: newDescription,
        imageUrl: selectedPhotoPreset,
        aiAnalysis: {
          category: "Emergency Plumbing & Appliance",
          urgency: "HIGH",
          urgencyScore: 89,
          riskLevel: "Hardwood Delamination & Motor Burnout Risk",
          estimatedCost: "$190 - $260",
          confidence: 97.8,
          diagnosisText: "Computer vision and NLP analysis indicates pump seal failure causing high volume water discharge onto porous flooring. Rapid drain clear and shut-off advised.",
          recommendedContractor: {
            id: "CONT-104",
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
          { stage: "Requested", time: "Just now", desc: "Submitted with high-resolution photo." },
          { stage: "AI Triaged", time: "Just now", desc: "AuraVision AI classified as High Urgency appliance flood (97.8% confidence)." },
          { stage: "Contractor Assigned", time: "Queued", desc: "Awaiting approval to dispatch Apex 24/7." },
          { stage: "In Progress", time: "--", desc: "Technician dispatched." },
          { stage: "Resolved", time: "--", desc: "Sign-off pending." }
        ]
      };

      onAddNewTicket(newTicketObj);
      setIsAiAnalyzing(false);
      setShowNewTicketModal(false);
    }, 1500);
  };

  const handleStageAdvance = (stageIndex, stageName) => {
    if (!selectedTicket) return;
    onUpdateTicketStatus(selectedTicket.id, stageIndex, stageName);
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
          <Flame className="w-3 h-3 text-rose-600 animate-pulse" /> Critical Emergency
        </span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-600" /> High Urgency
        </span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-600" /> Standard SLA
        </span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          Low Priority
        </span>;
    }
  };

  const stagesList = [
    { name: "Requested", label: "Tenant Reported" },
    { name: "AI Triaged", label: "Aura AI Analysis" },
    { name: "Assigned", label: "Contractor Dispatched" },
    { name: "In Progress", label: "On-Site Repair" },
    { name: "Resolved", label: "Verified & Closed" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Triage Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              AI-Powered Maintenance Triage Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated image inspection, urgency scoring, contractor matching, and stage tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Submit New Ticket (Tenant Simulation)
          </button>
        </div>
      </div>

      {/* Main Grid: Ticket Sidebar & AI Deep Triage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Ticket Directory */}
        <div className="lg:col-span-4 space-y-3">
          {/* Quick Filters */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200/80">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                activeTabFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              All ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('critical')}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                activeTabFilter === 'critical' ? 'bg-white text-rose-700 shadow-sm font-bold' : 'hover:text-slate-900'
              }`}
            >
              Urgent
            </button>
            <button
              onClick={() => setActiveTabFilter('active')}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                activeTabFilter === 'active' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTabFilter('resolved')}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                activeTabFilter === 'resolved' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Resolved
            </button>
          </div>

          {/* Ticket Cards List */}
          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredTickets.map((ticket) => {
              const isSelected = ticket.id === selectedTicket?.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 shadow-sm shadow-blue-500/10'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500">{ticket.id}</span>
                    {getUrgencyBadge(ticket.aiAnalysis.urgency)}
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                    {ticket.aiAnalysis.category}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 text-slate-500">
                    <span className="font-semibold text-slate-700">{ticket.unit}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.status === 'Resolved' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : ticket.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Deep AI Visualizer & Interactive Work-Order Timeline */}
        {selectedTicket && (
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Interactive Work-Order Visual Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    Work-Order Pipeline Tracker
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    {selectedTicket.id} — {selectedTicket.unit} ({selectedTicket.propertyName})
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Stage {selectedTicket.stageIndex + 1} of 5:</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              {/* Multi-stage Progress Stepper */}
              <div className="relative my-6 px-2">
                <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${(selectedTicket.stageIndex / (stagesList.length - 1)) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between relative z-10">
                  {stagesList.map((stg, idx) => {
                    const isCompleted = idx < selectedTicket.stageIndex;
                    const isCurrent = idx === selectedTicket.stageIndex;

                    return (
                      <button
                        key={stg.name}
                        onClick={() => handleStageAdvance(idx, stg.name)}
                        className="flex flex-col items-center group cursor-pointer text-center max-w-[80px]"
                        title={`Click to set stage to ${stg.name}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                          isCompleted
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-white border-blue-600 text-blue-700 ring-4 ring-blue-100 shadow-md'
                            : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[10px] mt-2 font-bold leading-tight ${
                          isCurrent ? 'text-blue-700' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                        }`}>
                          {stg.name}
                        </span>
                        <span className="text-[9px] text-slate-400 hidden sm:block">
                          {stg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Stage History details */}
              <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/70 text-xs">
                <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Latest Milestone Activity:
                </div>
                <p className="text-slate-600">
                  {selectedTicket.timeline[selectedTicket.stageIndex]?.desc || selectedTicket.timeline[0].desc}
                </p>
              </div>
            </div>

            {/* 2. AI Visualizer & Image Inspection Diagnostic Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      AuraVision™ Autonomous Diagnostic Engine
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Neural multimodal scan • Confidence: <span className="font-bold text-emerald-600">{selectedTicket.aiAnalysis.confidence}%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Urgency Score:</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                    {selectedTicket.aiAnalysis.urgencyScore}/100
                  </span>
                </div>
              </div>

              {/* Image & Computer Vision Overlay */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Submitted Media with simulated AI Bounding Boxes */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
                  <img
                    src={selectedTicket.imageUrl}
                    alt="Maintenance damage photo"
                    className="w-full h-56 object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* AI Visualizer Bounding Box Simulation */}
                  <div className="absolute inset-8 border-2 border-dashed border-rose-400 rounded-lg bg-rose-500/10 pointer-events-none flex flex-col justify-between p-2">
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm self-start flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Anomaly Detected: Liquid Pooling
                    </span>
                    <span className="bg-black/80 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded self-end">
                      p=0.994 [CONFIRMED]
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-blue-300" /> Tenant Evidence Photo
                    </span>
                    <span className="text-slate-300">{selectedTicket.reportedAt}</span>
                  </div>
                </div>

                {/* AI Triage Matrix Breakdown */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                      Diagnostic Findings
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-medium">
                      "{selectedTicket.aiAnalysis.diagnosisText}"
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <div className="text-[10px] text-slate-400 font-semibold">Risk Classification</div>
                      <div className="font-bold text-slate-800 text-[11px] mt-0.5">
                        {selectedTicket.aiAnalysis.riskLevel}
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <div className="text-[10px] text-slate-400 font-semibold">Estimated Repair Cost</div>
                      <div className="font-bold text-emerald-700 text-xs mt-0.5 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-600" /> {selectedTicket.aiAnalysis.estimatedCost}
                      </div>
                    </div>
                  </div>

                  {/* Tenant Context */}
                  <div className="flex items-center justify-between p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {selectedTicket.tenantName[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">{selectedTicket.tenantName}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5">{selectedTicket.tenantPhone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700">{selectedTicket.unit}</span>
                  </div>
                </div>
              </div>

              {/* 3. AI Contractor Matching & One-Click Dispatch Stub */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-4 border border-blue-200/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Auto-Matched Certified Contractor
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Insurance & License Verified
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      AP
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {selectedTicket.aiAnalysis.recommendedContractor.name}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span className="text-amber-600 font-bold">★ {selectedTicket.aiAnalysis.recommendedContractor.rating}</span>
                        <span>•</span>
                        <span>{selectedTicket.aiAnalysis.recommendedContractor.completedJobs} jobs completed</span>
                        <span>•</span>
                        <span className="text-blue-700 font-semibold">ETA: {selectedTicket.aiAnalysis.recommendedContractor.eta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedTicket.status === 'Requested' || selectedTicket.status === 'AI Triaged' ? (
                      <button
                        onClick={() => handleStageAdvance(2, "Assigned")}
                        className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        1-Click Auto-Dispatch Vendor
                      </button>
                    ) : selectedTicket.status === 'Assigned' ? (
                      <button
                        onClick={() => handleStageAdvance(3, "In Progress")}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
                      >
                        <Wrench className="w-4 h-4" />
                        Set to In Progress
                      </button>
                    ) : selectedTicket.status === 'In Progress' ? (
                      <button
                        onClick={() => handleStageAdvance(4, "Resolved")}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark Work-Order Resolved
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Work-Order Completed & Signed Off
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Simulate Tenant Issue Submission with AI Triage */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Resident Maintenance Submission</h3>
                  <p className="text-xs text-slate-500">Live AI computer-vision triage will analyze your report</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewTicketModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSimulateAiSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Apartment / Unit</label>
                <select
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                >
                  <option value="Unit 408 - Skyline Crest">Unit 408 - Skyline Crest (Sarah Jenkins)</option>
                  <option value="Unit 214 - Silicon Lofts">Unit 214 - Silicon Lofts (Marcus Vance)</option>
                  <option value="Unit 102 - Oakridge Terraces">Unit 102 - Oakridge Terraces (Elena Rostova)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Description & Symptoms</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 placeholder-slate-400"
                  placeholder="Describe what is malfunctioning, any sounds, water leakages, or electrical issues..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Photo for Computer Vision Scan
                </label>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div 
                    onClick={() => setSelectedPhotoPreset('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80')}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 relative ${
                      selectedPhotoPreset.includes('585704032915') ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                    }`}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80" 
                      alt="Preset 1: Water leak" 
                      className="h-20 w-full object-cover"
                    />
                    <div className="p-1.5 bg-white text-[10px] font-bold text-slate-700 text-center">
                      Leak / Pipe Rupture
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedPhotoPreset('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80')}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 relative ${
                      selectedPhotoPreset.includes('1621905251189') ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                    }`}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80" 
                      alt="Preset 2: HVAC" 
                      className="h-20 w-full object-cover"
                    />
                    <div className="p-1.5 bg-white text-[10px] font-bold text-slate-700 text-center">
                      HVAC / AC Compressor
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAiAnalyzing}
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-700/20 disabled:opacity-50"
                >
                  {isAiAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing with Computer Vision...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Run AI Diagnostic & Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
