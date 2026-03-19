import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'enterprise-updates',
    label: 'Enterprise AI Updates',
    description: 'Latest AI platform updates, tool releases, and capability announcements',
    type: 'update'
  },
  {
    id: 'model-releases',
    label: 'Model Release Briefings',
    description: 'New model releases with recommendations and use case guidance',
    type: 'release'
  },
  {
    id: 'regulatory-alerts',
    label: 'Regulatory Alerts',
    description: 'Policy changes, compliance requirements, and regulatory updates',
    type: 'regulatory'
  },
  {
    id: 'risk-advisories',
    label: 'Risk Advisories',
    description: 'Security alerts, privacy concerns, and risk mitigation guidance',
    type: 'risk'
  },
  {
    id: 'transformation-insights',
    label: 'AI Transformation Insights',
    description: 'Strategic guidance on AI adoption, governance, and organizational change',
    type: 'insight'
  },
  {
    id: 'dco-briefs',
    label: 'DCO Intelligence Briefs',
    description: 'Digital Cognitive Organization insights and decision quality frameworks',
    type: 'dco_brief'
  },
  {
    id: 'use-cases',
    label: 'Enterprise Use Cases',
    description: 'Real-world AI implementations across business functions',
    type: 'use_case'
  },
  {
    id: 'industry-analysis',
    label: 'Industry Analysis',
    description: 'Market trends, competitive intelligence, and industry-specific insights',
    type: 'industry'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'update',
    title: 'New AI Copilot Features Released for Enterprise Users',
    summary: 'Enhanced context awareness and improved response quality now available across all copilot interfaces.',
    contentUrl: '/discern/updates/1',
    publishedAt: '2024-03-10',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['copilot', 'features', 'enhancement'],
    topic: ['Tools', 'Adoption'],
    audience: ['Employee', 'Manager'],
    updateType: 'Platform Update',
    impact: 'High'
  },
  {
    id: '2',
    type: 'release',
    title: 'GPT-4 Turbo: Performance and Cost Improvements',
    summary: 'OpenAI releases GPT-4 Turbo with 3x faster response times and 50% cost reduction.',
    contentUrl: '/discern/releases/2',
    publishedAt: '2024-03-09',
    ownerTeam: 'Architecture',
    source: 'External',
    status: 'Approved',
    tags: ['gpt-4', 'openai', 'model-release'],
    topic: ['LLM'],
    audience: ['Developer', 'Leader'],
    vendor: 'OpenAI',
    modelFamily: 'GPT',
    recommendation: 'Approved',
    readTimeMins: 5
  },
  {
    id: '3',
    type: 'regulatory',
    title: 'EU AI Act: New Compliance Requirements for High-Risk AI Systems',
    summary: 'Updated guidelines require additional documentation and risk assessments for AI systems classified as high-risk.',
    contentUrl: '/discern/regulatory/3',
    publishedAt: '2024-03-08',
    ownerTeam: 'Risk',
    source: 'External',
    status: 'Approved',
    tags: ['compliance', 'eu', 'regulation'],
    topic: ['Governance', 'Security'],
    audience: ['Leader', 'Risk'],
    region: 'EU',
    actionRequired: true,
    policyImpacted: ['AI Governance Policy', 'Risk Management Framework']
  },
  {
    id: '4',
    type: 'risk',
    title: 'Critical: Data Leakage Risk in Public LLM Interfaces',
    summary: 'Security advisory on preventing sensitive data exposure when using public AI interfaces.',
    contentUrl: '/discern/risk/4',
    publishedAt: '2024-03-07',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Approved',
    tags: ['security', 'data-privacy', 'llm'],
    topic: ['Security'],
    audience: ['Developer', 'Risk'],
    riskCategory: 'Privacy',
    severity: 'Critical',
    actionRequired: true
  },
  {
    id: '5',
    type: 'insight',
    title: 'Building a Governance-First AI Adoption Strategy',
    summary: 'Framework for implementing AI with built-in governance, risk controls, and measurable outcomes.',
    contentUrl: '/discern/insights/5',
    publishedAt: '2024-03-06',
    ownerTeam: 'Governance',
    source: 'Internal',
    status: 'Approved',
    tags: ['strategy', 'governance', 'adoption'],
    topic: ['Governance', 'Adoption'],
    audience: ['Leader'],
    theme: 'Strategy',
    stage: 'Discern',
    readTimeMins: 12
  },
  {
    id: '6',
    type: 'dco_brief',
    title: 'Man + Machine Collaboration: Decision Quality Framework',
    summary: 'How to structure human-AI collaboration for optimal decision-making outcomes.',
    contentUrl: '/discern/dco/6',
    publishedAt: '2024-03-05',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['dco', 'decision-quality', 'collaboration'],
    topic: ['Governance'],
    audience: ['Leader', 'Manager'],
    theme: 'Man+Machine',
    readTimeMins: 8
  },
  {
    id: '7',
    type: 'use_case',
    title: 'HR: AI-Powered Candidate Screening and Interview Scheduling',
    summary: 'Automated candidate evaluation and scheduling system reducing time-to-hire by 40%.',
    contentUrl: '/discern/use-cases/7',
    publishedAt: '2024-03-04',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['hr', 'recruitment', 'automation'],
    topic: ['Agents', 'Adoption'],
    audience: ['Manager'],
    function: 'HR',
    pattern: 'Agent',
    maturity: 'Live',
    valueBand: 'High'
  },
  {
    id: '8',
    type: 'industry',
    title: 'Public Sector AI Adoption: Trends and Challenges',
    summary: 'Analysis of AI implementation patterns in government and public sector organizations.',
    contentUrl: '/discern/industry/8',
    publishedAt: '2024-03-03',
    ownerTeam: 'Other',
    source: 'External',
    status: 'Approved',
    tags: ['public-sector', 'government', 'trends'],
    topic: ['Adoption'],
    audience: ['Leader'],
    industry: 'Public Sector',
    horizon: 'Now',
    readTimeMins: 15
  }
];
