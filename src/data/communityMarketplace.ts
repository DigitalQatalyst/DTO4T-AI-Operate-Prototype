import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'office-hours',
    label: 'Office Hours',
    description: 'Scheduled sessions with AI experts for Q&A and guidance',
    type: 'insight'
  },
  {
    id: 'workshops',
    label: 'Community Workshops',
    description: 'Peer-led workshops and knowledge sharing sessions',
    type: 'insight'
  },
  {
    id: 'discussions',
    label: 'Discussions & Forums',
    description: 'Active discussions on AI topics, challenges, and solutions',
    type: 'insight'
  },
  {
    id: 'events',
    label: 'Events & Meetups',
    description: 'Upcoming AI community events, hackathons, and meetups',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'insight',
    title: 'Weekly AI Office Hours - Every Thursday 2PM',
    summary: 'Drop-in session with AI experts to get help with your AI projects, ask questions, and share challenges.',
    contentUrl: '/community/office-hours/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['office-hours', 'expert-session', 'q-and-a'],
    topic: ['Adoption'],
    audience: ['Employee', 'Developer', 'Manager'],
    theme: 'Community',
    readTimeMins: 60
  },
  {
    id: '2',
    type: 'insight',
    title: 'Prompt Engineering Workshop - March 20th',
    summary: 'Community-led workshop on advanced prompt engineering techniques with hands-on exercises.',
    contentUrl: '/community/workshops/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['workshop', 'prompt-engineering', 'hands-on'],
    topic: ['Tools', 'Adoption'],
    audience: ['Employee', 'Developer'],
    theme: 'Workshop',
    readTimeMins: 120
  },
  {
    id: '3',
    type: 'insight',
    title: 'Discussion: Best Practices for RAG Implementation',
    summary: 'Active discussion thread on RAG system design patterns, challenges, and lessons learned.',
    contentUrl: '/community/discussions/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['discussion', 'rag', 'best-practices'],
    topic: ['Tools', 'Agents'],
    audience: ['Developer'],
    theme: 'Discussion',
    readTimeMins: 15
  },
  {
    id: '4',
    type: 'insight',
    title: 'AI Hackathon - April 5-6',
    summary: '48-hour hackathon to build innovative AI solutions. Teams of 3-5, prizes for top projects.',
    contentUrl: '/community/events/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['hackathon', 'event', 'competition'],
    topic: ['Adoption', 'Agents'],
    audience: ['Developer', 'Employee'],
    theme: 'Event',
    readTimeMins: 10
  },
  {
    id: '5',
    type: 'insight',
    title: 'Monthly AI Practitioners Meetup',
    summary: 'Informal monthly gathering for AI practitioners to network, share experiences, and learn from each other.',
    contentUrl: '/community/events/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'DIA',
    source: 'Internal',
    status: 'Live',
    tags: ['meetup', 'networking', 'community'],
    topic: ['Adoption'],
    audience: ['Employee', 'Developer', 'Manager'],
    theme: 'Event',
    readTimeMins: 90
  },
  {
    id: '6',
    type: 'insight',
    title: 'Ask Me Anything: AI Governance with Risk Team',
    summary: 'Special AMA session with the Risk team covering AI governance, compliance, and responsible AI.',
    contentUrl: '/community/office-hours/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Risk',
    source: 'Internal',
    status: 'Live',
    tags: ['ama', 'governance', 'risk'],
    topic: ['Governance', 'Security'],
    audience: ['Leader', 'Manager', 'Risk'],
    theme: 'Community',
    readTimeMins: 60
  }
];
