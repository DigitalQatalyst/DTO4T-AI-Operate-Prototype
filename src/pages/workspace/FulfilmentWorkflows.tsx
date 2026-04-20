import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const workQueue = [
  { id: 'WQ-001', title: 'AI Copilot Access — Legal Team', type: 'Service Request', owner: 'James Okafor', state: 'Under Review', priority: 'High', sla: '2025-04-22' },
  { id: 'WQ-002', title: 'RAG Implementation — Finance', type: 'Execution Task', owner: 'Priya Nair', state: 'In Progress', priority: 'High', sla: '2025-04-25' },
  { id: 'WQ-003', title: 'Sentiment Analysis Tool', type: 'Service Request', owner: 'Unassigned', state: 'Submitted', priority: 'Medium', sla: '2025-04-30' },
  { id: 'WQ-004', title: 'Model Evaluation — Customer Sentiment', type: 'Evaluation', owner: 'Specialist Team', state: 'Completed', priority: 'Medium', sla: '2025-04-19' },
];

const approvalRules = [
  { name: 'Standard Service Request', levels: 2, trigger: 'All service requests', status: 'Active' },
  { name: 'Governance-Linked Request', levels: 3, trigger: 'Requests with governance flag', status: 'Active' },
  { name: 'Critical Urgency Override', levels: 1, trigger: 'Critical urgency requests', status: 'Active' },
  { name: 'Executive Approval', levels: 4, trigger: 'Requests > $50k value', status: 'Draft' },
];

const priorityColors: Record<string, string> = {
  Critical: 'text-red-700 bg-red-50 border-red-200',
  High: 'text-orange-700 bg-orange-50 border-orange-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Low: 'text-gray-600 bg-gray-50 border-gray-200',
};

const tabs = ['Work Queues', 'Approvals', 'Handoffs'];

export default function FulfilmentWorkflows() {
  const [activeTab, setActiveTab] = useState('Work Queues');
  const [selected, setSelected] = useState(workQueue[0]);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? workQueue : workQueue.filter(w => w.state === filter);

  return (
    <div>
      <PageHeader title="Fulfilment Workflow Management" subtitle="Centralised queues, task progression, approvals, and handoffs" />

      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex border-b border-gray-200 px-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-[#0f1f5c] text-[#0f1f5c]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'Work Queues' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Queue</h3>
                    <select
                      className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                      value={filter}
                      onChange={e => setFilter(e.target.value)}
                    >
                      {['All', 'Submitted', 'Under Review', 'In Progress', 'Completed'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    {filtered.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          selected.id === item.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs font-mono text-gray-400">{item.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[item.priority]}`}>{item.priority}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                        <p className="text-xs text-gray-500 mb-2">{item.type}</p>
                        <StatusBadge state={item.state} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                        <StatusBadge state={selected.state} size="md" />
                      </div>
                      <h3 className="font-bold text-gray-900">{selected.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{selected.type} · Owner: {selected.owner} · SLA: {selected.sla}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Task Progression</h4>
                      <div className="flex gap-2 flex-wrap">
                        {['Move to In Progress', 'Request Clarification', 'Escalate'].map(action => (
                          <button key={action} className="px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">
                            {action}
                          </button>
                        ))}
                        <button className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">
                          Close Item
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Override / Escalate</h4>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] resize-none"
                        rows={2}
                        placeholder="Enter justification for override or escalation..."
                      />
                      <button className="mt-2 px-3 py-2 bg-orange-600 text-white rounded-lg text-xs font-medium hover:bg-orange-700 transition-colors flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" /> Log Override
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Approvals' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Multi-level approval flows with configurable rules</p>
                {approvalRules.map((rule, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{rule.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Trigger: {rule.trigger}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{rule.levels} levels</span>
                        <StatusBadge state={rule.status} />
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3">
                      {Array.from({ length: rule.levels }).map((_, j) => (
                        <div key={j} className="flex items-center gap-1">
                          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-gray-700">Level {j + 1}</span>
                          </div>
                          {j < rule.levels - 1 && <ArrowRight className="h-3 w-3 text-gray-400" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Handoffs' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Structured handoff actions between teams and owners</p>
                {[
                  { from: 'Business Owner', to: 'Specialist Team', item: 'AI Copilot Access — Legal Team', status: 'Pending', date: '2025-04-20' },
                  { from: 'Specialist Team', to: 'Service Owner', item: 'RAG Implementation — Finance', status: 'Completed', date: '2025-04-18' },
                  { from: 'Governance Team', to: 'Business Owner', item: 'Custom Agent — Customer Support', status: 'Returned', date: '2025-04-17' },
                ].map((handoff, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">{handoff.item}</p>
                      <StatusBadge state={handoff.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="bg-white border border-gray-200 px-2 py-0.5 rounded">{handoff.from}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="bg-white border border-gray-200 px-2 py-0.5 rounded">{handoff.to}</span>
                      <span className="ml-auto">{handoff.date}</span>
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
