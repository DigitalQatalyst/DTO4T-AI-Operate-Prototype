import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Lightbulb, FileText, User, TrendingUp,
  Settings, LogOut, Bell, ChevronLeft, ChevronRight,
  Briefcase, Users, Shield, Zap, BarChart3, ClipboardList,
  BookOpen, Layers, AlertTriangle, Menu, Home, ChevronDown
} from 'lucide-react';
import type { UserRole } from '@/types/workspace';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Workspace', icon: LayoutDashboard, path: '/workspace', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'AI Opportunity', icon: Lightbulb, path: '/workspace/opportunity', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'AI Request', icon: FileText, path: '/workspace/request', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'Profile & Account', icon: User, path: '/workspace/profile', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'Progress & Value', icon: TrendingUp, path: '/workspace/progress', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'Service Operations', icon: Briefcase, path: '/workspace/service-ops', roles: ['owner', 'specialist', 'admin'] },
  { label: 'Business Operations', icon: ClipboardList, path: '/workspace/business-ops', roles: ['owner', 'admin'] },
  { label: 'Specialist Operations', icon: Zap, path: '/workspace/specialist-ops', roles: ['specialist', 'admin'] },
  { label: 'Platform Admin', icon: Settings, path: '/workspace/platform-admin', roles: ['admin'] },
  { label: 'Content & Knowledge', icon: BookOpen, path: '/workspace/content-ops', roles: ['admin', 'specialist'] },
  { label: 'Fulfilment Workflows', icon: Layers, path: '/workspace/fulfilment', roles: ['owner', 'specialist', 'admin'] },
  { label: 'Specialist Requests', icon: AlertTriangle, path: '/workspace/specialist-requests', roles: ['specialist', 'admin'] },
  { label: 'Governance & Oversight', icon: Shield, path: '/workspace/governance', roles: ['admin', 'executive'] },
  { label: 'Advanced AI Ops', icon: Zap, path: '/workspace/advanced-ops', roles: ['specialist', 'admin'] },
  { label: 'Risk & Compliance', icon: AlertTriangle, path: '/workspace/risk-compliance', roles: ['admin', 'executive'] },
  { label: 'Executive Overview', icon: BarChart3, path: '/workspace/executive', roles: ['executive', 'admin'] },
  { label: 'Specialist Workspaces', icon: Users, path: '/workspace/specialist-workspaces', roles: ['specialist', 'admin'] },
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
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
            <div className="text-sm font-bold text-gray-900">DIA AI Hub</div>
            <div className="text-xs text-gray-500">DigitalQatalyst</div>
          </button>
        )}
      </div>

      {/* User badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColors[user.role]}`}>
            {roleOptions.find(r => r.value === user.role)?.label}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? 'bg-[#0f1f5c] text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-200 p-2 space-y-0.5">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
          title={collapsed ? 'Back to Home' : undefined}
        >
          <ChevronLeft className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Back to Home</span>}
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
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
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 relative ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg p-1 shadow-sm hover:bg-gray-50 transition-all z-10"
          style={{ right: '-12px' }}
        >
          {collapsed ? <ChevronRight className="h-3 w-3 text-gray-500" /> : <ChevronLeft className="h-3 w-3 text-gray-500" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
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
