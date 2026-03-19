import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'governance-models',
    label: 'AIOps Governance Models',
    description: 'Who owns what, and how decisions are made in AI operations',
    type: 'insight'
  },
  {
    id: 'lifecycle-standards',
    label: 'Lifecycle Standards',
    description: 'Intake → build → release → monitor → retire with clear gates',
    type: 'insight'
  },
  {
    id: 'accountability-frameworks',
    label: 'Accountability Frameworks',
    description: 'Roles, approvals, escalation paths for AI governance',
    type: 'insight'
  },
  {
    id: 'responsible-ai-policies',
    label: 'Responsible AI Policies',
    description: 'Controls for trustworthiness (risk, transparency, compliance)',
    type: 'regulatory'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'Enterprise AI Governance Operating Model',
    summary: 'Comprehensive framework defining roles, responsibilities, and decision-making authority for AI initiatives across the organization.',
    contentUrl: '/aiops-framework/governance/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Governance',
    source: 'Internal',
    status: 'Approved',
    tags: ['governance', 'operating-model', 'roles'],
    topic: ['Governance'],
    audience: ['Leader', 'Manager'],
    theme: 'Governance',
    stage: 'Design',
    readTimeMins: 15
  }
];