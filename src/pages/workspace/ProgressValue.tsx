import { TrendingUp, CheckCircle2, Clock, BarChart3, Target } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const requestStates = [
  { id: 'REQ-001', title: 'AI Copilot Access — Legal Team', state: 'Under Review', updated: '2025-04-11', urgency: 'High' },
  { id: 'REQ-002', title: 'Document Intelligence Service', state: 'Approved', updated: '2025-04-07', urgency: 'Medium' },
  { id: 'REQ-003', title: 'Custom Agent — Customer Support', state: 'Returned', updated: '2025-04-17', urgency: 'Critical' },
  { id: 'REQ-004', title: 'RAG Knowledge Base — HR Policies', state: 'Draft', updated: '2025-04-20', urgency: 'Low' },
];

const initiatives = [
  { title: 'AI Copilot Rollout — Legal', stage: 'Deploy', progress: 65, owner: 'Sarah Mitchell', status: 'On Track' },
  { title: 'Finance Automation Programme', stage: 'Drive', progress: 88, owner: 'David Chen', status: 'On Track' },
  { title: 'HR AI Enablement', stage: 'Discern', progress: 30, owner: 'Priya Nair', status: 'At Risk' },
];

const outcomes = [
  { label: 'Processing Time Reduction', value: '68%', target: '70%', status: 'On Track' },
  { label: 'AI Adoption Rate', value: '74%', target: '75%', status: 'On Track' },
  { label: 'Governance Compliance', value: '98%', target: '90%', status: 'Achieved' },
  { label: 'Cost Savings (Annualised)', value: '$1.8M', target: '$2.0M', status: 'On Track' },
];

const stageColors: Record<string, string> = {
  Discern: 'bg-blue-100 text-blue-800',
  Design: 'bg-purple-100 text-purple-800',
  Deploy: 'bg-indigo-100 text-indigo-800',
  Drive: 'bg-green-100 text-green-800',
};

export default function ProgressValue() {
  return (
    <div>
      <PageHeader title="Progress & Value Visibility" subtitle="Track request states, initiative progress, and business outcomes" />

      <div className="p-8 space-y-6">
        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Requests', value: '4', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Initiatives', value: '3', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Completed This Quarter', value: '12', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Value Delivered', value: '$1.8M', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
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

        {/* Request States */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Request States</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter requests..."
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">State</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Urgency</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requestStates.map((req, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{req.id}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{req.title}</td>
                    <td className="px-5 py-3.5"><StatusBadge state={req.state} /></td>
                    <td className="px-5 py-3.5 text-xs text-gray-600">{req.urgency}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{req.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Initiative Summaries */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Initiative Summaries</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {initiatives.map((init, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{init.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Owner: {init.owner}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stageColors[init.stage]}`}>{init.stage}</span>
                    <StatusBadge state={init.status} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${init.progress}%`,
                        background: 'linear-gradient(90deg, rgb(26,46,110) 0%, rgb(251,85,53) 100%)',
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{init.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visible Outcomes */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Value Outcomes & KPIs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
            {outcomes.map((outcome, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">{outcome.label}</p>
                  <StatusBadge state={outcome.status} />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{outcome.value}</span>
                  <span className="text-xs text-gray-400 mb-1">target: {outcome.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
