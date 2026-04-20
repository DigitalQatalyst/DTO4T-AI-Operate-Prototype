import { useState } from 'react';
import { CheckCircle2, ArrowRight, User } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const requestQueue = [
  { id: 'REQ-001', title: 'AI Copilot Access — Legal Team', service: 'AI Copilot Platform', priority: 'High', submittedBy: 'Sarah Mitchell', submittedAt: '2025-04-10', state: 'Under Review' },
  { id: 'REQ-003', title: 'Custom Agent — Customer Support', service: 'Custom AI Agent', priority: 'Critical', submittedBy: 'Priya Nair', submittedAt: '2025-04-15', state: 'Returned' },
  { id: 'REQ-005', title: 'Sentiment Analysis Tool — Marketing', service: 'AI Analytics', priority: 'Medium', submittedBy: 'Tom Adeyemi', submittedAt: '2025-04-19', state: 'Submitted' },
];

const fulfilmentSteps = [
  { step: 1, title: 'Request Validated', desc: 'Business context and service type confirmed', done: true, signedOff: true },
  { step: 2, title: 'Governance Check', desc: 'Policy compliance verified', done: true, signedOff: true },
  { step: 3, title: 'Team Assignment', desc: 'Assigned to Specialist Team — AI Operations', done: true, signedOff: false },
  { step: 4, title: 'Solution Design', desc: 'Architecture and approach defined', done: false, signedOff: false },
  { step: 5, title: 'Delivery & Handover', desc: 'Service delivered and user onboarded', done: false, signedOff: false },
];

const specialists = ['AI Operations Team', 'Data Engineering', 'Platform Engineering', 'Governance Team'];

export default function BusinessOwnerOps() {
  const [selected, setSelected] = useState(requestQueue[0]);
  const [assignee, setAssignee] = useState('');

  const priorityColors: Record<string, string> = {
    Critical: 'text-red-700 bg-red-50 border-red-200',
    High: 'text-orange-700 bg-orange-50 border-orange-200',
    Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    Low: 'text-gray-600 bg-gray-50 border-gray-200',
  };

  return (
    <div>
      <PageHeader title="Business Owner Operations" subtitle="Review requests, progress fulfilment workflows, and manage assignments" />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Request Queue */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Request Review Queue</h2>
            <div className="space-y-3">
              {requestQueue.map(req => (
                <button
                  key={req.id}
                  onClick={() => setSelected(req)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected.id === req.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400">{req.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[req.priority]}`}>{req.priority}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{req.title}</p>
                  <p className="text-xs text-gray-500 mb-2">{req.service}</p>
                  <StatusBadge state={req.state} />
                </button>
              ))}
            </div>
          </div>

          {/* Detail + Fulfilment */}
          <div className="lg:col-span-2 space-y-5">
            {/* Request detail */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                    <StatusBadge state={selected.state} size="md" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Submitted by {selected.submittedBy} · {selected.submittedAt}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium flex-shrink-0 ${priorityColors[selected.priority]}`}>{selected.priority}</span>
              </div>

              {/* Assignment */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" /> Assign to Team
                </h3>
                <div className="flex gap-2">
                  <select
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                  >
                    <option value="">Select team or individual...</option>
                    {specialists.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button
                    disabled={!assignee}
                    className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>

            {/* Fulfilment Steps */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Fulfilment Steps</h3>
              <div className="space-y-3">
                {fulfilmentSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${
                      step.done ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.done ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.done ? <CheckCircle2 className="h-4 w-4" /> : step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                        {step.done && !step.signedOff && (
                          <button className="flex items-center gap-1 text-xs text-[#0f1f5c] font-medium hover:underline">
                            Sign Off <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                        {step.signedOff && (
                          <span className="text-xs text-green-700 font-medium">Signed Off</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
