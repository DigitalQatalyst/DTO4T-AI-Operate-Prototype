import { useState } from 'react';
import { Plus, Shield, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';
import type { AIRequest, RequestState } from '@/types/workspace';

const stateOrder: RequestState[] = [
  'Draft', 'Submitted', 'Under Review', 'Approved', 'In Fulfilment', 'Completed',
];

const mockRequests: AIRequest[] = [
  {
    id: 'REQ-001',
    title: 'AI Copilot Access — Legal Team',
    serviceType: 'AI Copilot',
    businessContext: 'Legal team requires AI copilot access to assist with contract review and regulatory research.',
    urgency: 'High',
    state: 'Under Review',
    submittedBy: 'Sarah Mitchell',
    submittedAt: '2025-04-10',
    governanceLinked: true,
    auditTrail: [
      { timestamp: '2025-04-10 09:00', action: 'Request created', actor: 'Sarah Mitchell' },
      { timestamp: '2025-04-10 09:30', action: 'Submitted for review', actor: 'Sarah Mitchell' },
      { timestamp: '2025-04-11 10:00', action: 'Governance policy check initiated', actor: 'System' },
    ],
  },
  {
    id: 'REQ-002',
    title: 'Document Intelligence Service',
    serviceType: 'AI Service',
    businessContext: 'Finance department needs automated document extraction for invoice processing.',
    urgency: 'Medium',
    state: 'Approved',
    submittedBy: 'David Chen',
    submittedAt: '2025-04-05',
    governanceLinked: false,
    approvalJustification: 'Standard service request. Approved per Q1 AI adoption plan.',
    auditTrail: [
      { timestamp: '2025-04-05 11:00', action: 'Request created', actor: 'David Chen' },
      { timestamp: '2025-04-05 11:30', action: 'Submitted for review', actor: 'David Chen' },
      { timestamp: '2025-04-07 14:00', action: 'Approved', actor: 'James Okafor', note: 'Standard service request. Approved per Q1 AI adoption plan.' },
    ],
  },
  {
    id: 'REQ-003',
    title: 'Custom Agent — Customer Support',
    serviceType: 'Custom AI Agent',
    businessContext: 'Customer support team wants a custom AI agent to handle tier-1 queries.',
    urgency: 'Critical',
    state: 'Returned',
    submittedBy: 'Priya Nair',
    submittedAt: '2025-04-15',
    governanceLinked: true,
    returnReason: 'Insufficient business case detail. Please provide expected query volume, escalation paths, and data handling requirements.',
    auditTrail: [
      { timestamp: '2025-04-15 09:00', action: 'Request created', actor: 'Priya Nair' },
      { timestamp: '2025-04-15 09:30', action: 'Submitted for review', actor: 'Priya Nair' },
      { timestamp: '2025-04-16 11:00', action: 'Governance check flagged', actor: 'System', note: 'Data handling policy review required' },
      { timestamp: '2025-04-17 15:00', action: 'Returned to requester', actor: 'James Okafor', note: 'Insufficient business case detail.' },
    ],
  },
  {
    id: 'REQ-004',
    title: 'RAG Knowledge Base — HR Policies',
    serviceType: 'RAG System',
    businessContext: 'HR team needs a retrieval-augmented system to answer employee policy questions.',
    urgency: 'Low',
    state: 'Draft',
    submittedBy: 'Current User',
    submittedAt: '2025-04-20',
    governanceLinked: false,
    auditTrail: [
      { timestamp: '2025-04-20 10:00', action: 'Request created', actor: 'Current User' },
    ],
  },
];

const urgencyColors = {
  Critical: 'text-red-700 bg-red-50 border-red-200',
  High: 'text-orange-700 bg-orange-50 border-orange-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Low: 'text-gray-600 bg-gray-50 border-gray-200',
};

interface NewRequestForm {
  title: string;
  serviceType: string;
  businessContext: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
}

export default function AIRequestWorkflow() {
  const [requests, setRequests] = useState<AIRequest[]>(mockRequests);
  const [selected, setSelected] = useState<AIRequest | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmTransition, setConfirmTransition] = useState<{ req: AIRequest; next: RequestState; justification: string } | null>(null);
  const [justification, setJustification] = useState('');
  const [form, setForm] = useState<NewRequestForm>({ title: '', serviceType: '', businessContext: '', urgency: 'Medium' });

  const nextState = (current: RequestState): RequestState | null => {
    if (current === 'Returned') return 'Submitted';
    const idx = stateOrder.indexOf(current);
    return idx >= 0 && idx < stateOrder.length - 1 ? stateOrder[idx + 1] : null;
  };

  const handleTransition = () => {
    if (!confirmTransition || !confirmTransition.justification.trim()) return;
    const { req, next } = confirmTransition;
    const updated = requests.map(r =>
      r.id === req.id
        ? {
            ...r,
            state: next,
            approvalJustification: next === 'Approved' ? confirmTransition.justification : r.approvalJustification,
            auditTrail: [
              ...r.auditTrail,
              {
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                action: `State changed to ${next}`,
                actor: 'Current User',
                note: confirmTransition.justification,
              },
            ],
          }
        : r
    );
    setRequests(updated);
    setSelected(updated.find(r => r.id === req.id) || null);
    setConfirmTransition(null);
    setJustification('');
  };

  const handleSubmitNew = () => {
    if (!form.title || !form.serviceType) return;
    const newReq: AIRequest = {
      id: `REQ-00${requests.length + 1}`,
      title: form.title,
      serviceType: form.serviceType,
      businessContext: form.businessContext,
      urgency: form.urgency,
      state: 'Draft',
      submittedBy: 'Current User',
      submittedAt: new Date().toISOString().slice(0, 10),
      governanceLinked: false,
      auditTrail: [{ timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), action: 'Request created', actor: 'Current User' }],
    };
    setRequests([newReq, ...requests]);
    setForm({ title: '', serviceType: '', businessContext: '', urgency: 'Medium' });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="AI Request Workflow"
        subtitle="Submit, govern, and track AI service requests end-to-end"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Request
          </button>
        }
      />

      <div className="p-8">
        {/* Pipeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Request Pipeline</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {stateOrder.map((state, i) => {
              const count = requests.filter(r => r.state === state).length;
              return (
                <div key={state} className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 min-w-[90px]">
                    <span className="text-xs font-medium text-gray-700 text-center">{state}</span>
                    <span className="text-lg font-bold text-[#0f1f5c]">{count}</span>
                  </div>
                  {i < stateOrder.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />}
                </div>
              );
            })}
            <div className="flex items-center gap-1 flex-shrink-0">
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-red-50 border border-red-200 min-w-[90px]">
                <span className="text-xs font-medium text-red-700 text-center">Returned</span>
                <span className="text-lg font-bold text-red-700">{requests.filter(r => r.state === 'Returned').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">All Requests</h2>
            {requests.map(req => (
              <button
                key={req.id}
                onClick={() => setSelected(req)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected?.id === req.id
                    ? 'border-[#0f1f5c] bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs text-gray-400 font-mono">{req.id}</span>
                  <div className="flex items-center gap-1">
                    {req.governanceLinked && <Shield className="h-3.5 w-3.5 text-orange-500" title="Governance-linked" />}
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${urgencyColors[req.urgency]}`}>{req.urgency}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{req.title}</p>
                <p className="text-xs text-gray-500 mb-2">{req.serviceType}</p>
                <StatusBadge state={req.state} governance={req.governanceLinked && req.state === 'Under Review'} />
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 font-mono">{selected.id}</span>
                        <StatusBadge state={selected.state} size="md" governance={selected.governanceLinked} />
                        {selected.governanceLinked && (
                          <span className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
                            <Shield className="h-3 w-3" /> Governance-Linked
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{selected.serviceType} · Submitted by {selected.submittedBy} on {selected.submittedAt}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium flex-shrink-0 ${urgencyColors[selected.urgency]}`}>{selected.urgency}</span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Business Context</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{selected.businessContext}</p>
                  </div>

                  {selected.state === 'Returned' && selected.returnReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-800">Returned — Action Required</span>
                      </div>
                      <p className="text-sm text-red-700">{selected.returnReason}</p>
                    </div>
                  )}

                  {selected.approvalJustification && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-xs font-semibold text-green-700 mb-1">Approval Justification</p>
                      <p className="text-sm text-green-800">{selected.approvalJustification}</p>
                    </div>
                  )}

                  {/* Governance warning */}
                  {selected.governanceLinked && selected.state === 'Under Review' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                      <Shield className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-orange-800">Governance Step Active</p>
                        <p className="text-sm text-orange-700 mt-1">This request has an active governance policy check. This step cannot be skipped without a logged override and approver sign-off.</p>
                      </div>
                    </div>
                  )}

                  {/* Transition */}
                  {nextState(selected.state) && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-3">
                        Advance to <span className="font-semibold">{nextState(selected.state)}</span>?
                        {(nextState(selected.state) === 'Approved' || nextState(selected.state) === 'Submitted') && (
                          <span className="text-gray-500"> Justification is required.</span>
                        )}
                      </p>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none mb-3"
                        rows={2}
                        placeholder="Enter justification or notes for this transition..."
                        value={justification}
                        onChange={e => setJustification(e.target.value)}
                      />
                      <button
                        onClick={() => setConfirmTransition({ req: selected, next: nextState(selected.state)!, justification })}
                        disabled={!justification.trim()}
                        className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                            {entry.note && <p className="text-xs text-gray-500 mt-0.5 italic">"{entry.note}"</p>}
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
                  <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Select a request to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Submit AI Request</h2>
              <p className="text-sm text-gray-500 mt-1">Provide service type, business context, and urgency</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]" placeholder="e.g. AI Copilot Access — Marketing Team" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]" placeholder="e.g. AI Copilot, RAG System, Custom Agent" value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Context</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none" rows={3} placeholder="Describe the business need and expected outcome" value={form.businessContext} onChange={e => setForm({ ...form, businessContext: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value as any })}>
                  <option>Critical</option>
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

      {/* Confirm Transition */}
      {confirmTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Confirm Transition</h2>
            <p className="text-sm text-gray-600 mb-4">
              Advancing <span className="font-semibold">{confirmTransition.req.title}</span> to{' '}
              <StatusBadge state={confirmTransition.next} />. This action is logged and cannot be undone.
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
