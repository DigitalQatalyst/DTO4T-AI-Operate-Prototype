export type UserRole = 'employee' | 'manager' | 'owner' | 'specialist' | 'admin' | 'executive';

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
