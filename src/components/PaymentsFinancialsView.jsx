import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  ShieldCheck, 
  Building, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { rentLedgerData } from '../data/mockData';

export function PaymentsFinancialsView({ onAddAuditLog, onShowToast }) {
  const [ledgers, setLedgers] = useState(rentLedgerData);
  const [autoReminderEnabled, setAutoReminderEnabled] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLedgerItem, setSelectedLedgerItem] = useState(rentLedgerData[0]);
  const [paymentType, setPaymentType] = useState('ach'); // 'ach' or 'card'

  // Payment form state
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('883');
  const [bankRouting, setBankRouting] = useState('121000358');
  const [bankAccount, setBankAccount] = useState('0009841284');

  const handleTriggerReminder = (tenantName, unit) => {
    if (onShowToast) {
      onShowToast(`Automated SMS & Email reminder dispatched to ${tenantName} (${unit})`);
    }
    if (onAddAuditLog) {
      onAddAuditLog({
        actor: "Alexander Hayes (Property Manager)",
        role: "Property Manager",
        action: "PAYMENT_REMINDER_TRIGGERED",
        target: `Tenant ${tenantName} (${unit})`,
        details: "Automated payment notification & secure payment link dispatched"
      });
    }
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setLedgers(prev => prev.map(l => {
      if (l.id === selectedLedgerItem.id) {
        return {
          ...l,
          status: 'Paid',
          lastPaidDate: 'Today'
        };
      }
      return l;
    }));

    if (onShowToast) {
      onShowToast(`Payment of $${selectedLedgerItem.rentAmount.toLocaleString()} successfully processed for ${selectedLedgerItem.unit}!`);
    }

    if (onAddAuditLog) {
      onAddAuditLog({
        actor: "Sarah Jenkins (Tenant)",
        role: "Tenant",
        action: "PAYMENT_PROCESSED",
        target: `Rent Ledger ${selectedLedgerItem.id}`,
        details: `Processed $${selectedLedgerItem.rentAmount} via ${paymentType === 'ach' ? 'ACH Bank Transfer' : 'Credit Card'}`
      });
    }

    setShowPaymentModal(false);
  };

  const totalCollected = ledgers.filter(l => l.status === 'Paid').reduce((acc, l) => acc + l.rentAmount, 0);
  const totalOverdue = ledgers.filter(l => l.status.includes('Overdue')).reduce((acc, l) => acc + l.rentAmount, 0);
  const totalUpcoming = ledgers.filter(l => l.status === 'Upcoming').reduce((acc, l) => acc + l.rentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Payments, Escrow & Rent Ledgers
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated rent billing, PCI-compliant payment gateways, and real-time ledger accounting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Automated Reminder Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">Auto Reminders</span>
            <button
              onClick={() => setAutoReminderEnabled(!autoReminderEnabled)}
              className="text-blue-700 focus:outline-none"
            >
              {autoReminderEnabled ? (
                <ToggleRight className="w-6 h-6 text-blue-700" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedLedgerItem(ledgers[0]);
              setShowPaymentModal(true);
            }}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Process Rent Payment
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Collected Month-to-Date</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalCollected.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            96.4% on-time settlement
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Upcoming Due (Grace Period)</span>
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${totalUpcoming.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            AutoPay scheduled on Nov 1
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Delinquent / Overdue</span>
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-rose-700">${totalOverdue.toLocaleString()}</div>
          <div className="text-[11px] text-rose-600 font-bold mt-1">
            1 Unit with late assessment
          </div>
        </div>
      </div>

      {/* Rent Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Portfolio Rent Ledgers & Settlement Status</h3>
          <span className="text-xs text-slate-500 font-medium">All accounts FDIC-insured</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Unit & Property</th>
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Monthly Rent</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {ledgers.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{l.unit}</td>
                  <td className="py-3.5 px-4">{l.tenant}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                    ${l.rentAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">{l.dueDate}</td>
                  <td className="py-3.5 px-4 text-slate-600 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span>{l.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      l.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : l.status.includes('Overdue')
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {l.status.includes('Overdue') && (
                        <button
                          onClick={() => handleTriggerReminder(l.tenant, l.unit)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] border border-rose-200 transition-colors flex items-center gap-1"
                          title="Trigger automated SMS and Email reminder"
                        >
                          <Send className="w-3 h-3" />
                          Send Reminder
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedLedgerItem(l);
                          setShowPaymentModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition-colors"
                      >
                        {l.status === 'Paid' ? 'Receipt' : 'Pay Now'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Processing Stub Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Secure Payment Gateway</h3>
                  <p className="text-xs text-slate-500">Encrypted PCI-DSS Level 1 Gateway</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Settlement for</span>
                <span className="font-bold text-slate-900">{selectedLedgerItem.unit}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Total Amount</span>
                <span className="font-bold text-emerald-700 text-sm">
                  ${selectedLedgerItem.rentAmount.toLocaleString()}.00 USD
                </span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-4 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setPaymentType('ach')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  paymentType === 'ach' ? 'bg-white text-blue-700 shadow-sm font-bold' : ''
                }`}
              >
                🏦 ACH Bank Debit ($0 Fee)
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  paymentType === 'card' ? 'bg-white text-blue-700 shadow-sm font-bold' : ''
                }`}
              >
                💳 Credit / Debit Card
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-3.5">
              {paymentType === 'ach' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Routing Number (9 Digits)</label>
                    <input
                      type="text"
                      value={bankRouting}
                      onChange={(e) => setBankRouting(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVC Code</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-700/20"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  Authorize & Transfer ${selectedLedgerItem.rentAmount.toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
