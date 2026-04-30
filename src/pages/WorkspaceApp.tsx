import { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import WorkspaceHub from '@/pages/workspace/WorkspaceHub';
import AIOpportunityWorkflow from '@/pages/workspace/AIOpportunityWorkflow';
import AIRequestWorkflow from '@/pages/workspace/AIRequestWorkflow';
import ProfileAccount from '@/pages/workspace/ProfileAccount';
import ProgressValue from '@/pages/workspace/ProgressValue';
import type { UserRole } from '@/types/workspace';

// Business User pages (lazy loaded)
const AIDiscovery = lazy(() => import('@/pages/workspace/AIDiscovery'));
const MySavedItems = lazy(() => import('@/pages/workspace/MySavedItems'));
const SupportAccess = lazy(() => import('@/pages/workspace/SupportAccess'));

// Manager pages (lazy loaded)
const TeamDashboard = lazy(() => import('@/pages/workspace/TeamDashboard'));
const TeamOpportunities = lazy(() => import('@/pages/workspace/TeamOpportunities'));
const PendingApprovals = lazy(() => import('@/pages/workspace/PendingApprovals'));
const RequestReview = lazy(() => import('@/pages/workspace/RequestReview'));
const TeamProgress = lazy(() => import('@/pages/workspace/TeamProgress'));
const TeamPerformance = lazy(() => import('@/pages/workspace/TeamPerformance'));
const ResourcePlanning = lazy(() => import('@/pages/workspace/ResourcePlanning'));
const Escalations = lazy(() => import('@/pages/workspace/Escalations'));

// Service Owner pages (lazy loaded)
const ServiceDashboard = lazy(() => import('@/pages/workspace/ServiceDashboard'));
const ServiceRequests = lazy(() => import('@/pages/workspace/ServiceRequests'));
const WorkflowStatus = lazy(() => import('@/pages/workspace/WorkflowStatus'));
const FulfillmentCoordination = lazy(() => import('@/pages/workspace/FulfillmentCoordination'));
const ServicePerformance = lazy(() => import('@/pages/workspace/ServicePerformance'));
const ServiceCatalog = lazy(() => import('@/pages/workspace/ServiceCatalog'));

// Specialist pages (lazy loaded)
const WorkQueue = lazy(() => import('@/pages/workspace/WorkQueue'));
const IncomingNeeds = lazy(() => import('@/pages/workspace/IncomingNeeds'));
const SolutionPathways = lazy(() => import('@/pages/workspace/SolutionPathways'));
const ExecutionTasks = lazy(() => import('@/pages/workspace/ExecutionTasks'));
const OperationalUpdates = lazy(() => import('@/pages/workspace/OperationalUpdates'));
const KnowledgeBase = lazy(() => import('@/pages/workspace/KnowledgeBase'));

// Admin pages (lazy loaded)
const AdminDashboard = lazy(() => import('@/pages/workspace/AdminDashboard'));
const UserAccess = lazy(() => import('@/pages/workspace/UserAccess'));
const GovernanceControls = lazy(() => import('@/pages/workspace/GovernanceControls'));
const PolicyChecks = lazy(() => import('@/pages/workspace/PolicyChecks'));
const OversightActions = lazy(() => import('@/pages/workspace/OversightActions'));
const AuditLogs = lazy(() => import('@/pages/workspace/AuditLogs'));
const SystemConfiguration = lazy(() => import('@/pages/workspace/SystemConfiguration'));

// Executive pages (lazy loaded)
const ExecutiveDashboard = lazy(() => import('@/pages/workspace/ExecutiveDashboard'));
const AIDemandOverview = lazy(() => import('@/pages/workspace/AIDemandOverview'));
const PortfolioVisibility = lazy(() => import('@/pages/workspace/PortfolioVisibility'));
const GovernanceStatus = lazy(() => import('@/pages/workspace/GovernanceStatus'));
const ValueTracking = lazy(() => import('@/pages/workspace/ValueTracking'));
const StrategicInsights = lazy(() => import('@/pages/workspace/StrategicInsights'));

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'employee', label: 'Business User / Employee' },
  { value: 'manager', label: 'Manager / Team Lead' },
  { value: 'owner', label: 'Service Owner / Business Owner' },
  { value: 'specialist', label: 'Specialist Team' },
  { value: 'admin', label: 'Platform Admin / Governance' },
  { value: 'executive', label: 'Leadership / Executive' },
];

