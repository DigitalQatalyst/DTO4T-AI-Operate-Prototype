import { useState } from 'react';
import { Settings, Activity, Search } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const workspaces = [
  {
    id: 'WS-001',
    name: 'Finance AI Operations',
    owner: 'Priya Nair',
    status: 'Active',
    models: ['GPT-4o', 'Embeddings v3'],
    pipelines: 3,
    lastActivity: '2025-04-20 09:30',
  },
  {
    id: 'WS-002',
    name: 'Legal Intelligence Workspace',
    owner: 'James Okafor',
    status: 'Active',
    models: ['Claude 3 Opus', 'GPT-4o'],
    pipelines: 2,
    lastActivity: '2025-04-19 16:00',
  },
  {
    id: 'WS-003',
    name: 'Customer AI Lab',
    owner: 'Tom Adeyemi',
    status: 'Pending',
    models: ['Claude 3 Sonnet'],
    pipelines: 0,
    lastActivity: '—',
  },
];

const optimisationItems = [
  { pipeline: 'RAG Pipeline — Finance', metric: 'Latency', current: '2.4s', target: '< 2s', action: 'Adjust chunk size', status: 'Attention' },
  { pipeline: 'Sentiment Analysis', metric: 'Accuracy', current: '91%', target: '> 90%', action: 'None required', status: 'Healthy' },
  { pipeline: 'Document Extraction', metric: 'Error Rate', current: '3.2%', target: '< 2%', action: 'Review prompt template', status: 'Attention' },
];

const diagnosticLogs = [
  { timestamp: '2025-04-20 09:30', pipeline: 'RAG Pipeline — Finance', level: 'Warning', message: 'Latency threshold exceeded: 2.4s avg over last 100 requests' },
  { timestamp: '2025-04-20 08:00', pipeline: 'Document Extraction', level: 'Error', message: 'Extraction failure on 3 of 94 documents — format unsupported' },
  { timestamp: '2025-04-19 17:00', pipeline: 'Sentiment Analysis', level: 'Info', message: 'Scheduled evaluation run completed — accuracy 91.2%' },
  { timestamp: '2025-04-19 14:00', pipeline: 'RAG Pipeline — Finance', level: 'Info', message: 'Index refresh completed — 1,240 new documents ingested' },
];

const logColors: Record<string, string> = {
  Warning: 'text-orange-700 bg-orange-50 border-orange-200',
  Error: 'text-red-700 bg-red-50 border-red-200',
  Info: 'text-blue-700 bg-blue-50 border-blue-200',
};

const tabs = ['Workspaces', 'Optimisation', 'Diagnostic Logs'];

export default function SpecialistWorkspaces() {
  const [activeTab, setActiveTab] = useState('Workspaces');
  const [selected, setSelected] = useState(workspaces[0]);
  const [logSearch, setLogSearch] = useState('');

  const filteredLogs = diagnosticLogs.filter(l =>
    l.message.toLowerCase().includes(logSearch.toLowerCase()) ||
    l.pipeline.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Specialist Workspaces" subtitle="Deep control interfaces, optimisation panels, and diagnostic tools" />

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
            {activeTab === 'Workspaces' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1 space-y-2">
                  {workspaces.map(ws => (
                    <button
                      key={ws.id}
                      onClick={() => setSelected(ws)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected.id === ws.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">{ws.id}</span>
                        <StatusBadge state={ws.status} />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{ws.name}</p>
                      <p className="text-xs text-gray-500">{ws.pipelines} pipelines · {ws.owner}</p>
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
                      <p className="text-sm text-gray-500 mt-0.5">Owner: {selected.owner} · Last activity: {selected.lastActivity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Active Models</p>
                      <div className="space-y-1">
                        {selected.models.map((m, i) => (
                          <span key={i} className="block text-xs font-medium text-gray-900">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-gray-900">{selected.pipelines}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Active Pipelines</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">
                      <Settings className="h-3.5 w-3.5" /> Deep Control Interface
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Activity className="h-3.5 w-3.5" /> View Logs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Optimisation' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Performance tuning, routing adjustments, and pipeline refinements</p>
                {optimisationItems.map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.pipeline}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Metric: {item.metric}</p>
                      </div>
                      <StatusBadge state={item.status} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-500">Current</p>
                        <p className="text-sm font-bold text-gray-900">{item.current}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-500">Target</p>
                        <p className="text-sm font-bold text-gray-900">{item.target}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-500">Action</p>
                        <p className="text-xs font-medium text-gray-900">{item.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Diagnostic Logs' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c]"
                      value={logSearch}
                      onChange={e => setLogSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {filteredLogs.map((log, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${logColors[log.level]}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${logColors[log.level]}`}>{log.level}</span>
                          <span className="text-xs font-medium text-gray-700">{log.pipeline}</span>
                        </div>
                        <span className="text-xs text-gray-400">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-800">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
