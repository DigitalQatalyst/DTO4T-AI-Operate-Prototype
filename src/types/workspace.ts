export type UserRole = 'employee' | 'manager' | 'owner' | 'specialist' | 'admin' | 'executive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export type OpportunityState =
  | 'Draft'
  | 'Submitted'
  | 'Under Assessment'
  | 'Routed'
  | 'In Progress'
  | 'Completed'
  | 'Closed';

export type RequestState =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Returned'
  | 'In Fulfilment'
  | 'Completed'
  | 'Closed';

export interface AuditEntry {
  timestamp: string;
  action: string;
  actor: string;
  note?: string;
}

export interface AIOpportunity {
  id: string;
  title: string;
  businessArea: string;
  description: string;
  state: OpportunityState;
  submittedBy: string;
  submittedAt: string;
  priority: 'High' | 'Medium' | 'Low';
  feasibilityScore?: number;
  valueScore?: number;
  auditTrail: AuditEntry[];
}

export interface AIRequest {
  id: string;
  title: string;
  serviceType: string;
  businessContext: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  state: RequestState;
  submittedBy: string;
  submittedAt: string;
  governanceLinked: boolean;
  approvalJustification?: string;
  returnReason?: string;
  auditTrail: AuditEntry[];
}

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

// Common types
export interface SavedItem {
  id: string;
  type: 'opportunity' | 'pathway' | 'resource' | 'service';
  itemId: string;
  title: string;
  description: string;
  savedAt: string;
  tags: string[];
}
