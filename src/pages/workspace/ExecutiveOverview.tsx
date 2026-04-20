import { TrendingUp, Briefcase, Shield, BarChart3, Target, Users } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const portfolioInitiatives = [
  { id: 'INI-001', title: 'AI Copilot Rollout — Enterprise', stage: 'Deploy', progress: 65, value: '$420K', status: 'On Track', owner: 'Sarah Mitchell' },
  { id: 'INI-002', title: 'Finance Automation Programme', stage: 'Drive', progress: 88, value: '$780K', status: 'On Track', owner: 'David Chen' },
  { id: 'INI-003', title: 'Customer AI Experience', stage: 'Design', progress: 42, value: '$350K', status: 'At Risk', owner: 'Tom Adeyemi' },
  { id: 'INI-004', title: 'HR AI Enablement', stage: 'Discern', progress: 30, value: '$180K', status: 'On Track', owner: 'Priya Nair' },
  { id: 'INI-005', title: 'Legal Document Intelligence', stage: 'Deploy', progress: 71, value: '$290K', status: 'On Track', owner: 'James Okafor' },
];

const valueMetrics = [
  { label: 'Total Portfolio Value', value: '$2.4M', change: '+18%', positive: true },
  { label: 'Productivity Uplift', value: '34%', change: '+6%', positive: true },
  { label: 'AI Adoption Rate', value: '74%', change: '+12%', positive: true },
  { label: 'Cost Avoidance', value: '$890K', change: '+22%', positive: true },
];

const stageColors: Record<string, string> = {
  Discern: 'bg-blue-100 text-blue-800',
  Design: 'bg-purple-100 text-purple-800',
  Deploy: 'bg-indigo-100 text-indigo-800',
  Drive: 'bg-green-100 text-green-800',
};

const demandByUnit = [
  { unit: 'Finance', requests: 12, initiatives: 4, value: '$780K' },
  { unit: 'Legal', requests: 8, initiatives: 2, value: '$420K' },
  { unit: 'Customer Experience', requests: 15, initiatives: 3, value: '$350K' },
  { unit: 'Human Resources', requests: 6, initiatives: 2, value: '$180K' },
  { unit: 'Operations', requests: 9, initiatives: 3, value: '$290K' },
];

export default function ExecutiveOverview() {
  return (
    <div>
      <PageHeader title="Executive Oversight & Value View" subtitle="Enterprise AI demand, portfolio visibility, governance status, and value tracking" />

      <div className="p-8 space-y-6">
        {/* Value KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {valueMetrics.map((metric, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="h-3 w-3" />
                {metric.change} vs last quarter
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Initiatives */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">AI Initiative Portfolio</h2>
            </div>
            <span className="text-xs text-gray-500">{portfolioInitiatives.length} active initiatives</span>
          </div>
          <div className="divide-y divide-gray-100">
            {portfolioInitiatives.map((init, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{init.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stageColors[init.stage]}`}>{init.stage}</span>
                      <StatusBadge state={init.status} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{init.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Owner: {init.owner} · Value: {init.value}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">{init.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${init.progress}%`,
                      background: init.status === 'At Risk'
                        ? 'linear-gradient(90deg, rgb(251,85,53) 0%, rgb(251,146,60) 100%)'
                        : 'linear-gradient(90deg, rgb(26,46,110) 0%, rgb(251,85,53) 100%)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Demand by Business Unit */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">AI Demand by Business Unit</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {demandByUnit.map((unit, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{unit.unit}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{unit.requests} requests</span>
                    <span>{unit.initiatives} initiatives</span>
                    <span className="font-semibold text-gray-900">{unit.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Status */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Governance & Compliance Status</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Overall Compliance Score', value: '98%', bar: 98, color: 'green' },
                { label: 'Governance Coverage', value: '94%', bar: 94, color: 'green' },
                { label: 'Policy Check Pass Rate', value: '87%', bar: 87, color: 'blue' },
                { label: 'Audit Trail Completeness', value: '100%', bar: 100, color: 'green' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.bar}%`,
                        background: 'linear-gradient(90deg, rgb(26,46,110) 0%, rgb(34,197,94) 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value Tracking */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Value Tracking — Progress Against Targets</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {[
              { measure: 'AI Requests via Platform', current: '78%', target: '80%', status: 'On Track' },
              { measure: 'Traceable AI Initiatives', current: '100%', target: '100%', status: 'Achieved' },
              { measure: 'Governance Compliance', current: '98%', target: '90%', status: 'Achieved' },
              { measure: 'Active Stakeholder Groups', current: '74%', target: '75%', status: 'On Track' },
              { measure: 'Fragmentation Reduction', current: '44%', target: '50%', status: 'At Risk' },
              { measure: 'Use Cases with Value Measures', current: '100%', target: '100%', status: 'Achieved' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">{item.measure}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-bold text-gray-900">{item.current}</span>
                  <span className="text-xs text-gray-400 mb-0.5">/ {item.target}</span>
                </div>
                <StatusBadge state={item.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
