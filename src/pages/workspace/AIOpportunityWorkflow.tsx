import { useState } from 'react';
import { Plus, ChevronRight, Clock, AlertCircle, CheckCircle2, RotateCcw, XCircle, Lightbulb } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';
import type { AIOpportunity, OpportunityState } from '@/types/workspace';

const stateOrder: OpportunityState[] = [
  'Draft', 'Submitted', 'Under Assessment', 'Routed', 'In Progress', 'Completed',
];

const stateIcons: Record<OpportunityState, React.ElementType> = {
  Draft: Clock,
  Submitted: ChevronRight,
  'Under Assessment': AlertCircle,
  Routed: RotateCcw,
  'In Progress': Lightbulb,
  Completed: CheckCircle2,
  Closed: XCircle,
};

const mockOpportunities: AIOpportunity[] = [
  {
    id: 'OPP-001',
    title: 'Automated Invoice Processing',
    businessArea: 'Finance',
    description: 'Use AI to extract, validate, and route invoices automatically, reducing manual processing time by 70%.',
    state: 'In Progress',
    submittedBy: 'Sarah Mitchell',
    submittedAt: '2025-03-10',
    priority: 'High',
    feasibilityScore: 82,
    valueScore: 91,
    auditTrail: [
      { timestamp: '2025-03-10 09:00', action: 'Opportunity created', actor: 'Sarah Mitchell' },
      { timestamp: '2025-03-10 09:45', action: 'Submitted for assessment', actor: 'Sarah Mitchell' },
      { timestamp: '2025-03-12 14:00', action: 'Assessment started', actor: 'AI Assessment Team' },
      { timestamp: '2025-03-15 11:30', action: 'Routed to Finance Specialist Team', actor: 'James Okafor' },
      { timestamp: '2025-03-18 09:00', action: 'Work commenced', actor: 'Specialist Team' },
    ],
  },
  {
    id: 'OPP-002',
    title: 'Customer Sentiment Analysis',
    businessArea: 'Customer Experience',
    description: 'Deploy NLP models to analyse customer feedback across channels and surface actionable insights.',
    state: 'Under Assessment',
    submittedBy: 'David Chen',
    submittedAt: '2025-04-01',
    priority: 'Medium',
    feasibilityScore: 74,
    auditTrail: [
      { timestamp: '2025-04-01 10:00', action: 'Opportunity created', actor: 'David Chen' },
      { timestamp: '2025-04-01 10:30', action: 'Submitted for assessment', actor: 'David Chen' },
      { timestamp: '2025-04-03 09:00', action: 'Assessment started', actor: 'AI Assessment Team' },
    ],
  },
  {
    id: 'OPP-003',
    title: 'HR Onboarding Copilot',
    businessArea: 'Human Resources',
    description: 'AI-powered onboarding assistant to guide new employees through policies, tools, and first-week tasks.',
    state: 'Draft',
    submittedBy: 'Priya Nair',
    submittedAt: '2025-04-18',
    priority: 'Low',
    auditTrail: [
      { timestamp: '2025-04-18 15:00', action: 'Opportunity created', actor: 'Priya Nair' },
    ],
  },
];

const priorityColors = {
  High: 'text-red-600 bg-red-50 border-red-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Low: 'text-gray-600 bg-gray-50 border-gray-200',
};

interface NewOpportunityForm {
  title: string;
  businessArea: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export default function AIOpportunityWorkflow() {
  const [opportunities, setOpportunities] = useState<AIOpportunity[]>(mockOpportunities);
  const [selected, setSelected] = useState<AIOpportunity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmTransition, setConfirmTransition] = useState<{ opp: AIOpportunity; next: OpportunityState } | null>(null);
  const [form, setForm] = useState<NewOpportunityForm>({ title: '', businessArea: '', description: '', priority: 'Medium' });

  const nextState = (current: OpportunityState): OpportunityState | null => {
    const idx = stateOrder.indexOf(current);
    return idx >= 0 && idx < stateOrder.length - 1 ? stateOrder[idx + 1] : null;
  };

