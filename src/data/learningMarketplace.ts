import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'learning-paths',
    label: 'Learning Pathways',
    description: 'Structured learning journeys from AI literacy to advanced skills',
    type: 'insight'
  },
  {
    id: 'courses',
    label: 'Courses & Modules',
    description: 'Self-paced courses on AI fundamentals, prompt engineering, and more',
    type: 'insight'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    description: 'Enterprise AI certifications and skill validation programs',
    type: 'insight'
  },
  {
    id: 'workshops',
    label: 'Workshops & Labs',
    description: 'Hands-on workshops and practical labs for skill development',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'AI Literacy Fundamentals - Complete Learning Path',
    summary: 'Comprehensive 4-week learning path covering AI basics, LLMs, RAG, agents, and responsible AI principles.',
    contentUrl: '/learning/paths/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['literacy', 'fundamentals', 'learning-path'],
    topic: ['Adoption'],
    audience: ['Employee', 'Manager'],
    theme: 'Learning',
    stage: 'Discern',
    readTimeMins: 240
  },
  {
    id: '2',
    type: 'insight',
    title: 'Prompt Engineering Mastery Course',
    summary: 'Advanced course on crafting effective prompts, chain-of-thought reasoning, and prompt optimization techniques.',
    contentUrl: '/learning/courses/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['prompt-engineering', 'advanced', 'course'],
    topic: ['Tools', 'Adoption'],
    audience: ['Employee', 'Developer'],
    theme: 'Learning',
    stage: 'Discern',
    readTimeMins: 180
  },
  {
    id: '3',
    type: 'insight',
    title: 'Enterprise AI Practitioner Certification',
    summary: 'Official certification program validating proficiency in enterprise AI tools, governance, and best practices.',
    contentUrl: '/learning/certifications/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['certification', 'practitioner', 'validation'],
    topic: ['Adoption'],
    audience: ['Employee', 'Developer'],
    theme: 'Certification',
    stage: 'Discern',
    readTimeMins: 15
  },
  {
    id: '4',
    type: 'insight',
    title: 'RAG Systems Workshop - Build Your First Application',
    summary: 'Hands-on 2-hour workshop building a retrieval-augmented generation system from scratch.',
    contentUrl: '/learning/workshops/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['rag', 'workshop', 'hands-on'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer'],
    theme: 'Workshop',
    stage: 'Deploy',
    readTimeMins: 120
  },
  {
    id: '5',
    type: 'insight',
    title: 'AI for Leaders - Strategic Decision Making',
    summary: 'Executive-focused course on AI strategy, ROI assessment, and organizational transformation.',
    contentUrl: '/learning/courses/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['leadership', 'strategy', 'executive'],
    topic: ['Adoption', 'Governance'],
    audience: ['Leader'],
    theme: 'Learning',
    stage: 'Discern',
    readTimeMins: 90
  },
  {
    id: '6',
    type: 'insight',
    title: 'Responsible AI Principles Training',
    summary: 'Essential training on AI ethics, bias detection, fairness, and responsible AI practices.',
    contentUrl: '/learning/courses/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Live',
    tags: ['responsible-ai', 'ethics', 'training'],
    topic: ['Governance', 'Security'],
    audience: ['Employee', 'Developer', 'Leader'],
    theme: 'Learning',
    stage: 'Discern',
    readTimeMins: 60
  }
];
