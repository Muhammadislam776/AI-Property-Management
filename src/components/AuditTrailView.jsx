import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Terminal, 
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { auditLogsData } from '../data/mockData';

export function AuditTrailView({ customLogs = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const allLogs = [...customLogs, ...auditLogsData];

  const filteredLogs = allLogs.filter(log => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              SOC-2 Compliance & Security Audit Logs
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immutable, append-only cryptographic event trail documenting every human and autonomous action.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert("Exporting certified cryptographic audit log report (PDF/CSV)...")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Compliance Report
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by actor, action, or target..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="Property Manager">Property Manager</option>
            <option value="Tenant">Tenant</option>
            <option value="Contractor">Contractor</option>
            <option value="System AI Agent">System AI Agent</option>
          </select>
        </div>
      </div>

      {/* Chronological Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Hash Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id || log.hash} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.actor}</div>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.2 rounded-full mt-0.5 ${
                      log.role === 'System AI Agent' 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                        : log.role === 'Property Manager'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : log.role === 'Tenant'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-800 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {log.target}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200/60 flex items-center gap-1.5 w-fit">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      {log.hash || "0x9c41...ee10"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
