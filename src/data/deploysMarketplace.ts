import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'industrialization',
    label: 'Industrialization',
    description: 'Versioned components and lifecycle management tools',
    type: 'insight'
  },
  {
    id: 'tracking',
    label: 'Tracking & Registry',
    description: 'Experiment tracking and model registry capabilities',
    type: 'insight'
  },
  {
    id: 'quality',
    label: 'Quality Assurance',
    description: 'Testing, evaluation, and quality control tools',
    type: 'insight'
  },
  {
    id: 'operations',
    label: 'Operations',
    description: 'Operational management and deployment tools',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'AIOps Build Library Overview',
    summary: 'Comprehensive library of versioned prompts, agents, workflows, and evaluation templates for rapid AI deployment.',
    contentUrl: '/deploys/industrialization/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['build-library', 'versioning', 'components'],
    topic: ['Tools'],
    audience: ['Developer', 'Architect'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 15
  },
  {
    id: '2',
    type: 'insight',
    title: 'Experiment Tracking Best Practices',
    summary: 'Guidelines for comprehensive tracking, reproducibility, and approval workflows for AI experiments and models.',
    contentUrl: '/deploys/tracking/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['experiment-tracking', 'reproducibility', 'mlops'],
    topic: ['Tools'],
    audience: ['Developer', 'Data Scientist'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 20
  },
  {
    id: '3',
    type: 'insight',
    title: 'MLOps Lifecycle Management Guide',
    summary: 'End-to-end guide for model training, versioning, deployment, and management in production environments.',
    contentUrl: '/deploys/industrialization/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['mlops', 'lifecycle', 'deployment'],
    topic: ['Tools'],
    audience: ['Developer', 'Data Scientist'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 25
  },
  {
    id: '4',
    type: 'insight',
    title: 'Conversational AI Deployment Patterns',
    summary: 'Governed lifecycle management patterns for conversational AI and chatbot deployments at scale.',
    contentUrl: '/deploys/industrialization/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['botops', 'conversational-ai', 'chatbots'],
    topic: ['Agents', 'Tools'],
    audience: ['Developer'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 18
  },
  {
    id: '5',
    type: 'insight',
    title: 'Agent Lifecycle Governance Framework',
    summary: 'Comprehensive framework for end-to-end lifecycle governance of autonomous AI agents in enterprise environments.',
    contentUrl: '/deploys/industrialization/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['agentops', 'agents', 'governance'],
    topic: ['Agents'],
    audience: ['Developer', 'Architect'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 22
  },
  {
    id: '6',
    type: 'insight',
    title: 'Prompt Management & Release Pipeline',
    summary: 'Version-controlled prompt management with automated release pipelines, testing, and rollback capabilities.',
    contentUrl: '/deploys/industrialization/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['promptops', 'versioning', 'pipeline'],
    topic: ['Tools'],
    audience: ['Developer'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 16
  },
  {
    id: '7',
    type: 'insight',
    title: 'RAG System Evaluation Framework',
    summary: 'Build and manage comprehensive evaluation test sets for retrieval-augmented generation systems.',
    contentUrl: '/deploys/quality/7',
    publishedAt: '2024-03-09',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['rag', 'evaluation', 'testing'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer', 'Data Scientist'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 20
  },
  {
    id: '8',
    type: 'insight',
    title: 'Digital Twin Operations Management',
    summary: 'Operational management framework for digital twins across the enterprise with monitoring and governance.',
    contentUrl: '/deploys/operations/8',
    publishedAt: '2024-03-08',
    ownerTeam: 'Platform',
    source: 'Internal',
    status: 'Live',
    tags: ['digital-twin', 'operations', 'monitoring'],
    topic: ['Tools'],
    audience: ['Developer', 'Architect'],
    theme: 'Deploys',
    stage: 'Deploy',
    readTimeMins: 24
  }
];
