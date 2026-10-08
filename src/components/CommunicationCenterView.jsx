import React, { useState } from 'react';
import { 
  Inbox, 
  Send, 
  Sparkles, 
  User, 
  Clock, 
  CheckCheck, 
  Check, 
  ChevronRight, 
  Smile, 
  Paperclip, 
  ShieldCheck, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { initialMessages } from '../data/mockData';

export function CommunicationCenterView({ onAddAuditLog }) {
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [selectedMessageId, setSelectedMessageId] = useState(initialMessages[0].id);
  const [replyText, setReplyText] = useState('');
  const [showAiDraftModal, setShowAiDraftModal] = useState(false);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  const selectedMsg = messagesList.find(m => m.id === selectedMessageId) || messagesList[0];

  // Pre-configured AI reply drafts tailored to the tenant's message
  const aiDraftOptions = [
    {
      tone: "Empathetic & Rapid Action (Recommended)",
      badge: "Highest Resident Satisfaction",
      text: `Hi Sarah,\n\nI completely understand how stressful this situation is. Our emergency response contractor, Apex 24/7 Rapid Response, is already en route with an estimated arrival window of 25–35 minutes (between 10:45 AM and 11:00 AM).\n\nRegarding the dampness at the hallway carpet: absolutely, building operations will deploy commercial dehumidifiers and air blowers at zero expense to you as part of our water mitigation protocol. Please keep the bathroom door closed to contain moisture until the crew arrives.\n\nBest regards,\nAlexander Hayes | Operations Lead`
    },
    {
      tone: "Formal & Policy-Compliant",
      badge: "Standard Operations",
      text: `Dear Sarah Jenkins,\n\nThank you for promptly notifying building management. Work order #TICK-8092 has been dispatched to Apex Plumbing. Per Section 14 of your lease agreement, emergency pipe failures are addressed with high priority. Structural and flooring dry-out procedures will be handled by building facilities. Please ensure unobstructed access to the bathroom vanity upon technician arrival.\n\nSincerely,\nProperty Management Office`
    },
    {
      tone: "Concise Mobile Dispatch",
      badge: "Quick Update",
      text: `Hi Sarah, Apex Plumbing is 25 minutes away and will arrive shortly to repair the pipe. We will also inspect the carpet and set up industrial drying fans immediately. Thank you for your patience!`
    }
  ];

  const handleGenerateAiDraft = () => {
    setIsGeneratingDraft(true);
    setTimeout(() => {
      setIsGeneratingDraft(false);
      setShowAiDraftModal(true);
    }, 700);
  };

  const handleSelectDraft = (text) => {
    setReplyText(text);
    setShowAiDraftModal(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      sender: "manager",
      time: "Just now",
      text: replyText
    };

    setMessagesList(prev => prev.map(m => {
      if (m.id === selectedMsg.id) {
        return {
          ...m,
          unread: false,
          thread: [...m.thread, newReply]
        };
      }
      return m;
    }));

    if (onAddAuditLog) {
      onAddAuditLog({
        actor: "Alexander Hayes (Property Manager)",
        role: "Property Manager",
        action: "AI_REPLY_SENT",
        target: `Tenant ${selectedMsg.tenantName} (${selectedMsg.unit})`,
        details: "Dispatched response regarding plumbing contractor arrival & flooring mitigation"
      });
    }

    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Resident Communications & AI Copilot
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Omni-channel tenant communications with contextual tone generation and instant legal compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Reply Engine Active
          </span>
        </div>
      </div>

      {/* Main Grid: Inbox Left, Conversation Thread Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inbox List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3 space-y-2">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Inbox Threads ({messagesList.length})
          </div>

          <div className="space-y-1.5">
            {messagesList.map((msg) => {
              const isSelected = msg.id === selectedMsg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessageId(msg.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-200 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={msg.avatar}
                        alt={msg.tenantName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-xs font-bold text-slate-900">{msg.tenantName}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-800 truncate mb-1">
                    {msg.subject}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {msg.body}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                    <span className="text-slate-400 font-medium">{msg.unit}</span>
                    {msg.unread && (
                      <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200">
                        Needs Reply
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation Thread (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col h-[700px]">
          {/* Thread Header */}
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedMsg.avatar}
                alt={selectedMsg.tenantName}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{selectedMsg.tenantName}</h3>
                <p className="text-xs text-slate-500 font-medium">{selectedMsg.unit} • Subject: {selectedMsg.subject}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleGenerateAiDraft}
                disabled={isGeneratingDraft}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                {isGeneratingDraft ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analyzing Message...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    AI Draft Reply
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {selectedMsg.thread.map((t, idx) => (
              <div 
                key={idx}
                className={`flex flex-col ${t.sender === 'manager' ? 'items-end' : t.sender === 'system' ? 'items-center' : 'items-start'}`}
              >
                {t.sender === 'system' ? (
                  <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] text-slate-500 font-medium">
                    {t.text}
                  </div>
                ) : (
                  <div className="max-w-[80%] space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                      <span>{t.sender === 'manager' ? 'Operations Manager (You)' : selectedMsg.tenantName}</span>
                      <span>•</span>
                      <span>{t.time}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        t.sender === 'manager'
                          ? 'bg-blue-700 text-white rounded-tr-xs shadow-sm font-medium'
                          : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                      }`}
                    >
                      {t.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Compose Area */}
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
            <div className="relative">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response or use '✨ AI Draft Reply' to generate a verified response..."
                rows={3}
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateAiDraft}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Suggest 3 Tones
                </button>
              </div>

              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-700/20 disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI Draft Selector Modal */}
      {showAiDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Select AI Generated Draft</h3>
                  <p className="text-xs text-slate-500">Formulated from ticket #TICK-8092 context & building policies</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiDraftModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {aiDraftOptions.map((opt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      {opt.tone}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {opt.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-200/60 mb-3">
                    {opt.text}
                  </p>

                  <button
                    onClick={() => handleSelectDraft(opt.text)}
                    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Insert This Draft into Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