  const handleTransition = () => {
    if (!confirmTransition) return;
    const { opp, next } = confirmTransition;
    const updated = opportunities.map(o =>
      o.id === opp.id
        ? {
            ...o,
            state: next,
            auditTrail: [
              ...o.auditTrail,
              { timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), action: `State changed to ${next}`, actor: 'Current User' },
            ],
          }
        : o
    );
    setOpportunities(updated);
    setSelected(updated.find(o => o.id === opp.id) || null);
    setConfirmTransition(null);
  };

  const handleSubmitNew = () => {
    if (!form.title || !form.businessArea) return;
    const newOpp: AIOpportunity = {
      id: `OPP-00${opportunities.length + 1}`,
      title: form.title,
      businessArea: form.businessArea,
      description: form.description,
      state: 'Draft',
      submittedBy: 'Current User',
      submittedAt: new Date().toISOString().slice(0, 10),
      priority: form.priority,
      auditTrail: [{ timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), action: 'Opportunity created', actor: 'Current User' }],
    };
    setOpportunities([newOpp, ...opportunities]);
    setForm({ title: '', businessArea: '', description: '', priority: 'Medium' });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="AI Opportunity Workflow"
        subtitle="Capture, assess, and progress AI opportunities through the platform lifecycle"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Opportunity
          </button>
        }
      />

      <div className="p-8">
        {/* State pipeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Opportunity Pipeline</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {stateOrder.map((state, i) => {
              const count = opportunities.filter(o => o.state === state).length;
              const Icon = stateIcons[state];
              return (
                <div key={state} className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 min-w-[100px]">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700 text-center">{state}</span>
                    <span className="text-lg font-bold text-[#0f1f5c]">{count}</span>
                  </div>
                  {i < stateOrder.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">All Opportunities</h2>
            {opportunities.map(opp => (
              <button
                key={opp.id}
                onClick={() => setSelected(opp)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected?.id === opp.id
                    ? 'border-[#0f1f5c] bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs text-gray-400 font-mono">{opp.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[opp.priority]}`}>{opp.priority}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{opp.title}</p>
                <p className="text-xs text-gray-500 mb-2">{opp.businessArea}</p>
                <StatusBadge state={opp.state} />
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{selected.id}</span>
                      <StatusBadge state={selected.state} size="md" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selected.businessArea} · Submitted by {selected.submittedBy} on {selected.submittedAt}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[selected.priority]}`}>{selected.priority} Priority</span>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
                  </div>

                  {(selected.feasibilityScore || selected.valueScore) && (
                    <div className="grid grid-cols-2 gap-4">
                      {selected.feasibilityScore && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs text-blue-600 font-medium">Feasibility Score</p>
                          <p className="text-2xl font-bold text-blue-900 mt-1">{selected.feasibilityScore}<span className="text-sm font-normal">/100</span></p>
                        </div>
                      )}
                      {selected.valueScore && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs text-green-600 font-medium">Value Score</p>
                          <p className="text-2xl font-bold text-green-900 mt-1">{selected.valueScore}<span className="text-sm font-normal">/100</span></p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* State progression */}
                  {nextState(selected.state) && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-3">
                        Progress this opportunity to <span className="font-semibold">{nextState(selected.state)}</span>?
                      </p>
                      <button
                        onClick={() => setConfirmTransition({ opp: selected, next: nextState(selected.state)! })}
                        className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors"
                      >
                        Advance to {nextState(selected.state)}
                      </button>
                    </div>
                  )}

                  {/* Audit trail */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Audit Trail</h3>
                    <div className="space-y-2">
                      {[...selected.auditTrail].reverse().map((entry, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#0f1f5c] mt-1.5" />
                          <div className="flex-1">
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
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-64">
                <div className="text-center">
                  <Lightbulb className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Select an opportunity to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Opportunity Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Capture AI Opportunity</h2>
              <p className="text-sm text-gray-500 mt-1">Provide context and initial framing for your AI opportunity</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Title *</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
                  placeholder="e.g. Automated Contract Review"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Area *</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
                  placeholder="e.g. Legal, Finance, HR"
                  value={form.businessArea}
                  onChange={e => setForm({ ...form, businessArea: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none"
                  rows={3}
                  placeholder="Describe the opportunity, the problem it solves, and expected value"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
                  value={form.priority}
                  onChange={e => setForm({ ...form, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSubmitNew} className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">Save as Draft</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Transition Modal */}
      {confirmTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Confirm State Transition</h2>
            <p className="text-sm text-gray-600 mb-4">
              You are advancing <span className="font-semibold">{confirmTransition.opp.title}</span> from{' '}
              <StatusBadge state={confirmTransition.opp.state} /> to <StatusBadge state={confirmTransition.next} />.
              This action will be logged in the audit trail.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmTransition(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleTransition} className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
