import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'architecture',
    label: 'Architecture Blueprints',
    description: 'Pre-built architecture patterns for AI deployments',
    type: 'insight'
  },
  {
    id: 'integration',
    label: 'Integration Patterns',
    description: 'Blueprints for integrating AI with existing systems',
    type: 'insight'
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure Templates',
    description: 'Cloud and on-premise infrastructure blueprints',
    type: 'insight'
  },
  {
    id: 'security',
    label: 'Security Blueprints',
    description: 'Security and compliance architecture patterns',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'RAG System Architecture Blueprint',
    summary: 'Complete architecture blueprint for deploying retrieval-augmented generation systems with vector databases and LLM integration.',
    contentUrl: '/blueprint/architecture/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['rag', 'architecture', 'blueprint'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer', 'Architect'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 30
  },
  {
    id: '2',
    type: 'insight',
    title: 'Multi-Agent System Blueprint',
    summary: 'Architecture pattern for orchestrating multiple AI agents with coordination, communication, and task distribution.',
    contentUrl: '/blueprint/architecture/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['agents', 'orchestration', 'blueprint'],
    topic: ['Agents'],
    audience: ['Developer', 'Architect'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 35
  },
  {
    id: '3',
    type: 'insight',
    title: 'Enterprise LLM Gateway Blueprint',
    summary: 'Centralized gateway architecture for managing multiple LLM providers with routing, rate limiting, and cost control.',
    contentUrl: '/blueprint/integration/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['llm', 'gateway', 'integration'],
    topic: ['Tools', 'LLM'],
    audience: ['Architect', 'Developer'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 28
  },
  {
    id: '4',
    type: 'insight',
    title: 'AI Model Serving Infrastructure',
    summary: 'Scalable infrastructure blueprint for serving AI models with auto-scaling, load balancing, and monitoring.',
    contentUrl: '/blueprint/infrastructure/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['infrastructure', 'serving', 'scalability'],
    topic: ['Tools'],
    audience: ['Architect', 'DevOps'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 32
  },
  {
    id: '5',
    type: 'insight',
    title: 'Zero Trust AI Security Blueprint',
    summary: 'Security architecture implementing zero trust principles for AI systems with authentication, authorization, and audit.',
    contentUrl: '/blueprint/security/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Security',
    source: 'Internal',
    status: 'Approved',
    tags: ['security', 'zero-trust', 'compliance'],
    topic: ['Security', 'Governance'],
    audience: ['Architect', 'Security'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 25
  },
  {
    id: '6',
    type: 'insight',
    title: 'Hybrid Cloud AI Deployment Blueprint',
    summary: 'Architecture for deploying AI workloads across hybrid cloud environments with data residency and compliance.',
    contentUrl: '/blueprint/infrastructure/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['hybrid-cloud', 'deployment', 'infrastructure'],
    topic: ['Tools'],
    audience: ['Architect', 'DevOps'],
    theme: 'Blueprint',
    stage: 'Design',
    readTimeMins: 30
  }
];
