import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'templates',
    label: 'Design Templates',
    description: 'Pre-built templates and design systems for AI applications',
    type: 'insight'
  },
  {
    id: 'patterns',
    label: 'UI Patterns',
    description: 'Reusable UI patterns and components for AI interfaces',
    type: 'insight'
  },
  {
    id: 'guidelines',
    label: 'Design Guidelines',
    description: 'Best practices and guidelines for AI UX design',
    type: 'insight'
  },
  {
    id: 'resources',
    label: 'Design Resources',
    description: 'Assets, tools, and resources for AI product design',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'AI Chat Interface Design System',
    summary: 'Complete design system for building conversational AI interfaces with components, patterns, and guidelines.',
    contentUrl: '/design/templates/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['chat', 'design-system', 'components'],
    topic: ['Tools', 'Adoption'],
    audience: ['Developer', 'Designer'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 20
  },
  {
    id: '2',
    type: 'insight',
    title: 'Prompt Input Component Library',
    summary: 'Reusable prompt input components with auto-complete, suggestions, and validation patterns.',
    contentUrl: '/design/patterns/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['prompts', 'components', 'ui-patterns'],
    topic: ['Tools'],
    audience: ['Developer', 'Designer'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 15
  },
  {
    id: '3',
    type: 'insight',
    title: 'AI Response Visualization Patterns',
    summary: 'Design patterns for displaying AI-generated content including streaming, formatting, and error states.',
    contentUrl: '/design/patterns/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['visualization', 'patterns', 'responses'],
    topic: ['Tools', 'Adoption'],
    audience: ['Designer', 'Developer'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 18
  },
  {
    id: '4',
    type: 'insight',
    title: 'AI UX Design Guidelines',
    summary: 'Comprehensive guidelines for designing user experiences with AI including transparency, control, and feedback.',
    contentUrl: '/design/guidelines/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['ux', 'guidelines', 'best-practices'],
    topic: ['Adoption'],
    audience: ['Designer', 'Manager'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 25
  },
  {
    id: '5',
    type: 'insight',
    title: 'Dashboard Template for AI Analytics',
    summary: 'Ready-to-use dashboard template for displaying AI model performance, usage metrics, and insights.',
    contentUrl: '/design/templates/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['dashboard', 'analytics', 'template'],
    topic: ['Tools'],
    audience: ['Developer', 'Designer'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 22
  },
  {
    id: '6',
    type: 'insight',
    title: 'AI Icon Library & Design Assets',
    summary: 'Comprehensive library of AI-themed icons, illustrations, and design assets for product interfaces.',
    contentUrl: '/design/resources/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Design',
    source: 'Internal',
    status: 'Live',
    tags: ['icons', 'assets', 'resources'],
    topic: ['Tools'],
    audience: ['Designer'],
    theme: 'Design',
    stage: 'Design',
    readTimeMins: 10
  }
];
