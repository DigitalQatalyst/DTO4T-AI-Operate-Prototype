import { useState } from 'react';
import { Zap, Settings, Activity } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const executionEnvironments = [
  { id: 'ENV-001', name: 'Finance AI Sandbox', type: 'Sandboxed', status: 'Active', access: 'Restricted', tasks: 3 },
  { id: 'ENV-002', name: 'Legal Copilot Environment', type: 'Permission-Gated', status: 'Active', access: 'Approved Users', tasks: 1 },
  { id: 'ENV-003', name: 'Customer AI Lab', type: 'Sandboxed', status: 'Pending', access: 'Restricted', tasks: 0 },
];

const pipelineTasks = [
  { id: 'PIPE-001', name: 'RAG Pipeline — Finance', model: 'GPT-4o + Embeddings', status: 'Running', health: 'Healthy', lastRun: '2025-04-20 08:00' },
  { id: 'PIPE-002', name: 'Sentiment Analysis Pipeline', model: 'Claude 3 Sonnet', status: 'Idle', health: 'Healthy', lastRun: '2025-04-19 17:00' },
  { id: 'PIPE-003', name: 'Document Extraction Pipeline', model: 'GPT-4o Vision', status: 'Running', health: 'Warning', lastRun: '2025-04-20 09:30' },
];

const tabs = ['Execution Environments', 'Pipeline Management', 'Custom Pathways'];

export default function AdvancedAIOps() {
  const [activeTab, setActiveTab] = useState('Execution Environments');
  const [selected, setSelected] = useState(executionEnvironments[0]);

  return (
    <div>
      <PageHeader title="Advanced AI Operations" subtitle="Controlled execution environments, specialist handling, and tailored AI pathways" />

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
            {activeTab === 'Execution Environments' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1 space-y-2">
                  {executionEnvironments.map(env => (
                    <button
                      key={env.id}
                      onClick={() => setSelected(env)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected.id === env.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">{env.id}</span>
                        <StatusBadge state={env.status} />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{env.name}</p>
                      <p className="text-xs text-gray-500">{env.type} · {env.tasks} active tasks</p>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-2 bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{selected.id}</span>
                        <StatusBadge state={selected.status} size="md" />
                      </div>
                      <h3 className="font-bold text-gray-900">{selected.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{selected.type} · Access: {selected.access}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-gray-900">{selected.tasks}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Active Tasks</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                      <p className="text-sm font-bold text-gray-900">{selected.access}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Access Level</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">
                      <Zap className="h-3.5 w-3.5" /> Enter Environment
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="h-3.5 w-3.5" /> Configure
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Pipeline Management' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Manage complex model, agent, and pipeline tasks</p>
                {pipelineTasks.map((task, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{task.id}</span>
                          <StatusBadge state={task.status} />
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            task.health === 'Healthy' ? 'text-green-700 bg-green-50 border-green-200' : 'text-orange-700 bg-orange-50 border-orange-200'
                          }`}>{task.health}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{task.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Model: {task.model} · Last run: {task.lastRun}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">Logs</button>
                        <button className="px-3 py-1.5 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">Manage</button>
                      </div>
                    </div>
                    {task.health === 'Warning' && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                        <Activity className="h-3.5 w-3.5" />
                        Performance degradation detected — latency above threshold
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Custom Pathways' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Custom workflow paths for non-standard AI workstreams</p>
                {[
                  { name: 'Legal Document Review Pathway', steps: 6, owner: 'Legal Team', status: 'Active' },
                  { name: 'Finance Automation Pathway', steps: 8, owner: 'Finance Team', status: 'Active' },
                  { name: 'Regulatory Monitoring Pathway', steps: 5, owner: 'Compliance Team', status: 'Draft' },
                ].map((path, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{path.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{path.steps} steps · Owner: {path.owner}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge state={path.status} />
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Configure</button>
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
