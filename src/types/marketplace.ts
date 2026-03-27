export type TabId =
  | 'enterprise-ai-updates'
  | 'model-release-briefings'
  | 'regulatory-alerts'
  | 'risk-advisories'
  | 'ai-transformation-insights'
  | 'dco-intelligence-briefs'
  | 'enterprise-use-cases'
  | 'industry-analysis';

export interface TabConfig {
  id: TabId;
  label: string;
  infoText: string;
  searchPlaceholder: string;
  type: MarketplaceItem['type'];
}

export interface MarketplaceItem {
  id: string;
  type: 'update' | 'release' | 'regulatory' | 'risk' | 'insight' | 'dco_brief' | 'use_case' | 'industry';
  title: string;
  summary: string;
  contentUrl: string;
  publishedAt: string;
  ownerTeam: string;
  source: 'Internal' | 'External';
  status: 'Approved' | 'Archived';
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
  // detail content
  detailContent?: DetailContent;
}

export interface DetailContent {
  details: ContentBlock[];
  keyTakeaways: string[];
  resources: ResourceLink[];
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'checklist' | 'divider' | 'highlight';
  text?: string;
  items?: string[];
  variant?: 'danger' | 'warning' | 'info';
}

export interface ResourceLink {
  label: string;
  url: string;
  description?: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  name: string;
  options: FilterOption[];
  showOnTabs?: TabId[];
}

export type SortOption = 'most-recent' | 'title-az' | 'recommended' | 'highest-severity';
