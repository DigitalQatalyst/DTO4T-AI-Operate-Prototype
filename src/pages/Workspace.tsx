import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  Activity,
  Users,
  Shield,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowRight,
  Briefcase,
  Target,
  Zap
} from 'lucide-react';

interface User {
  email: string;
  role: string;
  name: string;
}

const Workspace = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/login', { state: { from: { pathname: '/workspace' } } });
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  const roleConfig: Record<string, any> = {
    employee: {
      title: 'Business User / Employee',
      subtitle: 'AI Discovery & Request Management',
      color: 'blue',
      stats: [
        { label: 'Active Requests', value: '3', icon: Clock, color: 'text-blue-600' },
        { label: 'Saved Items', value: '12', icon: FileText, color: 'text-green-600' },
        { label: 'Completed', value: '8', icon: CheckCircle2, color: 'text-purple-600' },
      ],
      quickActions: [
        { label: 'Browse AI Capabilities', icon: Search, color: 'bg-blue-600' },
        { label: 'Submit New Request', icon: Plus, color: 'bg-green-600' },
        { label: 'Track My Progress', icon: Activity, color: 'bg-purple-600' },
      ],
      activeItems: [
        { title: 'AI Copilot Access Request', status: 'Pending Approval', date: '2 days ago', type: 'request' },
        { title: 'Document Analysis Tool', status: 'In Progress', date: '5 days ago', type: 'request' },
        { title: 'Training: Prompt Engineering', status: 'Scheduled', date: 'Tomorrow', type: 'training' },
      ],
    },
    manager: {
      title: 'Manager / Team Lead',
      subtitle: 'Team Opportunities & Approvals',
      color: 'purple',
      stats: [
        { label: 'Pending Approvals', value: '5', icon: Clock, color: 'text-orange-600' },
        { label: 'Team Requests', value: '12', icon: Users, color: 'text-blue-600' },
        { label: 'Opportunities', value: '8', icon: Target, color: 'text-green-600' },
      ],
      quickActions: [
        { label: 'Review Approvals', icon: CheckCircle2, color: 'bg-orange-600' },
        { label: 'Team Dashboard', icon: Users, color: 'bg-blue-600' },
        { label: 'AI Opportunities', icon: Target, color: 'bg-green-600' },
      ],
      activeItems: [
        { title: 'Ahmed Hassan - Copilot Request', status: 'Awaiting Your Approval', date: '1 day ago', type: 'approval' },
        { title: 'Team AI Adoption Review', status: 'Due This Week', date: '3 days left', type: 'review' },
        { title: 'HR Process Automation Opportunity', status: 'New', date: 'Today', type: 'opportunity' },
      ],
    },
    owner: {
      title: 'Service Owner / Business Owner',
      subtitle: 'Service Requests & Fulfillment',
      color: 'green',
      stats: [
        { label: 'Active Services', value: '15', icon: Briefcase, color: 'text-green-600' },
        { label: 'In Fulfillment', value: '8', icon: Clock, color: 'text-orange-600' },
        { label: 'Performance Score', value: '94%', icon: TrendingUp, color: 'text-blue-600' },
      ],
      quickActions: [
        { label: 'Service Requests', icon: FileText, color: 'bg-green-600' },
        { label: 'Workflow Status', icon: Activity, color: 'bg-blue-600' },
        { label: 'Performance Dashboard', icon: TrendingUp, color: 'bg-purple-600' },
      ],
      activeItems: [
        { title: 'Document Intelligence Service', status: '12 Active Users', date: 'Updated today', type: 'service' },
        { title: 'Chatbot Platform Request', status: 'In Fulfillment', date: '4 days ago', type: 'fulfillment' },
        { title: 'Q1 Service Performance Review', status: 'Scheduled', date: 'Next week', type: 'review' },
      ],
    },
    specialist: {
      title: 'Specialist Team',
      subtitle: 'Solution Pathways & Execution',
      color: 'indigo',
      stats: [
        { label: 'Incoming Needs', value: '7', icon: Bell, color: 'text-orange-600' },
        { label: 'In Execution', value: '5', icon: Zap, color: 'text-blue-600' },
        { label: 'Completed', value: '23', icon: CheckCircle2, color: 'text-green-600' },
      ],
      quickActions: [
        { label: 'View Incoming Needs', icon: Bell, color: 'bg-orange-600' },
        { label: 'Execution Tasks', icon: Zap, color: 'bg-blue-600' },
        { label: 'Solution Pathways', icon: Target, color: 'bg-purple-600' },
      ],
      activeItems: [
        { title: 'RAG Implementation - Finance', status: 'In Progress', date: '2 days ago', type: 'execution' },
        { title: 'New Agent Request - HR', status: 'Assessment Phase', date: 'Today', type: 'incoming' },
        { title: 'Model Evaluation Framework', status: 'Ready for Review', date: '1 day ago', type: 'solution' },
      ],
    },
    admin: {
      title: 'Platform Admin / Governance',
      subtitle: 'Access Control & Policy Management',
      color: 'red',
      stats: [
        { label: 'Active Users', value: '247', icon: Users, color: 'text-blue-600' },
        { label: 'Policy Checks', value: '12', icon: Shield, color: 'text-orange-600' },
        { label: 'Compliance Score', value: '98%', icon: CheckCircle2, color: 'text-green-600' },
      ],
      quickActions: [
        { label: 'User Access Management', icon: Users, color: 'bg-blue-600' },
        { label: 'Governance Controls', icon: Shield, color: 'bg-red-600' },
        { label: 'Policy Dashboard', icon: FileText, color: 'bg-purple-600' },
      ],
      activeItems: [
        { title: 'Access Review - Q1 2024', status: 'In Progress', date: '3 days ago', type: 'review' },
        { title: 'New Policy: Data Classification', status: 'Pending Approval', date: 'Today', type: 'policy' },
        { title: 'Compliance Audit Report', status: 'Due Next Week', date: '5 days left', type: 'audit' },
      ],
    },
    executive: {
      title: 'Leadership / Executive',
      subtitle: 'Portfolio Visibility & Value Tracking',
      color: 'yellow',
      stats: [
        { label: 'AI Initiatives', value: '34', icon: Briefcase, color: 'text-blue-600' },
        { label: 'Portfolio Value', value: '$2.4M', icon: TrendingUp, color: 'text-green-600' },
        { label: 'Governance Status', value: '96%', icon: Shield, color: 'text-purple-600' },
      ],
      quickActions: [
        { label: 'Portfolio Overview', icon: LayoutDashboard, color: 'bg-blue-600' },
        { label: 'Value Dashboard', icon: TrendingUp, color: 'bg-green-600' },
        { label: 'Governance Report', icon: Shield, color: 'bg-purple-600' },
      ],
      activeItems: [
        { title: 'Q1 AI Transformation Report', status: 'Ready for Review', date: 'Today', type: 'report' },
        { title: 'Strategic Initiative: Agent Framework', status: 'On Track', date: 'Updated today', type: 'initiative' },
        { title: 'Board Presentation: AI ROI', status: 'Scheduled', date: 'Next week', type: 'presentation' },
      ],
    },
  };

  const config = roleConfig[user.role] || roleConfig.employee;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-16">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{config.title} • {config.subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {config.stats.map((stat: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.quickActions.map((action: any, idx: number) => (
                <button
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
                >
                  <div className={`p-2 ${action.color} rounded-lg`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex gap-0 px-6">
                {['overview', 'active-items', 'next-actions', 'recent-activity'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[#0f1f5c] text-[#0f1f5c]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Role-Based Overview</h3>
                  <p className="text-gray-700 mb-6">
                    Your personalized workspace for {config.title.toLowerCase()}. Access AI capabilities, 
                    track progress, and manage your responsibilities all in one place.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">AI Discovery</h4>
                      <p className="text-sm text-blue-800">Browse available AI capabilities and services</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Request Management</h4>
                      <p className="text-sm text-green-800">Submit and track AI service requests</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Progress Tracking</h4>
                      <p className="text-sm text-purple-800">Monitor your initiatives and outcomes</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Support Access</h4>
                      <p className="text-sm text-orange-800">Get help and guidance when needed</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'active-items' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Active Items</h3>
                  {config.activeItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-blue-600 font-medium">{item.status}</span>
                          <span className="text-sm text-gray-500">• {item.date}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'next-actions' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Next Actions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Review pending approvals</h4>
                        <p className="text-sm text-gray-600 mt-1">5 items require your attention</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Complete training module</h4>
                        <p className="text-sm text-gray-600 mt-1">Prompt Engineering Basics - Due tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Update project status</h4>
                        <p className="text-sm text-gray-600 mt-1">Weekly progress report due Friday</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recent-activity' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-gray-50">
                      <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900"><strong>Request submitted:</strong> AI Copilot Access</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-gray-50">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900"><strong>Approved:</strong> Document Analysis Tool</p>
                        <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-gray-50">
                      <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900"><strong>Saved:</strong> RAG Implementation Guide</p>
                        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Workspace;
