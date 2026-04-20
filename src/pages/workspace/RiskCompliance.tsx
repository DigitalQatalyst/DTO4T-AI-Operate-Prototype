import { useState } from 'react';
import { AlertTriangle, Shield, CheckCircle2, XCircle, Download } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const governanceMetrics = [
  { label: 'Governance Coverage', value: '94%', status: 'On Track', color: 'text-green-600' },
  { label: 'Control Health', value: '87%', status: 'On Track', color: 'text-green-600' },
  { label: 'Open Risk Items', value: '3', status: 'Attention', color: 'text-orange-600' },
  { label: 'Compliance Score', value: '98%', status: 'Achieved', color: 'text-green-600' },
];

const complianceChecks = [
  { id: 'CC-001', rule: 'GDPR — Data Minimisation', scope: 'All AI Services', result: 'Pass', lastRun: '2025-04-20' },
  { id: 'CC-002', rule: 'AI Ethics Policy v3', scope: 'Autonomous Agents', result: 'Pass', lastRun: '2025-04-19' },
  { id: 'CC-003', rule: 'Third-Party Model Approval', scope: 'External Models', result: 'Flag', lastRun: '2025-04-18' },
  { id: 'CC-004', rule: 'Data Residency Standard', scope: 'Cloud AI Services', result: 'Pass', lastRun: '2025-04-17' },
  { id: 'CC-005', rule: 'Access Control Policy', scope: 'All Platform Users', result: 'Pass', lastRun: '2025-04-16' },
];

const riskRegister = [
  { id: 'RISK-001', title: 'Third-party model data leakage', category: 'Data Privacy', severity: 'High', mitigation: 'Data masking layer in review', status: 'Open' },
  { id: 'RISK-002', title: 'Agent hallucination in legal context', category: 'AI Quality', severity: 'High', mitigation: 'Human-in-the-loop validation required', status: 'Mitigated' },
  { id: 'RISK-003', title: 'Model drift — sentiment analysis', category: 'Model Health', severity: 'Medium', mitigation: 'Monitoring alert configured', status: 'Open' },
];

const auditLog = [
  { id: 'AUD-001', action: 'Policy check run: GDPR Data Minimisation', actor: 'System', timestamp: '2025-04-20 08:00', outcome: 'Pass' },
  { id: 'AUD-002', action: 'Governance override logged: Custom Agent request', actor: 'James Okafor', timestamp: '2025-04-17 15:00', outcome: 'Override' },
  { id: 'AUD-003', action: 'User role changed: Tom Adeyemi → Specialist', actor: 'Platform Admin', timestamp: '2025-04-16 11:00', outcome: 'Change' },
  { id: 'AUD-004', action: 'Policy check run: Third-Party Model Approval', actor: 'System', timestamp: '2025-04-18 09:00', outcome: 'Flag' },
  { id: 'AUD-005', action: 'Request approved: Document Intelligence Service', actor: 'James Okafor', timestamp: '2025-04-07 14:00', outcome: 'Approved' },
];

const resultColors: Record<string, string> = {
  Pass: 'text-green-700 bg-green-50 border-green-200',
  Flag: 'text-orange-700 bg-orange-50 border-orange-200',
  Fail: 'text-red-700 bg-red-50 border-red-200',
};

const severityColors: Record<string, string> = {
  High: 'text-red-700 bg-red-50 border-red-200',
  Medium: 'text-orange-700 bg-orange-50 border-orange-200',
  Low: 'text-gray-600 bg-gray-50 border-gray-200',
};

const tabs = ['Governance Dashboard', 'Compliance Checks', 'Risk Register', 'Audit Log'];

export default function RiskCompliance() {
  const [activeTab, setActiveTab] = useState('Governance Dashboard');
  const [auditSearch, setAuditSearch] = useState('');

  const filteredAudit = auditLog.filter(e =>
    e.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    e.actor.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Risk, Compliance & Control Management" subtitle="Governance assurance, compliance checks, risk visibility, and audit access" />

      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'border-[#0f1f5c] text-[#0f1f5c]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'Governance Dashboard' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {governanceMetrics.map((metric, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      <StatusBadge state={metric.status} />
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Control Health Overview</h3>
                  {[
                    { control: 'Data Privacy Controls', coverage: 96, status: 'Healthy' },
                    { control: 'Access Management Controls', coverage: 100, status: 'Healthy' },
                    { control: 'AI Ethics Controls', coverage: 87, status: 'Attention' },
                    { control: 'Third-Party Risk Controls', coverage: 72, status: 'Attention' },
                  ].map((ctrl, i) => (
                    <div key={i} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{ctrl.control}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{ctrl.coverage}%</span>
                          <StatusBadge state={ctrl.status} />
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${ctrl.coverage}%`,
                            background: ctrl.coverage >= 90
                              ? 'linear-gradient(90deg, rgb(26,46,110) 0%, rgb(34,197,94) 100%)'
                              : 'linear-gradient(90deg, rgb(251,85,53) 0%, rgb(251,146,60) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Compliance Checks' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      {['ID', 'Rule', 'Scope', 'Result', 'Last Run', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {complianceChecks.map((check, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-400">{check.id}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{check.rule}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{check.scope}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${resultColors[check.result]}`}>
                            {check.result === 'Pass' && <CheckCircle2 className="h-3 w-3" />}
                            {check.result === 'Flag' && <AlertTriangle className="h-3 w-3" />}
                            {check.result === 'Fail' && <XCircle className="h-3 w-3" />}
                            {check.result}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">{check.lastRun}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Re-run</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Risk Register' && (
              <div className="space-y-3">
                {riskRegister.map((risk, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{risk.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${severityColors[risk.severity]}`}>{risk.severity}</span>
                          <StatusBadge state={risk.status} />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{risk.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Category: {risk.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2">
                      <Shield className="h-3.5 w-3.5 text-gray-400" />
                      <span>Mitigation: {risk.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Audit Log' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Search audit log..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] w-64"
                    value={auditSearch}
                    onChange={e => setAuditSearch(e.target.value)}
                  />
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" /> Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {['ID', 'Action', 'Actor', 'Timestamp', 'Outcome'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAudit.map((entry, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{entry.id}</td>
                          <td className="px-4 py-3 text-gray-900">{entry.action}</td>
                          <td className="px-4 py-3 text-gray-600">{entry.actor}</td>
                          <td className="px-4 py-3 text-xs text-gray-400">{entry.timestamp}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                              entry.outcome === 'Pass' || entry.outcome === 'Approved' ? 'text-green-700 bg-green-50 border-green-200' :
                              entry.outcome === 'Flag' || entry.outcome === 'Override' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                              'text-gray-600 bg-gray-50 border-gray-200'
                            }`}>{entry.outcome}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
