import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'fundamentals',
    label: 'AI Fundamentals',
    description: 'Core AI concepts and terminology',
    type: 'insight'
  },
  {
    id: 'llm-terms',
    label: 'LLM & Models',
    description: 'Large language models and related terminology',
    type: 'insight'
  },
  {
    id: 'rag-agents',
    label: 'RAG & Agents',
    description: 'Retrieval-augmented generation and AI agents',
    type: 'insight'
  },
  {
    id: 'technical',
    label: 'Technical Terms',
    description: 'Advanced technical concepts and jargon',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'What is Artificial Intelligence (AI)?',
    summary: 'Comprehensive definition of AI, including machine learning, deep learning, and the evolution of AI systems.',
    contentUrl: '/glossary/fundamentals/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['ai', 'fundamentals', 'definition'],
    topic: ['Adoption'],
    audience: ['Employee'],
    theme: 'Glossary',
    readTimeMins: 5
  },
  {
    id: '2',
    type: 'insight',
    title: 'Large Language Models (LLMs) Explained',
    summary: 'What are LLMs, how they work, and their capabilities including GPT, Claude, and other foundation models.',
    contentUrl: '/glossary/llm-terms/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['llm', 'language-models', 'gpt'],
    topic: ['Tools', 'LLM'],
    audience: ['Employee', 'Developer'],
    theme: 'Glossary',
    readTimeMins: 8
  },
  {
    id: '3',
    type: 'insight',
    title: 'Retrieval-Augmented Generation (RAG)',
    summary: 'Understanding RAG systems that combine retrieval with generation for more accurate and grounded responses.',
    contentUrl: '/glossary/rag-agents/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['rag', 'retrieval', 'generation'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer', 'Employee'],
    theme: 'Glossary',
    readTimeMins: 7
  },
  {
    id: '4',
    type: 'insight',
    title: 'AI Agents and Autonomous Systems',
    summary: 'Definition of AI agents, their capabilities, and how they differ from traditional AI systems.',
    contentUrl: '/glossary/rag-agents/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['agents', 'autonomous', 'systems'],
    topic: ['Agents'],
    audience: ['Employee', 'Developer'],
    theme: 'Glossary',
    readTimeMins: 6
  },
  {
    id: '5',
    type: 'insight',
    title: 'Prompt Engineering Terminology',
    summary: 'Key terms in prompt engineering including few-shot, chain-of-thought, and prompt templates.',
    contentUrl: '/glossary/technical/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Approved',
    tags: ['prompts', 'engineering', 'terminology'],
    topic: ['Tools'],
    audience: ['Employee', 'Developer'],
    theme: 'Glossary',
    readTimeMins: 10
  },
  {
    id: '6',
    type: 'insight',
    title: 'Tokens, Context Windows, and Model Parameters',
    summary: 'Technical explanation of tokens, context length, temperature, and other model parameters.',
    contentUrl: '/glossary/technical/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Architecture',
    source: 'Internal',
    status: 'Approved',
    tags: ['tokens', 'context', 'parameters'],
    topic: ['Tools', 'LLM'],
    audience: ['Developer'],
    theme: 'Glossary',
    readTimeMins: 12
  }
];
