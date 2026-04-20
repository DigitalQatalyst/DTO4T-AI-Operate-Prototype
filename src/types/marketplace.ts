export interface MarketplaceItem {
  id: string;
  type: 'update' | 'release' | 'regulatory' | 'risk' | 'insight' | 'dco_brief' | 'use_case' | 'industry' | 
        'self_service' | 'orchestration' | 'monitoring' | 'value_tracking' | 'incident' | 'audit' | 'finops' | 'prompt_library';
  title: string;
  summary: string;
  contentUrl: string;
  publishedAt: string;
  ownerTeam: string;
  source: 'Internal' | 'External';
  status: 'Approved' | 'Archived' | 'Live';
  tags: string[];
  topic: string[];
  audience: string[];
  // optional by type
  updateType?: string;
  impact?: 'Low' | 'Medium' | 'High';
  vendor?: string;
  modelFamily?: string;
  recommendation?: 'Approved' | 'Pilot' | 'Not Approved';
  region?: string;
  policyImpacted?: string[];
  actionRequired?: boolean;
  riskCategory?: string;
  severity?: 'Critical' | 'High' | 'Normal';
  theme?: string;
  stage?: 'Discern' | 'Design' | 'Deploy' | 'Drive';
  readTimeMins?: number;
  function?: string;
  pattern?: string;
  maturity?: string;
  valueBand?: string;
  industry?: string;
  horizon?: string;
}

export interface TabConfig {
  id: string;
  label: string;
  description: string;
  type: MarketplaceItem['type'];
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect: boolean;
}
