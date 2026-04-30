# Design Document

## Overview

The S02 Application & Account Experience feature implements a comprehensive role-based workspace system that provides tailored interfaces for six distinct user personas. Each role receives a customized navigation structure, dashboard views, and workflow access aligned to their responsibilities in the AI governance and delivery lifecycle.

The system builds upon the existing workspace infrastructure (WorkspaceApp, WorkspaceLayout) and extends it with optimized navigation configurations, new page components for role-specific tabs, and enhanced workflow state management.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Public Marketing Site                    │
│                    (Index, Marketplaces)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │    Login    │
                    └──────┬──────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    WorkspaceApp Router                       │
│              (Role Detection & Route Guard)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │  WorkspaceLayout    │
                │  (Role-Based Nav)   │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
   │ Common  │      │   Role    │     │ Workflow  │
   │  Pages  │      │ Specific  │     │  Pages    │
   │         │      │   Pages   │     │           │
   └─────────┘      └───────────┘     └───────────┘
```

### Component Hierarchy

```
App
└── WorkspaceApp
    ├── WorkspaceLayout (Navigation & Shell)
    │   ├── Sidebar (Role-filtered navigation)
    │   ├── TopBar (Breadcrumbs, notifications, role switcher)
    │   └── Main Content Area
    │       └── Route-based Page Components
    │           ├── Common Pages (All Roles)
    │           │   ├── WorkspaceHub (Dashboard)
    │           │   ├── AIOpportunityWorkflow
    │           │   ├── AIRequestWorkflow
    │           │   ├── ProfileAccount
    │           │   └── ProgressValue
    │           ├── Business User Pages
    │           │   ├── AIDiscovery
    │           │   ├── MySavedItems
    │           │   └── SupportAccess
    │           ├── Manager Pages
    │           │   ├── TeamDashboard
    │           │   ├── TeamOpportunities
    │           │   ├── PendingApprovals
    │           │   ├── RequestReview
    │           │   ├── TeamProgress
    │           │   ├── TeamPerformance
    │           │   ├── ResourcePlanning
    │           │   └── Escalations
    │           ├── Service Owner Pages
    │           │   ├── ServiceDashboard
    │           │   ├── ServiceRequests
    │           │   ├── WorkflowStatus
    │           │   ├── FulfillmentCoordination
    │           │   ├── ServicePerformance
    │           │   └── ServiceCatalog
    │           ├── Specialist Pages
    │           │   ├── WorkQueue
    │           │   ├── IncomingNeeds
    │           │   ├── SolutionPathways
    │           │   ├── ExecutionTasks
    │           │   ├── OperationalUpdates
    │           │   └── KnowledgeBase
    │           ├── Admin Pages
    │           │   ├── AdminDashboard
    │           │   ├── UserAccess
    │           │   ├── GovernanceControls
    │           │   ├── PolicyChecks
    │           │   ├── OversightActions
    │           │   ├── AuditLogs
    │           │   └── SystemConfiguration
    │           └── Executive Pages
    │               ├── ExecutiveDashboard
    │               ├── AIDemandOverview
    │               ├── PortfolioVisibility
    │               ├── GovernanceStatus
    │               ├── ValueTracking
    │               └── StrategicInsights
    └── Shared Components
        ├── StatusBadge
        ├── PageHeader
        ├── DataTable
        ├── MetricCard
        ├── WorkflowTimeline
        └── ActionButton
```

## Components and Interfaces

### 1. Navigation Configuration

**File:** `src/components/workspace/WorkspaceLayout.tsx` (Update)

The navigation configuration will be restructured to provide optimized tab sets for each role:

```typescript
interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
  badge?: string; // Optional notification badge
}

