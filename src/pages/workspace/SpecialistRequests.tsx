import { useState } from 'react';
import { Plus, AlertTriangle, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const specialistRequests = [
  {
    id: 'SR-001',
    title: 'Multi-Modal AI Pipeline — Product Imagery',
    type: 'Advanced AI Pipeline',
    complexity: 'High',
    state: 'In Progress',
    submittedBy: 'Marketing Team',
    submittedAt: '2025-04-08',
    specialist: 'Priya Nair',
    description: 'Build a multi-modal pipeline to automatically tag, classify, and generate descriptions for product images at scale.',
    additionalData: ['Image volume: ~50,000/month', 'Integration: PIM system', 'Output: JSON metadata + alt text'],
    auditTrail: [
      { timestamp: '2025-04-08 09:00', action: 'Specialist request submitted', actor: 'Marketing Team' },
      { timestamp: '2025-04-09 10:00', action: 'Intake reviewed — complexity confirmed High', actor: 'Priya Nair' },
      { timestamp: '2025-04-10 14:00', action: 'Specialist assigned', actor: 'Platform Admin' },
      { timestamp: '2025-04-12 09:00', action: 'Work commenced', actor: 'Priya Nair' },
    ],
  },
  {
    id: 'SR-002',
    title: 'Autonomous Agent — Regulatory Monitoring',
    type: 'Autonomous Agent',
    complexity: 'Critical',
    state: 'Under Assessment',
    submittedBy: 'Compliance Team',
    submittedAt: '2025-04-15',
    specialist: 'Unassigned',
    description: 'Deploy an autonomous agent to monitor regulatory feeds, classify changes, and trigger internal review workflows.',
    additionalData: ['Regulatory sources: 12 feeds', 'Trigger: Policy impact > Medium', 'Escalation: Compliance Lead'],
    auditTrail: [
      { timestamp: '2025-04-15 11:00', action: 'Specialist request submitted', actor: 'Compliance Team' },
      { timestamp: '2025-04-16 09:00', action: 'Intake review started', actor: 'Specialist Team' },
    ],
  },
];

const complexityColors: Record<string, string> = {
  Critical: 'text-red-700 bg-red-50 border-red-200',
  High: 'text-orange-700 bg-orange-50 border-orange-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
};

export default function SpecialistRequests() {
  const [selected, setSelected] = useState(specialistRequests[0]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Specialist Request Handling"
        subtitle="Non-standard, high-complexity AI requests requiring dedicated processing"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors"
          >
            <Plus className="h-4 w-4" /> New Specialist Request
          </button>
        }
      />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Specialist Requests</h2>
            {specialistRequests.map(req => (
              <button
                key={req.id}
                onClick={() => setSelected(req)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected.id === req.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-gray-400">{req.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${complexityColors[req.complexity]}`}>{req.complexity}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{req.title}</p>
                <p className="text-xs text-gray-500 mb-2">{req.type}</p>
                <StatusBadge state={req.state} />
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                      <StatusBadge state={selected.state} size="md" />
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${complexityColors[selected.complexity]}`}>
                        {selected.complexity} Complexity
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selected.type} · Submitted by {selected.submittedBy} · {selected.submittedAt}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Additional Data Captured</h3>
                  <ul className="space-y-1">
                    {selected.additionalData.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialist Assignment */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Specialist Assignment</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {selected.specialist === 'Unassigned'
                          ? <span className="text-orange-600 font-medium">Unassigned — requires specialist allocation</span>
                          : <span>Assigned to <span className="font-semibold">{selected.specialist}</span></span>
                        }
                      </p>
                    </div>
                    <button className="px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">
                      {selected.specialist === 'Unassigned' ? 'Assign Specialist' : 'Reassign'}
                    </button>
                  </div>
                </div>

                {selected.complexity === 'Critical' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Critical Complexity Flag</p>
                      <p className="text-sm text-red-700 mt-1">This request requires senior specialist review and governance sign-off before work can commence.</p>
                    </div>
                  </div>
                )}

                {/* Audit Trail */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Audit Trail</h3>
                  <div className="space-y-2">
                    {[...selected.auditTrail].reverse().map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#0f1f5c] mt-1.5" />
                        <div>
                          <span className="text-gray-900 font-medium">{entry.action}</span>
                          <span className="text-gray-500"> — {entry.actor}</span>
                          <div className="text-xs text-gray-400 mt-0.5">{entry.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">New Specialist Request</h2>
              <p className="text-sm text-gray-500 mt-1">For non-standard, high-complexity AI requests</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]" placeholder="Describe the specialist request" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]">
                  <option>Advanced AI Pipeline</option>
                  <option>Autonomous Agent</option>
                  <option>Custom Model Training</option>
                  <option>Complex Integration</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]">
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none" rows={3} placeholder="Detailed description of the request and requirements" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
