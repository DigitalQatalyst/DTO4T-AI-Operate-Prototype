import { useState } from 'react';
import { Zap, ArrowRight, CheckCircle2, AlertTriangle, Clock, BookOpen } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const executionQueue = [
  { id: 'TASK-001', title: 'RAG Implementation — Finance', type: 'Implementation', priority: 'High', assignee: 'You', state: 'In Progress', due: '2025-04-25' },
  { id: 'TASK-002', title: 'Agent Design — HR Onboarding', type: 'Design', priority: 'Medium', assignee: 'You', state: 'Submitted', due: '2025-04-30' },
  { id: 'TASK-003', title: 'Model Evaluation — Customer Sentiment', type: 'Evaluation', priority: 'High', assignee: 'Team', state: 'Completed', due: '2025-04-19' },
  { id: 'TASK-004', title: 'Prompt Engineering — Legal Copilot', type: 'Prompt Ops', priority: 'Critical', assignee: 'You', state: 'Submitted', due: '2025-04-22' },
];

const knowledgeAssets = [
  { title: 'RAG Architecture Blueprint v3', type: 'Blueprint', relevance: 'High' },
  { title: 'Prompt Engineering Standards', type: 'Standard', relevance: 'High' },
  { title: 'Agent Lifecycle Governance Guide', type: 'Guide', relevance: 'Medium' },
  { title: 'Model Evaluation Framework', type: 'Template', relevance: 'Medium' },
];

const priorityColors: Record<string, string> = {
  Critical: 'text-red-700 bg-red-50 border-red-200',
  High: 'text-orange-700 bg-orange-50 border-orange-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Low: 'text-gray-600 bg-gray-50 border-gray-200',
};

const actionColors: Record<string, string> = {
  Accept: 'bg-green-600 hover:bg-green-700',
  Escalate: 'bg-orange-600 hover:bg-orange-700',
  Park: 'bg-gray-500 hover:bg-gray-600',
  Resolve: 'bg-[#0f1f5c] hover:bg-[#1a2f7a]',
};

export default function SpecialistOps() {
  const [selected, setSelected] = useState(executionQueue[0]);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? executionQueue : executionQueue.filter(t => t.state === filter);

  return (
    <div>
      <PageHeader title="Specialist Team Operations" subtitle="Execution queues, routing, approvals, and delivery support" />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queue */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Execution Queue</h2>
              <select
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                {['All', 'Submitted', 'In Progress', 'Completed'].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              {filtered.map(task => (
                <button
                  key={task.id}
                  onClick={() => setSelected(task)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected.id === task.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-mono text-gray-400">{task.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{task.title}</p>
                  <p className="text-xs text-gray-500 mb-2">{task.type} · Due {task.due}</p>
                  <StatusBadge state={task.state} />
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                    <StatusBadge state={selected.state} size="md" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selected.type} · Assigned to {selected.assignee} · Due {selected.due}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium flex-shrink-0 ${priorityColors[selected.priority]}`}>{selected.priority}</span>
              </div>

              {/* Operational Actions */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Operational Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {['Accept', 'Escalate', 'Park', 'Resolve'].map(action => (
                    <button
                      key={action}
                      className={`flex items-center gap-1.5 px-3 py-2 text-white rounded-lg text-xs font-medium transition-colors ${actionColors[action]}`}
                    >
                      {action === 'Accept' && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {action === 'Escalate' && <AlertTriangle className="h-3.5 w-3.5" />}
                      {action === 'Park' && <Clock className="h-3.5 w-3.5" />}
                      {action === 'Resolve' && <Zap className="h-3.5 w-3.5" />}
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Routing */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Route to Team
                </h3>
                <div className="flex gap-2">
                  <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]">
                    <option>Select team or individual...</option>
                    <option>AI Operations Team</option>
                    <option>Data Engineering</option>
                    <option>Platform Engineering</option>
                    <option>Governance Team</option>
                  </select>
                  <button className="px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">Route</button>
                </div>
              </div>
            </div>

            {/* Delivery Support */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-500" /> Delivery Support
              </h3>
              <div className="space-y-2">
                {knowledgeAssets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.title}</p>
                        <p className="text-xs text-gray-500">{asset.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${asset.relevance === 'High' ? 'text-green-700' : 'text-yellow-700'}`}>{asset.relevance}</span>
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Open</button>
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
