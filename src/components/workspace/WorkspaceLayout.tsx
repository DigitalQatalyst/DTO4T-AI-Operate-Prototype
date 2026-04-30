import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Lightbulb, FileText, User, TrendingUp,
  Settings, LogOut, Bell, ChevronLeft, ChevronRight,
  Briefcase, Users, Shield, BarChart3,
  BookOpen, Layers, Menu, Home, ChevronDown, ChevronUp,
  Search, Bookmark, HelpCircle, CheckSquare, FileSearch,
  Activity, BarChart2, Calendar, Inbox, GitBranch,
  Package, ListTodo, Download, Map, CheckCircle, Radio,
  UserCog, FileCheck, Eye, Sliders, FolderKanban, DollarSign,
  AlertCircle
} from 'lucide-react';
import type { UserRole } from '@/types/workspace';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
  category: 'workspace' | 'general-ops' | 'specialized-ops';
  badge?: string;
}

const navItems: NavItem[] = [
  // Workspace Category - Core user functions (Workspace Hub is accessed via category header, not as a separate tab)
  { label: 'AI Opportunity', icon: Lightbulb, path: '/workspace/opportunity', roles: ['employee', 'manager'], category: 'workspace' },
  { label: 'AI Request', icon: FileText, path: '/workspace/request', roles: ['employee', 'manager'], category: 'workspace' },
  { label: 'Profile & Account', icon: User, path: '/workspace/profile', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'], category: 'workspace' },
  { label: 'Progress & Value', icon: TrendingUp, path: '/workspace/progress', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'], category: 'workspace' },
  { label: 'AI Discovery', icon: Search, path: '/workspace/discovery', roles: ['employee'], category: 'workspace' },
  { label: 'My Saved Items', icon: Bookmark, path: '/workspace/saved', roles: ['employee'], category: 'workspace' },
  { label: 'Support Access', icon: HelpCircle, path: '/workspace/support', roles: ['employee'], category: 'workspace' },
  
  // General Fulfillment & Operations Category
  { label: 'Team Dashboard', icon: Users, path: '/workspace/team-dashboard', roles: ['manager'], category: 'general-ops' },
  { label: 'Team Opportunities', icon: Lightbulb, path: '/workspace/team-opportunities', roles: ['manager'], category: 'general-ops' },
  { label: 'Pending Approvals', icon: CheckSquare, path: '/workspace/approvals', roles: ['manager'], category: 'general-ops' },
  { label: 'Request Review', icon: FileSearch, path: '/workspace/request-review', roles: ['manager'], category: 'general-ops' },
  { label: 'Team Progress', icon: Activity, path: '/workspace/team-progress', roles: ['manager'], category: 'general-ops' },
  { label: 'Team Performance', icon: BarChart2, path: '/workspace/team-performance', roles: ['manager'], category: 'general-ops' },
  { label: 'Resource Planning', icon: Calendar, path: '/workspace/resource-planning', roles: ['manager'], category: 'general-ops' },
  { label: 'Escalations', icon: AlertCircle, path: '/workspace/escalations', roles: ['manager'], category: 'general-ops' },
  
  { label: 'Service Dashboard', icon: Briefcase, path: '/workspace/service-dashboard', roles: ['owner'], category: 'general-ops' },
  { label: 'Service Requests', icon: Inbox, path: '/workspace/service-requests', roles: ['owner'], category: 'general-ops' },
  { label: 'Workflow Status', icon: GitBranch, path: '/workspace/workflow-status', roles: ['owner'], category: 'general-ops' },
  { label: 'Fulfillment Coordination', icon: Layers, path: '/workspace/fulfillment', roles: ['owner'], category: 'general-ops' },
  { label: 'Service Performance', icon: TrendingUp, path: '/workspace/service-performance', roles: ['owner'], category: 'general-ops' },
  { label: 'Service Catalog', icon: Package, path: '/workspace/service-catalog', roles: ['owner'], category: 'general-ops' },
  
  { label: 'Incoming Needs', icon: Download, path: '/workspace/incoming-needs', roles: ['specialist'], category: 'general-ops' },
  { label: 'Solution Pathways', icon: Map, path: '/workspace/solution-pathways', roles: ['specialist'], category: 'general-ops' },
  { label: 'Execution Tasks', icon: CheckCircle, path: '/workspace/execution-tasks', roles: ['specialist'], category: 'general-ops' },
  { label: 'Operational Updates', icon: Radio, path: '/workspace/operational-updates', roles: ['specialist'], category: 'general-ops' },
  
  // Platform Admin Operations (S03 - General Ops)
  { label: 'Admin Dashboard', icon: Settings, path: '/workspace/admin-dashboard', roles: ['admin'], category: 'general-ops' },
  { label: 'User Access', icon: UserCog, path: '/workspace/user-access', roles: ['admin'], category: 'general-ops' },
  { label: 'Service Configuration', icon: Sliders, path: '/workspace/system-config', roles: ['admin'], category: 'general-ops' },
  
  // Specialized Fulfillment & Operations Category (S04)
  // Governance & Oversight Operations
  { label: 'Governance Controls', icon: Shield, path: '/workspace/governance-controls', roles: ['admin'], category: 'specialized-ops' },
  { label: 'Policy Checks', icon: FileCheck, path: '/workspace/policy-checks', roles: ['admin'], category: 'specialized-ops' },
  { label: 'Oversight Actions', icon: Eye, path: '/workspace/oversight-actions', roles: ['admin'], category: 'specialized-ops' },
  { label: 'Audit Logs', icon: FileText, path: '/workspace/audit-logs', roles: ['admin'], category: 'specialized-ops' },
  
  { label: 'Executive Dashboard', icon: BarChart3, path: '/workspace/executive-dashboard', roles: ['executive'], category: 'specialized-ops' },
  { label: 'AI Demand Overview', icon: TrendingUp, path: '/workspace/ai-demand', roles: ['executive'], category: 'specialized-ops' },
  { label: 'Portfolio Visibility', icon: FolderKanban, path: '/workspace/portfolio', roles: ['executive'], category: 'specialized-ops' },
  { label: 'Governance Status', icon: Shield, path: '/workspace/governance-status', roles: ['executive'], category: 'specialized-ops' },
  { label: 'Value Tracking', icon: DollarSign, path: '/workspace/value-tracking', roles: ['executive'], category: 'specialized-ops' },
  { label: 'Strategic Insights', icon: Lightbulb, path: '/workspace/strategic-insights', roles: ['executive'], category: 'specialized-ops' },
];

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'employee', label: 'Business User / Employee' },
  { value: 'manager', label: 'Manager / Team Lead' },
  { value: 'owner', label: 'Service Owner / Business Owner' },
  { value: 'specialist', label: 'Specialist Team' },
  { value: 'admin', label: 'Platform Admin / Governance' },
  { value: 'executive', label: 'Leadership / Executive' },
];

