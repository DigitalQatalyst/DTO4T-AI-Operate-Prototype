import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'regulatory-changes',
    label: 'Regulatory Changes',
    description: 'New regulations, policy updates, and compliance requirements affecting AI',
    type: 'regulatory'
  },
  {
    id: 'risk-alerts',
    label: 'Risk Alerts',
    description: 'Security vulnerabilities, privacy concerns, and operational risks',
    type: 'risk'
  },
  {
    id: 'compliance-updates',
    label: 'Compliance Updates',
    description: 'Changes to compliance frameworks and audit requirements',
    type: 'regulatory'
  },
  {
    id: 'incident-reports',
    label: 'Incident Reports',
    description: 'Industry incidents, lessons learned, and mitigation strategies',
    type: 'risk'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'regulatory',
    title: 'EU AI Act: Final Implementation Guidelines Released',
    summary: 'European Commission publishes detailed implementation guidelines for the AI Act with compliance deadlines and requirements.',
    contentUrl: '/risk-regulatory/regulatory/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Risk',
    source: 'External',
    status: 'Approved',
    tags: ['eu-ai-act', 'regulation', 'compliance'],
    topic: ['Governance', 'Security'],
    audience: ['Leader', 'Risk'],
    region: 'EU',
    actionRequired: true,
    policyImpacted: ['AI Governance Policy', 'Risk Management Framework'],
    readTimeMins: 12
  },
  {
    id: '2',
    type: 'risk',
    title: 'Critical: Prompt Injection Vulnerability in LLM APIs',
    summary: 'New attack vector discovered allowing malicious prompts to bypass safety controls in major LLM providers.',
    contentUrl: '/risk-regulatory/risk/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'Risk',
    source: 'External',
    status: 'Approved',
    tags: ['security', 'vulnerability', 'prompt-injection'],
    topic: ['Security'],
    audience: ['Developer', 'Risk'],
    riskCategory: 'Security',
    severity: 'Critical',
    actionRequired: true,
    readTimeMins: 8
  },
  {
    id: '3',
    type: 'regulatory',
    title: 'US Executive Order on AI Safety Standards',
    summary: 'New executive order establishes mandatory safety testing and reporting requirements for AI systems.',
    contentUrl: '/risk-regulatory/regulatory/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Risk',
    source: 'External',
    status: 'Approved',
    tags: ['us-regulation', 'safety', 'standards'],
    topic: ['Governance', 'Security'],
    audience: ['Leader', 'Risk'],
    region: 'US',
    actionRequired: true,
    readTimeMins: 10
  },
  {
    id: '4',
    type: 'risk',
    title: 'Data Privacy Risk: Model Training on Sensitive Data',
    summary: 'Advisory on risks of inadvertently training models on personally identifiable information (PII).',
    contentUrl: '/risk-regulatory/risk/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Approved',
    tags: ['privacy', 'pii', 'data-protection'],
    topic: ['Security', 'Governance'],
    audience: ['Developer', 'Risk'],
    riskCategory: 'Privacy',
    severity: 'High',
    actionRequired: true,
    readTimeMins: 7
  },
  {
    id: '5',
    type: 'regulatory',
    title: 'GDPR AI Guidance: Automated Decision-Making Rules',
    summary: 'Updated GDPR guidance on automated decision-making and profiling using AI systems.',
    contentUrl: '/risk-regulatory/regulatory/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Risk',
    source: 'External',
    status: 'Approved',
    tags: ['gdpr', 'privacy', 'automated-decisions'],
    topic: ['Governance', 'Security'],
    audience: ['Risk', 'Leader'],
    region: 'EU',
    policyImpacted: ['Privacy Policy', 'AI Governance Policy'],
    readTimeMins: 9
  },
  {
    id: '6',
    type: 'risk',
    title: 'Model Poisoning Attack: Supply Chain Risks',
    summary: 'Alert on risks of compromised training data and models from third-party sources.',
    contentUrl: '/risk-regulatory/risk/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Approved',
    tags: ['supply-chain', 'model-poisoning', 'security'],
    topic: ['Security'],
    audience: ['Developer', 'Risk'],
    riskCategory: 'Security',
    severity: 'High',
    readTimeMins: 6
  }
];