const navItems: NavItem[] = [
  // Common tabs (all roles)
  { label: 'Workspace', icon: LayoutDashboard, path: '/workspace', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'AI Opportunity', icon: Lightbulb, path: '/workspace/opportunity', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'AI Request', icon: FileText, path: '/workspace/request', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'Profile & Account', icon: User, path: '/workspace/profile', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  { label: 'Progress & Value', icon: TrendingUp, path: '/workspace/progress', roles: ['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] },
  
  // Business User specific
  { label: 'AI Discovery', icon: Search, path: '/workspace/discovery', roles: ['employee'] },
  { label: 'My Saved Items', icon: Bookmark, path: '/workspace/saved', roles: ['employee'] },
  { label: 'Support Access', icon: HelpCircle, path: '/workspace/support', roles: ['employee'] },
  
  // Manager specific
  { label: 'Team Dashboard', icon: Users, path: '/workspace/team-dashboard', roles: ['manager'] },
  { label: 'Team Opportunities', icon: Lightbulb, path: '/workspace/team-opportunities', roles: ['manager'] },
  { label: 'Pending Approvals', icon: CheckSquare, path: '/workspace/approvals', roles: ['manager'] },
  { label: 'Request Review', icon: FileSearch, path: '/workspace/request-review', roles: ['manager'] },
  { label: 'Team Progress', icon: Activity, path: '/workspace/team-progress', roles: ['manager'] },
  { label: 'Team Performance', icon: BarChart2, path: '/workspace/team-performance', roles: ['manager'] },
  { label: 'Resource Planning', icon: Calendar, path: '/workspace/resource-planning', roles: ['manager'] },
  { label: 'Escalations', icon: AlertCircle, path: '/workspace/escalations', roles: ['manager'] },
  
  // Service Owner specific
  { label: 'Service Dashboard', icon: Briefcase, path: '/workspace/service-dashboard', roles: ['owner'] },
  { label: 'Service Requests', icon: Inbox, path: '/workspace/service-requests', roles: ['owner'] },
  { label: 'Workflow Status', icon: GitBranch, path: '/workspace/workflow-status', roles: ['owner'] },
  { label: 'Fulfillment Coordination', icon: Layers, path: '/workspace/fulfillment', roles: ['owner'] },
  { label: 'Service Performance', icon: TrendingUp, path: '/workspace/service-performance', roles: ['owner'] },
  { label: 'Service Catalog', icon: Package, path: '/workspace/service-catalog', roles: ['owner'] },
  
  // Specialist specific
  { label: 'Work Queue', icon: ListTodo, path: '/workspace/work-queue', roles: ['specialist'] },
  { label: 'Incoming Needs', icon: Download, path: '/workspace/incoming-needs', roles: ['specialist'] },
  { label: 'Solution Pathways', icon: Map, path: '/workspace/solution-pathways', roles: ['specialist'] },
  { label: 'Execution Tasks', icon: CheckCircle, path: '/workspace/execution-tasks', roles: ['specialist'] },
  { label: 'Operational Updates', icon: Radio, path: '/workspace/operational-updates', roles: ['specialist'] },
  { label: 'Knowledge Base', icon: BookOpen, path: '/workspace/knowledge-base', roles: ['specialist'] },
  
  // Admin specific
  { label: 'Admin Dashboard', icon: Settings, path: '/workspace/admin-dashboard', roles: ['admin'] },
  { label: 'User Access', icon: UserCog, path: '/workspace/user-access', roles: ['admin'] },
  { label: 'Governance Controls', icon: Shield, path: '/workspace/governance-controls', roles: ['admin'] },
  { label: 'Policy Checks', icon: FileCheck, path: '/workspace/policy-checks', roles: ['admin'] },
  { label: 'Oversight Actions', icon: Eye, path: '/workspace/oversight-actions', roles: ['admin'] },
  { label: 'Audit Logs', icon: FileText, path: '/workspace/audit-logs', roles: ['admin'] },
  { label: 'System Configuration', icon: Sliders, path: '/workspace/system-config', roles: ['admin'] },
  
  // Executive specific
  { label: 'Executive Dashboard', icon: BarChart3, path: '/workspace/executive-dashboard', roles: ['executive'] },
  { label: 'AI Demand Overview', icon: TrendingUp, path: '/workspace/ai-demand', roles: ['executive'] },
  { label: 'Portfolio Visibility', icon: FolderKanban, path: '/workspace/portfolio', roles: ['executive'] },
  { label: 'Governance Status', icon: Shield, path: '/workspace/governance-status', roles: ['executive'] },
  { label: 'Value Tracking', icon: DollarSign, path: '/workspace/value-tracking', roles: ['executive'] },
  { label: 'Strategic Insights', icon: Lightbulb, path: '/workspace/strategic-insights', roles: ['executive'] },
];
```

### 2. Route Configuration

**File:** `src/pages/WorkspaceApp.tsx` (Update)

```typescript
<Routes>
  {/* Common routes */}
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
```

## Data Models

### Extended Type Definitions

**File:** `src/types/workspace.ts` (Update)

```typescript
// Existing types remain...

// Team-related types for Manager role
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  activeOpportunities: number;
  activeRequests: number;
  workload: 'Low' | 'Medium' | 'High';
}

export interface TeamMetrics {
  totalOpportunities: number;
  totalRequests: number;
  completionRate: number;
  averageTimeToComplete: number;
  valueDelivered: number;
}

export interface Approval {
  id: string;
  type: 'opportunity' | 'request' | 'resource';
  itemId: string;
  itemTitle: string;
  submittedBy: string;
  submittedAt: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedCost?: number;
  estimatedDuration?: string;
  justification: string;
}

export interface Escalation {
  id: string;
  relatedItemId: string;
  relatedItemType: 'opportunity' | 'request';
  title: string;
  description: string;
  raisedBy: string;
  raisedAt: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
}

// Service-related types for Service Owner role
export interface ServiceRequest {
  id: string;
  requestId: string;
  serviceType: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: RequestState;
  assignedTo?: string;
  estimatedCompletion?: string;
  slaStatus: 'On Track' | 'At Risk' | 'Breached';
}

export interface ServiceMetrics {
  totalRequests: number;
  inProgress: number;
  completed: number;
  slaCompliance: number;
  averageDeliveryTime: number;
  customerSatisfaction: number;
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: string;
  requiresApproval: boolean;
  governanceLevel: 'Low' | 'Medium' | 'High';
  template?: string;
}

// Specialist-related types
export interface Task {
  id: string;
  requestId: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'Not Started' | 'In Progress' | 'Blocked' | 'Completed';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies: string[];
}

export interface SolutionPathway {
  id: string;
  name: string;
  category: string;
  description: string;
  architecture: string;
  technologies: string[];
  estimatedComplexity: 'Low' | 'Medium' | 'High';
  documentationUrl?: string;
}

// Admin-related types
export interface UserAccount {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  createdAt: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  enabled: boolean;
  conditions: Record<string, any>;
  actions: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
}

// Executive-related types
export interface PortfolioItem {
  id: string;
  title: string;
  type: 'opportunity' | 'request' | 'initiative';
  businessUnit: string;
  status: string;
  investment: number;
  expectedValue: number;
  realizedValue: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  startDate: string;
  targetCompletionDate: string;
}

export interface StrategicMetric {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

export interface SavedItem {
  id: string;
  type: 'opportunity' | 'pathway' | 'resource' | 'service';
  itemId: string;
  title: string;
  description: string;
  savedAt: string;
  tags: string[];
}
```

### Mock Data Services

**File:** `src/services/workspaceData.ts` (New)

```typescript
// Service layer for fetching workspace data
// Initially uses mock data, can be replaced with API calls

export const workspaceDataService = {
  // Team data for managers
  getTeamMembers: async (managerId: string): Promise<TeamMember[]> => { /* mock */ },
  getTeamMetrics: async (managerId: string): Promise<TeamMetrics> => { /* mock */ },
  getPendingApprovals: async (managerId: string): Promise<Approval[]> => { /* mock */ },
  getEscalations: async (managerId: string): Promise<Escalation[]> => { /* mock */ },
  
  // Service data for owners
  getServiceRequests: async (ownerId: string): Promise<ServiceRequest[]> => { /* mock */ },
  getServiceMetrics: async (serviceId: string): Promise<ServiceMetrics> => { /* mock */ },
  getServiceCatalog: async (): Promise<ServiceCatalogItem[]> => { /* mock */ },
  
  // Specialist data
  getWorkQueue: async (specialistId: string): Promise<Task[]> => { /* mock */ },
  getSolutionPathways: async (): Promise<SolutionPathway[]> => { /* mock */ },
  
  // Admin data
  getUserAccounts: async (): Promise<UserAccount[]> => { /* mock */ },
  getPolicyRules: async (): Promise<PolicyRule[]> => { /* mock */ },
  getAuditLogs: async (filters: any): Promise<AuditLogEntry[]> => { /* mock */ },
  
  // Executive data
  getPortfolio: async (): Promise<PortfolioItem[]> => { /* mock */ },
  getStrategicMetrics: async (): Promise<StrategicMetric[]> => { /* mock */ },
  
  // Common data
  getSavedItems: async (userId: string): Promise<SavedItem[]> => { /* mock */ },
};
```

## Error Handling

### Error Boundaries

Implement error boundaries at the workspace level to catch and display errors gracefully:

```typescript
// src/components/workspace/WorkspaceErrorBoundary.tsx
class WorkspaceErrorBoundary extends React.Component {
  // Catches errors in workspace pages
  // Displays user-friendly error message
  // Logs error for debugging
}
```

### Loading States

All data-fetching pages will implement consistent loading states:

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<T | null>(null);
```

### Permission Errors

When users attempt to access routes not permitted for their role:

```typescript
// Redirect to workspace home with toast notification
if (!hasPermission(user.role, requestedPath)) {
  toast.error('You do not have permission to access this page');
  navigate('/workspace');
}
```

## Testing Strategy

### Unit Tests

- Test navigation filtering logic for each role
- Test data transformation functions
- Test permission checking utilities
- Test workflow state transitions

### Integration Tests

- Test role-based route access
- Test navigation visibility for each role
- Test data flow from service layer to components
- Test workflow progression through multiple states

### E2E Tests

- Test complete user journeys for each role
- Test role switching functionality
- Test approval workflows end-to-end
- Test cross-role interactions (e.g., manager approving employee request)

### Accessibility Tests

- Keyboard navigation through workspace
- Screen reader compatibility for all pages
- ARIA labels for interactive elements
- Color contrast compliance

## Performance Considerations

### Code Splitting

Implement route-based code splitting to reduce initial bundle size:

```typescript
const TeamDashboard = lazy(() => import('./pages/workspace/TeamDashboard'));
const ServiceDashboard = lazy(() => import('./pages/workspace/ServiceDashboard'));
// etc.
```

### Data Caching

Use React Query for data caching and background refetching:

```typescript
const { data, isLoading } = useQuery(
  ['teamMetrics', managerId],
  () => workspaceDataService.getTeamMetrics(managerId),
  { staleTime: 5 * 60 * 1000 } // 5 minutes
);
```

### Optimistic Updates

For approval actions and status changes, implement optimistic UI updates:

```typescript
const mutation = useMutation(approveRequest, {
  onMutate: async (requestId) => {
    // Optimistically update UI
  },
  onError: (err, variables, context) => {
    // Rollback on error
  },
});
```

## Security Considerations

### Role-Based Access Control

- Server-side validation of user roles (when API is implemented)
- Client-side route guards as UX enhancement
- Token-based authentication with role claims

### Data Filtering

- Ensure users only see data they have permission to access
- Filter team data based on organizational hierarchy
- Mask sensitive information based on role

### Audit Logging

- Log all approval actions
- Log role switches
- Log access to sensitive pages (admin, executive)

## Migration Strategy

### Phase 1: Navigation Optimization

- Update WorkspaceLayout with new navigation structure
- Ensure existing pages remain functional
- Test role-based filtering

### Phase 2: New Page Components

- Create placeholder pages for all new routes
- Implement basic layouts with PageHeader
- Add to routing configuration

### Phase 3: Data Integration

- Implement mock data services
- Connect pages to data services
- Add loading and error states

### Phase 4: Feature Completion

- Implement full functionality for each page
- Add interactive elements (approvals, filters, actions)
- Implement workflow state management

### Phase 5: Polish & Testing

- Add animations and transitions
- Comprehensive testing
- Performance optimization
- Accessibility audit
