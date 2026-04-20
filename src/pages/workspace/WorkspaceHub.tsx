import { useNavigate } from 'react-router-dom';
import {
  Clock, CheckCircle2, FileText, Users, Shield, TrendingUp,
  Briefcase, Target, Zap, Bell, Search, Plus, ArrowRight,
  Activity, BarChart3, AlertTriangle, Settings, Lightbulb
} from 'lucide-react';
import StatusBadge from '@/components/workspace/StatusBadge';
import type { UserRole } from '@/types/workspace';

interface WorkspaceHubProps {
  user: { name: string; role: UserRole; email: string };
}

const roleConfigs: Record<UserRole, {
  title: string;
  subtitle: string;
  stats: { label: string; value: string; icon: React.ElementType; color: string; bg: string }[];
  quickActions: { label: string; icon: React.ElementType; path: string; color: string }[];
  activeItems: { title: string; status: string; date: string; type: string }[];
  nextActions: { label: string; detail: string; priority: 'high' | 'medium' | 'low' }[];
  tiles: { title: string; desc: string; color: string }[];
}> = {
  employee: {
    title: 'Business User / Employee',
    subtitle: 'AI Discovery & Request Management',
    stats: [
      { label: 'Active Requests', value: '3', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Saved Items', value: '12', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Completed', value: '8', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
    ],
    quickActions: [
      { label: 'Browse AI Capabilities', icon: Search, path: '/discern', color: 'bg-blue-600' },
      { label: 'Submit AI Request', icon: Plus, path: '/workspace/request', color: 'bg-green-600' },
      { label: 'Log AI Opportunity', icon: Lightbulb, path: '/workspace/opportunity', color: 'bg-purple-600' },
    ],
    activeItems: [
      { title: 'AI Copilot Access Request', status: 'Under Review', date: '2 days ago', type: 'request' },
      { title: 'Document Analysis Tool', status: 'In Fulfilment', date: '5 days ago', type: 'request' },
      { title: 'Prompt Engineering Training', status: 'In Progress', date: 'Tomorrow', type: 'training' },
    ],
    nextActions: [
      { label: 'Complete your AI Opportunity submission', detail: 'Draft saved — 1 item pending', priority: 'high' },
      { label: 'Review training module', detail: 'Prompt Engineering Basics — due tomorrow', priority: 'medium' },
      { label: 'Check request status', detail: 'AI Copilot Access — awaiting approval', priority: 'low' },
    ],
    tiles: [
      { title: 'AI Discovery', desc: 'Browse available AI capabilities and services across the platform', color: 'border-blue-200 bg-blue-50' },
      { title: 'Request Management', desc: 'Submit and track AI service requests end-to-end', color: 'border-green-200 bg-green-50' },
      { title: 'Progress Tracking', desc: 'Monitor your initiatives and outcomes in real time', color: 'border-purple-200 bg-purple-50' },
      { title: 'Support Access', desc: 'Get guidance, FAQs, and expert support when needed', color: 'border-orange-200 bg-orange-50' },
    ],
  },
  manager: {
    title: 'Manager / Team Lead',
    subtitle: 'Team Opportunities & Approvals',
    stats: [
      { label: 'Pending Approvals', value: '5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'Team Requests', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'AI Opportunities', value: '8', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
    ],
    quickActions: [
      { label: 'Review Approvals', icon: CheckCircle2, path: '/workspace/request', color: 'bg-orange-600' },
      { label: 'Team Dashboard', icon: Users, path: '/workspace/progress', color: 'bg-blue-600' },
      { label: 'AI Opportunities', icon: Target, path: '/workspace/opportunity', color: 'bg-green-600' },
    ],
    activeItems: [
      { title: 'Ahmed Hassan — Copilot Request', status: 'Approved', date: '1 day ago', type: 'approval' },
      { title: 'Team AI Adoption Review', status: 'In Progress', date: '3 days left', type: 'review' },
      { title: 'HR Process Automation Opportunity', status: 'Submitted', date: 'Today', type: 'opportunity' },
    ],
    nextActions: [
      { label: 'Review 5 pending approvals', detail: 'Oldest item: 3 days ago', priority: 'high' },
      { label: 'Assess team AI opportunity', detail: 'HR Process Automation — submitted today', priority: 'high' },
      { label: 'Weekly progress report', detail: 'Due Friday', priority: 'medium' },
    ],
    tiles: [
      { title: 'Team AI Opportunities', desc: 'Surface and prioritise AI opportunities across your team', color: 'border-green-200 bg-green-50' },
      { title: 'Approvals Queue', desc: 'Review and action pending requests from your team', color: 'border-orange-200 bg-orange-50' },
      { title: 'Request Visibility', desc: 'Full view of all team AI requests and their current states', color: 'border-blue-200 bg-blue-50' },
      { title: 'Initiative Tracking', desc: 'Monitor team-level AI initiatives and progress', color: 'border-purple-200 bg-purple-50' },
    ],
  },
  owner: {
    title: 'Service Owner / Business Owner',
    subtitle: 'Service Requests & Fulfilment',
    stats: [
      { label: 'Active Services', value: '15', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'In Fulfilment', value: '8', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'Performance Score', value: '94%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    ],
    quickActions: [
      { label: 'Service Requests', icon: FileText, path: '/workspace/business-ops', color: 'bg-green-600' },
      { label: 'Workflow Status', icon: Activity, path: '/workspace/fulfilment', color: 'bg-blue-600' },
      { label: 'Service Operations', icon: Briefcase, path: '/workspace/service-ops', color: 'bg-purple-600' },
    ],
    activeItems: [
      { title: 'Document Intelligence Service', status: 'Active', date: 'Updated today', type: 'service' },
      { title: 'Chatbot Platform Request', status: 'In Fulfilment', date: '4 days ago', type: 'fulfilment' },
      { title: 'Q1 Service Performance Review', status: 'In Progress', date: 'Next week', type: 'review' },
    ],
    nextActions: [
      { label: 'Review incoming service requests', detail: '3 new requests in queue', priority: 'high' },
      { label: 'Update Chatbot Platform status', detail: 'Fulfilment step 3 of 5 pending sign-off', priority: 'high' },
      { label: 'Publish service update notes', detail: 'Document Intelligence v2.1 — draft ready', priority: 'medium' },
    ],
    tiles: [
      { title: 'Service Request Inbox', desc: 'Incoming requests filtered by service area and priority', color: 'border-green-200 bg-green-50' },
      { title: 'Fulfilment Coordination', desc: 'Track and progress active fulfilment workflows', color: 'border-blue-200 bg-blue-50' },
      { title: 'Service Performance', desc: 'Monitor service health, SLAs, and performance indicators', color: 'border-purple-200 bg-purple-50' },
      { title: 'Pending Escalations', desc: 'Items requiring urgent attention or escalation', color: 'border-orange-200 bg-orange-50' },
    ],
  },
  specialist: {
    title: 'Specialist Team',
    subtitle: 'Solution Pathways & Execution',
    stats: [
      { label: 'Incoming Needs', value: '7', icon: Bell, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'In Execution', value: '5', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Completed This Month', value: '23', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ],
    quickActions: [
      { label: 'Incoming Needs', icon: Bell, path: '/workspace/specialist-ops', color: 'bg-orange-600' },
      { label: 'Execution Tasks', icon: Zap, path: '/workspace/advanced-ops', color: 'bg-blue-600' },
      { label: 'Solution Pathways', icon: Target, path: '/workspace/specialist-workspaces', color: 'bg-purple-600' },
    ],
    activeItems: [
      { title: 'RAG Implementation — Finance', status: 'In Progress', date: '2 days ago', type: 'execution' },
      { title: 'New Agent Request — HR', status: 'Under Assessment', date: 'Today', type: 'incoming' },
      { title: 'Model Evaluation Framework', status: 'Completed', date: '1 day ago', type: 'solution' },
    ],
    nextActions: [
      { label: 'Accept incoming HR Agent request', detail: 'Assigned to your queue — awaiting acceptance', priority: 'high' },
      { label: 'Complete RAG implementation step 4', detail: 'Finance team — integration testing', priority: 'high' },
      { label: 'Review specialist request intake', detail: '2 complex requests pending triage', priority: 'medium' },
    ],
    tiles: [
      { title: 'Incoming Needs', desc: 'New requests and opportunities assigned to the specialist team', color: 'border-orange-200 bg-orange-50' },
      { title: 'Execution Queue', desc: 'Active tasks and delivery items in progress', color: 'border-blue-200 bg-blue-50' },
      { title: 'Solution Pathways', desc: 'Tooling, blueprints, and knowledge assets for delivery', color: 'border-purple-200 bg-purple-50' },
      { title: 'Cross-System Coordination', desc: 'Handoffs, routing, and team coordination links', color: 'border-green-200 bg-green-50' },
    ],
  },
  admin: {
    title: 'Platform Admin / Governance',
    subtitle: 'Access Control & Policy Management',
    stats: [
      { label: 'Active Users', value: '247', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Policy Checks Pending', value: '12', icon: Shield, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'Compliance Score', value: '98%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ],
    quickActions: [
      { label: 'User Access Management', icon: Users, path: '/workspace/platform-admin', color: 'bg-blue-600' },
      { label: 'Governance Controls', icon: Shield, path: '/workspace/governance', color: 'bg-red-600' },
      { label: 'Risk & Compliance', icon: AlertTriangle, path: '/workspace/risk-compliance', color: 'bg-purple-600' },
    ],
    activeItems: [
      { title: 'Access Review — Q1 2025', status: 'In Progress', date: '3 days ago', type: 'review' },
      { title: 'New Policy: Data Classification', status: 'Under Review', date: 'Today', type: 'policy' },
      { title: 'Compliance Audit Report', status: 'In Progress', date: '5 days left', type: 'audit' },
    ],
    nextActions: [
      { label: 'Complete Q1 access review', detail: '14 users pending role confirmation', priority: 'high' },
      { label: 'Approve Data Classification policy', detail: 'Awaiting governance sign-off', priority: 'high' },
      { label: 'Review policy check queue', detail: '12 items pending automated checks', priority: 'medium' },
    ],
    tiles: [
      { title: 'User Access & Roles', desc: 'Manage user provisioning, role assignments, and permissions', color: 'border-blue-200 bg-blue-50' },
      { title: 'Governance Controls', desc: 'Policy status, compliance gates, and oversight actions', color: 'border-red-200 bg-red-50' },
      { title: 'Policy Check Queue', desc: 'Automated and manual policy compliance verification', color: 'border-orange-200 bg-orange-50' },
      { title: 'Audit Access', desc: 'Searchable, exportable audit history across all governed actions', color: 'border-purple-200 bg-purple-50' },
    ],
  },
  executive: {
    title: 'Leadership / Executive',
    subtitle: 'Portfolio Visibility & Value Tracking',
    stats: [
      { label: 'AI Initiatives', value: '34', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Portfolio Value', value: '$2.4M', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Governance Status', value: '96%', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
    ],
    quickActions: [
      { label: 'Portfolio Overview', icon: BarChart3, path: '/workspace/executive', color: 'bg-blue-600' },
      { label: 'Value Dashboard', icon: TrendingUp, path: '/workspace/progress', color: 'bg-green-600' },
      { label: 'Governance Report', icon: Shield, path: '/workspace/governance', color: 'bg-purple-600' },
    ],
    activeItems: [
      { title: 'Q1 AI Transformation Report', status: 'Completed', date: 'Today', type: 'report' },
      { title: 'Strategic Initiative: Agent Framework', status: 'In Progress', date: 'Updated today', type: 'initiative' },
      { title: 'Board Presentation: AI ROI', status: 'In Progress', date: 'Next week', type: 'presentation' },
    ],
    nextActions: [
      { label: 'Review AI demand overview', detail: '34 active initiatives across 6 business units', priority: 'medium' },
      { label: 'Approve Agent Framework milestone', detail: 'Stage gate review — Q1 delivery', priority: 'high' },
      { label: 'Review governance compliance status', detail: '96% — 2 items flagged for attention', priority: 'medium' },
    ],
    tiles: [
      { title: 'AI Demand Overview', desc: 'Enterprise-wide AI request and initiative demand visibility', color: 'border-blue-200 bg-blue-50' },
      { title: 'Portfolio Status', desc: 'All AI initiatives with stage, owner, and progress tracking', color: 'border-green-200 bg-green-50' },
      { title: 'Governance & Compliance', desc: 'Real-time governance coverage and compliance status', color: 'border-purple-200 bg-purple-50' },
      { title: 'Value & Outcomes', desc: 'KPIs, ROI indicators, and business outcome tracking', color: 'border-amber-200 bg-amber-50' },
    ],
  },
};

const priorityColors = {
  high: 'bg-red-50 border-red-200',
  medium: 'bg-yellow-50 border-yellow-200',
  low: 'bg-gray-50 border-gray-200',
};
const priorityDot = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-gray-400',
};

export default function WorkspaceHub({ user }: WorkspaceHubProps) {
  const navigate = useNavigate();
  const config = roleConfigs[user.role];

  return (
    <div className="p-8 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {config.stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {config.quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className={`p-2 ${action.color} rounded-lg flex-shrink-0`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm group-hover:text-[#0f1f5c] transition-colors">{action.label}</span>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-[#0f1f5c] transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Items */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Active Items</h2>
            <button onClick={() => navigate('/workspace/progress')} className="text-xs text-[#0f1f5c] hover:underline font-medium">View all</button>
          </div>
          <div className="divide-y divide-gray-100">
            {config.activeItems.map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge state={item.status} />
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                </div>
                <button className="ml-3 text-xs text-gray-500 hover:text-[#0f1f5c] font-medium flex-shrink-0">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Actions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Next Actions</h2>
          </div>
          <div className="p-4 space-y-3">
            {config.nextActions.map((action, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${priorityColors[action.priority]}`}>
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[action.priority]}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{action.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role-Specific Tiles */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Workspace</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.tiles.map((tile, i) => (
            <div key={i} className={`rounded-xl border p-4 ${tile.color}`}>
              <h3 className="font-semibold text-gray-900 text-sm">{tile.title}</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { icon: Activity, color: 'text-blue-600', border: 'border-blue-400', text: 'Request submitted: AI Copilot Access', time: '2 hours ago' },
            { icon: CheckCircle2, color: 'text-green-600', border: 'border-green-400', text: 'Approved: Document Analysis Tool', time: 'Yesterday' },
            { icon: FileText, color: 'text-purple-600', border: 'border-purple-400', text: 'Saved: RAG Implementation Guide', time: '3 days ago' },
          ].map((entry, i) => (
            <div key={i} className={`flex items-start gap-3 px-5 py-3.5 border-l-4 ${entry.border}`}>
              <entry.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${entry.color}`} />
              <div>
                <p className="text-sm text-gray-900">{entry.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
