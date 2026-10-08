import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Download, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  HelpCircle, 
  AlertCircle,
  FileCheck,
  FileSpreadsheet,
  Lock,
  ExternalLink
} from 'lucide-react';
import { sampleLeaseDocument, leaseQAPresets } from '../data/mockData';

export function SmartLeasingVaultView() {
  const [activeDocument, setActiveDocument] = useState('lease-1');
  const [highlightedClauseId, setHighlightedClauseId] = useState('clause-4');
  const [searchDocQuery, setSearchDocQuery] = useState('');
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I am AuraLease AI. I have indexed this 18-page executed residential agreement. Ask me anything about late fees, subletting, pets, or maintenance obligations.",
      citation: null
    },
    {
      id: 'init-2',
      sender: 'user',
      text: "What is the late fee policy and grace period?",
      citation: null
    },
    {
      id: 'init-3',
      sender: 'ai',
      text: "According to Clause 4, rent is due on the 1st of each month with a grace period extending through 11:59 PM on the 5th calendar day. If not paid by the 5th, an initial late assessment fee of $75.00 applies immediately, plus $10.00 per day thereafter.",
      citation: {
        clauseId: 'clause-4',
        clauseTitle: 'Clause 4. RENT & LATE FEES',
        snippet: "A grace period is extended through 11:59 PM on the fifth (5th) calendar day... initial late assessment fee of $75.00 shall immediately apply, plus a daily supplemental charge of $10.00"
      }
    }
  ]);
  const [customInput, setCustomInput] = useState('');

  const handleAskPreset = (preset) => {
    // Add user query
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: preset.query
    };

    // Add AI answer with citation
    const aiMsg = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: preset.shortAnswer,
      citation: {
        clauseId: preset.clauseId,
        clauseTitle: sampleLeaseDocument.clauses.find(c => c.id === preset.clauseId)?.number || 'Lease Clause',
        snippet: preset.highlightText
      }
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setHighlightedClauseId(preset.clauseId);

    // Scroll clause into view if element exists
    const el = document.getElementById(preset.clauseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput('');

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    // Simple keyword match simulation
    const lower = userText.toLowerCase();
    let matchedPreset = leaseQAPresets.find(p => 
      lower.includes('late') || lower.includes('fee') || lower.includes('grace') ? p.clauseId === 'clause-4' :
      lower.includes('pet') || lower.includes('dog') || lower.includes('cat') ? p.clauseId === 'clause-9' :
      lower.includes('sublet') || lower.includes('airbnb') ? p.clauseId === 'clause-18' :
      lower.includes('notice') || lower.includes('move') || lower.includes('terminate') ? p.clauseId === 'clause-22' : null
    );

    if (!matchedPreset) {
      matchedPreset = leaseQAPresets[0];
    }

    const aiMsg = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: `Based on your query: ${matchedPreset.shortAnswer}`,
      citation: {
        clauseId: matchedPreset.clauseId,
        clauseTitle: sampleLeaseDocument.clauses.find(c => c.id === matchedPreset.clauseId)?.number || 'Lease Clause',
        snippet: matchedPreset.highlightText
      }
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setHighlightedClauseId(matchedPreset.clauseId);

    const el = document.getElementById(matchedPreset.clauseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const documentsList = [
    { id: 'lease-1', title: 'Apt 4B - Residential Lease (Sarah Jenkins).pdf', size: '2.4 MB', status: 'Active Executed', type: 'lease' },
    { id: 'lease-2', title: 'Unit 214 - Residential Lease (Marcus Vance).pdf', size: '2.1 MB', status: 'Active Executed', type: 'lease' },
    { id: 'pet-1', title: 'Pet Addendum & Vaccine Verification.pdf', size: '890 KB', status: 'Approved', type: 'addon' },
    { id: 'move-1', title: 'Digital Move-In Inspection Report & Photos.pdf', size: '14.2 MB', status: 'Completed', type: 'inspection' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <FileCheck className="w-4 h-4 text-blue-600" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Smart Leasing & Secure Document Vault
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-proof legal repository with real-time AI clause indexing and citation verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-slate-500" /> AES-256 Encrypted
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DocuSign Verified
          </span>
        </div>
      </div>

      {/* Main Grid: Document Viewer & AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Digital Document Viewer with Clause Highlighting */}
        <div className="lg:col-span-7 space-y-4">
          {/* Document Picker Tabs */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2 overflow-x-auto">
            {documentsList.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocument(doc.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeDocument === doc.id
                    ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${activeDocument === doc.id ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="truncate max-w-[200px]">{doc.title}</span>
              </button>
            ))}
          </div>

          {/* PDF-Style Lease Document Container */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 max-h-[750px] overflow-y-auto">
            {/* Document Header Letterhead */}
            <div className="border-b-2 border-slate-900 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    Official Legal Document
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    STANDARD RESIDENTIAL LEASE AGREEMENT
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    State of California • Compliant with California Civil Code § 1940-1954
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold rounded-md border border-emerald-200">
                    ID: {sampleLeaseDocument.id}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    SHA-256: 0x9b71...a82f
                  </div>
                </div>
              </div>

              {/* Key metadata chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Tenant</span>
                  <span className="font-bold text-slate-800">{sampleLeaseDocument.tenant}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Premises</span>
                  <span className="font-bold text-slate-800">{sampleLeaseDocument.unit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Monthly Rent</span>
                  <span className="font-bold text-emerald-700">{sampleLeaseDocument.monthlyRent}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Lease Term</span>
                  <span className="font-bold text-slate-800">{sampleLeaseDocument.leaseTerm}</span>
                </div>
              </div>
            </div>

            {/* Clauses List */}
            <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-normal">
              {sampleLeaseDocument.clauses.map((clause) => {
                const isHighlighted = highlightedClauseId === clause.id;
                return (
                  <div 
                    key={clause.id}
                    id={clause.id}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isHighlighted 
                        ? 'bg-amber-50/80 border-2 border-amber-400 ring-4 ring-amber-100/60 shadow-md' 
                        : 'border border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {clause.number}: {clause.title}
                      </h4>
                      {isHighlighted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-700" /> Active AI Citation Highlight
                        </span>
                      )}
                    </div>
                    <p className={`text-justify ${isHighlighted ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                      {clause.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Signatures Stamped */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Landlord Representative</div>
                <div className="font-serif italic text-base text-blue-900 mt-1">Alexander Hayes, Operations VP</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Digitally signed via DocuSign • Oct 15, 2025</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Resident Tenant</div>
                <div className="font-serif italic text-base text-blue-900 mt-1">Sarah Jenkins</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Digitally signed via DocuSign • Oct 16, 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): AI Lease Q&A Assistant */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col h-[750px]">
            {/* AI Assistant Header */}
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    AuraLease™ Legal Q&A Assistant
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Real-time citations & clause references
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Indexed (18 Clauses)
              </span>
            </div>

            {/* Quick Preset Queries */}
            <div className="py-3 border-b border-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Frequently Asked Lease Questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {leaseQAPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskPreset(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium border border-slate-200/80 transition-all text-left truncate max-w-full"
                  >
                    💡 {preset.query}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Message History */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-700 text-white font-medium shadow-sm'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* AI Citation pill card */}
                  {msg.citation && (
                    <div 
                      onClick={() => {
                        setHighlightedClauseId(msg.citation.clauseId);
                        const el = document.getElementById(msg.citation.clauseId);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="mt-2 max-w-[90%] p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 cursor-pointer hover:bg-amber-100/80 transition-colors flex items-start gap-2 group"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold flex items-center gap-1 text-amber-800">
                          {msg.citation.clauseTitle}
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div className="text-[10px] text-amber-800/80 italic mt-0.5 line-clamp-2">
                          "{msg.citation.snippet}"
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleCustomSubmit} className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask about deposits, utilities, subletting..."
                className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-sm transition-colors"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