const roleBadgeColors: Record<UserRole, string> = {
  employee: 'bg-blue-100 text-blue-800',
  manager: 'bg-purple-100 text-purple-800',
  owner: 'bg-green-100 text-green-800',
  specialist: 'bg-indigo-100 text-indigo-800',
  admin: 'bg-red-100 text-red-800',
  executive: 'bg-amber-100 text-amber-800',
};

// Build breadcrumb from pathname
const buildBreadcrumbs = (pathname: string, navItems: NavItem[]) => {
  const crumbs: { label: string; path: string }[] = [{ label: 'Home', path: '/' }];
  if (pathname === '/workspace') {
    crumbs.push({ label: 'My Workspace', path: '/workspace' });
  } else if (pathname.startsWith('/workspace/')) {
    crumbs.push({ label: 'My Workspace', path: '/workspace' });
    const match = navItems.find(n => n.path === pathname);
    if (match) crumbs.push({ label: match.label, path: match.path });
  }
  return crumbs;
};

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  user: { name: string; role: UserRole; email: string };
  onLogout: () => void;
  onRoleSwitch: (role: UserRole) => void;
}

export default function WorkspaceLayout({ children, user, onLogout, onRoleSwitch }: WorkspaceLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const visibleItems = navItems.filter(item => item.roles.includes(user.role));
  const breadcrumbs = buildBreadcrumbs(location.pathname, navItems);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'workspace': return 'Workspace';
      case 'general-ops': return 'Fulfilment';
      case 'specialized-ops': return 'Specialised';
      default: return category;
    }
  };

  const groupedItems = {
    'workspace': visibleItems.filter(item => item.category === 'workspace'),
    'general-ops': visibleItems.filter(item => item.category === 'general-ops'),
    'specialized-ops': visibleItems.filter(item => item.category === 'specialized-ops'),
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0d2a5e' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <button
          onClick={() => navigate('/')}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, rgb(251,85,53) 0%, rgb(26,46,110) 100%)' }}
          title="Back to Home"
        >
          D
        </button>
        {!collapsed && (
          <button onClick={() => navigate('/')} className="text-left hover:opacity-80 transition-opacity">
            <div className="text-sm font-bold text-white">DIA.AI</div>
            <div className="text-xs text-gray-400">DigitalQatalyst</div>
          </button>
        )}
      </div>

      {/* User badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="text-sm font-semibold text-white truncate">{user.name}</div>
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColors[user.role]}`}>
            {roleOptions.find(r => r.value === user.role)?.label}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {Object.entries(groupedItems).map(([category, items]) => {
          if (items.length === 0) return null;
          const isWorkspaceCategory = category === 'workspace';
          const isWorkspaceActive = location.pathname === '/workspace';
          
          return (
            <div key={category}>
              {/* Category Header */}
              {!collapsed && (
                <div className="px-3 mb-2">
                  {isWorkspaceCategory ? (
                    // Workspace category header is clickable
                    <button
                      onClick={() => navigate('/workspace')}
                      className={`w-full text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                        isWorkspaceActive 
                          ? 'text-blue-400' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {getCategoryLabel(category)}
                    </button>
                  ) : (
                    // Other category headers are just labels
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {getCategoryLabel(category)}
                    </div>
                  )}
                </div>
              )}
              
              {/* Category Items */}
              <div className="space-y-0.5">
                {items.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active ? 'bg-blue-600/40 text-white border-l-4 border-blue-400' : 'text-gray-300 hover:bg-blue-900/30 hover:text-white'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-2 space-y-0.5">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all"
          title={collapsed ? 'Back to Home' : undefined}
        >
          <ChevronLeft className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Back to Home</span>}
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/10 transition-all duration-300 flex-shrink-0 relative ${
          collapsed ? 'w-16' : 'w-60'
        }`}
        style={{ backgroundColor: '#0d2a5e' }}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 border border-white/10 rounded-r-lg p-1 shadow-sm hover:bg-white/5 transition-all z-10"
          style={{ backgroundColor: '#0d2a5e', right: '-12px' }}
        >
          {collapsed ? <ChevronRight className="h-3 w-3 text-gray-300" /> : <ChevronLeft className="h-3 w-3 text-gray-300" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 shadow-xl" style={{ backgroundColor: '#0d2a5e' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-sm min-w-0" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.path} className="flex items-center gap-1 min-w-0">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}
                  {i === 0 ? (
                    <button
                      onClick={() => navigate('/')}
                      className="flex items-center gap-1 text-gray-500 hover:text-[#0f1f5c] transition-colors flex-shrink-0"
                    >
                      <Home className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Home</span>
                    </button>
                  ) : i === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium truncate">{crumb.label}</span>
                  ) : (
                    <button
                      onClick={() => navigate(crumb.path)}
                      className="text-gray-500 hover:text-[#0f1f5c] transition-colors truncate"
                    >
                      {crumb.label}
                    </button>
                  )}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Prototype role switcher */}
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-semibold text-amber-700 whitespace-nowrap">Prototype: Switch Role</span>
              <div className="relative">
                <select
                  value={user.role}
                  onChange={e => onRoleSwitch(e.target.value as UserRole)}
                  className="text-xs font-medium text-amber-900 bg-transparent border-none focus:outline-none cursor-pointer pr-5 appearance-none"
                >
                  {roleOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-amber-700 pointer-events-none" />
              </div>
            </div>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
