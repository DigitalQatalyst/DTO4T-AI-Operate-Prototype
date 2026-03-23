export interface KnowledgeItem {
  id: string;
  type: 'strategy' | 'governance' | 'architecture' | 'playbook';
  title: string;
  summary: string;
  contentUrl: string;
  publishedAt: string;
  lastUpdated: string;
  ownerTeam: string;
  status: 'Draft' | 'Approved' | 'Under Review' | 'Deprecated';
  version: string;
  tags: string[];
  topic: string[];
  audience: string[];
  // optional by type
  documentType?: string;
  approvalLevel?: 'Team' | 'Department' | 'Executive';
  businessFunction?: string;
  maturityLevel?: 'Foundation' | 'Intermediate' | 'Advanced';
  relatedDocs?: string[];
  implementationGuide?: boolean;
  complianceRequired?: boolean;
  reviewCycle?: 'Quarterly' | 'Bi-Annual' | 'Annual';
  readTimeMins?: number;
  downloadUrl?: string;
}

export interface KnowledgeTabConfig {
  id: string;
  label: string;
  description: string;
  type: KnowledgeItem['type'];
}

export interface KnowledgeFilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface KnowledgeFilterGroup {
  id: string;
  label: string;
  options: KnowledgeFilterOption[];
  multiSelect: boolean;
}