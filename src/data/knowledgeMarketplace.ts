import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'policies',
    label: 'Policies & Guidelines',
    description: 'Enterprise AI policies, standards, and governance guidelines',
    type: 'regulatory'
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    description: 'Proven patterns and best practices for AI implementation',
    type: 'insight'
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    description: 'Real-world AI implementation examples and lessons learned',
    type: 'use_case'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Technical documentation, guides, and reference materials',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'regulatory',
    title: 'Enterprise AI Acceptable Use Policy',
    summary: 'Official policy defining acceptable and prohibited uses of AI tools and systems across the organization.',
    contentUrl: '/knowledge/policies/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Governance',
    source: 'Internal',
    status: 'Approved',
    tags: ['policy', 'acceptable-use', 'governance'],
    topic: ['Governance'],
    audience: ['Employee', 'Manager', 'Leader'],
    policyImpacted: ['AI Governance Policy'],
    readTimeMins: 10
  },
  {
    id: '2',
    type: 'insight',
    title: 'Prompt Engineering Best Practices Guide',
    summary: 'Comprehensive guide to writing effective prompts with examples, patterns, and anti-patterns.',
    contentUrl: '/knowledge/best-practices/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['prompts', 'best-practices', 'guide'],
    topic: ['Tools', 'Adoption'],
    audience: ['Employee', 'Developer'],
    theme: 'Best Practices',
    readTimeMins: 15
  },
  {
    id: '3',
    type: 'use_case',
    title: 'HR: AI-Powered Recruitment Case Study',
    summary: 'How the HR team reduced time-to-hire by 40% using AI-powered candidate screening and interview scheduling.',
    contentUrl: '/knowledge/case-studies/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['hr', 'recruitment', 'case-study'],
    topic: ['Adoption', 'Agents'],
    audience: ['Manager', 'Leader'],
    function: 'HR',
    valueBand: 'High',
    readTimeMins: 12
  },
  {
    id: '4',
    type: 'insight',
    title: 'RAG System Implementation Guide',
    summary: 'Step-by-step technical guide for building and deploying retrieval-augmented generation systems.',
    contentUrl: '/knowledge/documentation/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['rag', 'implementation', 'technical'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer'],
    theme: 'Documentation',
    readTimeMins: 20
  },
  {
    id: '5',
    type: 'regulatory',
    title: 'Data Privacy Guidelines for AI Projects',
    summary: 'Guidelines for handling sensitive data in AI projects, including PII protection and data minimization.',
    contentUrl: '/knowledge/policies/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Approved',
    tags: ['privacy', 'data-protection', 'guidelines'],
    topic: ['Governance', 'Security'],
    audience: ['Developer', 'Risk'],
    policyImpacted: ['Privacy Policy', 'Data Governance Policy'],
    readTimeMins: 8
  },
  {
    id: '6',
    type: 'insight',
    title: 'AI Agent Design Patterns',
    summary: 'Common design patterns for building autonomous AI agents including ReAct, Plan-and-Execute, and more.',
    contentUrl: '/knowledge/best-practices/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['agents', 'design-patterns', 'architecture'],
    topic: ['Agents', 'Tools'],
    audience: ['Developer'],
    theme: 'Best Practices',
    readTimeMins: 18
  }
];