export default function WorkspaceApp() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      navigate('/login', { state: { from: { pathname: '/workspace' } } });
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    localStorage.setItem('currentUser', JSON.stringify(updated));
    setUser(updated);
  };

  if (!user) return null;

  return (
    <WorkspaceLayout user={user} onLogout={handleLogout} onRoleSwitch={handleRoleSwitch}>
      <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-gray-500">Loading...</div></div>}>
        <Routes>
          <Route index element={<WorkspaceHub user={user} />} />
          <Route path="opportunity" element={<AIOpportunityWorkflow />} />
          <Route path="request" element={<AIRequestWorkflow />} />
          <Route path="profile" element={<ProfileAccount user={user} />} />
          <Route path="progress" element={<ProgressValue />} />
          
          {/* Business User routes */}
          <Route path="discovery" element={<AIDiscovery />} />
          <Route path="saved" element={<MySavedItems user={user} />} />
          <Route path="support" element={<SupportAccess />} />
          
          {/* Manager routes */}
          <Route path="team-dashboard" element={<TeamDashboard user={user} />} />
          <Route path="team-opportunities" element={<TeamOpportunities user={user} />} />
          <Route path="approvals" element={<PendingApprovals user={user} />} />
          <Route path="request-review" element={<RequestReview user={user} />} />
          <Route path="team-progress" element={<TeamProgress user={user} />} />
          <Route path="team-performance" element={<TeamPerformance user={user} />} />
          <Route path="resource-planning" element={<ResourcePlanning user={user} />} />
          <Route path="escalations" element={<Escalations user={user} />} />
          
          {/* Service Owner routes */}
          <Route path="service-dashboard" element={<ServiceDashboard user={user} />} />
          <Route path="service-requests" element={<ServiceRequests user={user} />} />
          <Route path="workflow-status" element={<WorkflowStatus user={user} />} />
          <Route path="fulfillment" element={<FulfillmentCoordination user={user} />} />
          <Route path="service-performance" element={<ServicePerformance user={user} />} />
          <Route path="service-catalog" element={<ServiceCatalog />} />
          
          {/* Specialist routes */}
          <Route path="work-queue" element={<WorkQueue user={user} />} />
          <Route path="incoming-needs" element={<IncomingNeeds user={user} />} />
          <Route path="solution-pathways" element={<SolutionPathways />} />
          <Route path="execution-tasks" element={<ExecutionTasks user={user} />} />
          <Route path="operational-updates" element={<OperationalUpdates />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          
          {/* Admin routes */}
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="user-access" element={<UserAccess />} />
          <Route path="governance-controls" element={<GovernanceControls />} />
          <Route path="policy-checks" element={<PolicyChecks />} />
          <Route path="oversight-actions" element={<OversightActions />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="system-config" element={<SystemConfiguration />} />
          
          {/* Executive routes */}
          <Route path="executive-dashboard" element={<ExecutiveDashboard />} />
          <Route path="ai-demand" element={<AIDemandOverview />} />
          <Route path="portfolio" element={<PortfolioVisibility />} />
          <Route path="governance-status" element={<GovernanceStatus />} />
          <Route path="value-tracking" element={<ValueTracking />} />
          <Route path="strategic-insights" element={<StrategicInsights />} />
        </Routes>
      </Suspense>
    </WorkspaceLayout>
  );
}
