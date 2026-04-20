import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const policyChecks = [
  { id: 'PC-001', policy: 'Data Classification Policy', item: 'AI Copilot Access — Legal Team', result: 'Pass', checkedAt: '2025-04-11 10:00', automated: true },
  { id: 'PC-002', policy: 'Third-Party AI Model Policy', item: 'Custom Agent — Customer Support', result: 'Flag', checkedAt: '2025-04-16 09:00', automated: true },
  { id: 'PC-003', policy: 'PII Handling Standard', item: 'Sentiment Analysis Tool', result: 'Pending', checkedAt: '—', automated: false },
  { id: 'PC-004', policy: 'AI Ethics Framework', item: 'Autonomous Agent — Regulatory Monitoring', result: 'Pass', checkedAt: '2025-04-17 14:00', automated: true },
];

const oversightQueue = [
  { id: 'OV-001', title: 'Custom Agent — Customer Support', type: 'Policy Review', assignee: 'Governance Team', state: 'Under Review', sla: '2025-04-23', flagged: true },
  { id: 'OV-002', title: 'Multi-Modal AI Pipeline', type: 'Ethics Review', assignee: 'Governance Team', state: 'Submitted', sla: '2025-04-25', flagged: false },
  { id: 'OV-003', title: 'Q1 Access Review', type: 'Access Audit', assignee: 'Platform Admin', state: 'In Progress', sla: '2025-04-30', flagged: false },
];

const escalationPaths = [
  { trigger: 'Policy flag — Third-Party AI', route: 'Governance Lead → CISO', sla: '48 hours', status: 'Active' },
  { trigger: 'Ethics concern raised', route: 'Ethics Committee → Executive Sponsor', sla: '72 hours', status: 'Active' },
  { trigger: 'SLA breach > 24 hours', route: 'Service Owner → Platform Admin', sla: '24 hours', status: 'Active' },
];

const resultColors: Record<string, string> = {
  Pass: 'text-green-700 bg-green-50 border-green-200',
  Flag: 'text-orange-700 bg-orange-50 border-orange-200',
  Fail: 'text-red-700 bg-red-50 border-red-200',
  Pending: 'text-gray-600 bg-gray-50 border-gray-200',
};

const resultIcons: Record<string, React.ElementType> = {
  Pass: CheckCircle2,
  Flag: AlertTriangle,
  Fail: XCircle,
  Pending: Clock,
};

const tabs = ['Policy Checks', 'Oversight Queue', 'Escalation Paths'];

export default function GovernanceOversight() {
  const [activeTab, setActiveTab] = useState('Policy Checks');
  const [selected, setSelected] = useState(oversightQueue[0]);

  return (
    <div>
      <PageHeader title="Governance & Oversight Operations" subtitle="Policy checks, oversight workflows, escalation paths, and review decisions" />

      <div className="p-8">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Policy Checks Run', value: '4', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Passed', value: '2', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Flagged', value: '1', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Pending Review', value: '1', icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </div>
          ))}
        </div>

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
            {activeTab === 'Policy Checks' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      {['ID', 'Policy', 'Item', 'Result', 'Type', 'Checked At', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {policyChecks.map((check, i) => {
                      const Icon = resultIcons[check.result];
                      return (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{check.id}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{check.policy}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{check.item}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${resultColors[check.result]}`}>
                              <Icon className="h-3 w-3" />
                              {check.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">{check.automated ? 'Automated' : 'Manual'}</td>
                          <td className="px-4 py-3 text-xs text-gray-400">{check.checkedAt}</td>
                          <td className="px-4 py-3">
                            {check.result === 'Flag' && (
                              <button className="text-xs text-orange-600 hover:underline font-medium">Review</button>
                            )}
                            {check.result === 'Pending' && (
                              <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Run Check</button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Oversight Queue' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1 space-y-2">
                  {oversightQueue.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected.id === item.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">{item.id}</span>
                        {item.flagged && <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-xs text-gray-500 mb-2">{item.type}</p>
                      <StatusBadge state={item.state} />
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-2 bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                        <StatusBadge state={selected.state} size="md" />
                        {selected.flagged && (
                          <span className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
                            <AlertTriangle className="h-3 w-3" /> Flagged
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900">{selected.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{selected.type} · Assignee: {selected.assignee} · SLA: {selected.sla}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">Review Decision</h4>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none bg-white"
                      rows={3}
                      placeholder="Enter mandatory justification for your decision..."
                    />
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        <CheckCircle2 className="h-4 w-4" /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                        <AlertTriangle className="h-4 w-4" /> Refer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Escalation Paths' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Defined escalation routes with notifications and SLA indicators</p>
                {escalationPaths.map((path, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{path.trigger}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Route: {path.route}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-full">SLA: {path.sla}</span>
                        <StatusBadge state={path.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
