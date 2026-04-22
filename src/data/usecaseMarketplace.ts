import { MarketplaceItem, TabConfig } from '@/types/marketplace';

export const tabs: TabConfig[] = [
  {
    id: 'intake',
    label: 'Use Case Intake',
    description: 'Submit and track new AI use case proposals',
    type: 'insight'
  },
  {
    id: 'evaluation',
    label: 'Evaluation & Scoring',
    description: 'Assessment criteria and scoring frameworks',
    type: 'insight'
  },
  {
    id: 'approved',
    label: 'Approved Use Cases',
    description: 'Approved and prioritized AI initiatives',
    type: 'use_case'
  },
  {
    id: 'templates',
    label: 'Templates & Guides',
    description: 'Templates for use case documentation',
    type: 'insight'
  }
];

export const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    type: 'use_case',
    title: 'Customer Service Automation Use Case',
    summary: 'Approved use case for automating tier-1 customer support using AI chatbots with 70% automation target.',
    contentUrl: '/usecase/approved/1',
    publishedAt: '2024-03-15',
    ownerTeam: 'Customer Service',
    source: 'Internal',
    status: 'Approved',
    tags: ['customer-service', 'automation', 'chatbot'],
    topic: ['Agents', 'Adoption'],
    audience: ['Manager', 'Developer'],
    function: 'Customer Service',
    valueBand: 'High',
    readTimeMins: 15
  },
  {
    id: '2',
    type: 'insight',
    title: 'Use Case Scoring Framework',
    summary: 'Standardized framework for evaluating AI use cases based on value, feasibility, risk, and strategic alignment.',
    contentUrl: '/usecase/evaluation/2',
    publishedAt: '2024-03-14',
    ownerTeam: 'Governance',
    source: 'Internal',
    status: 'Approved',
    tags: ['scoring', 'evaluation', 'framework'],
    topic: ['Governance'],
    audience: ['Leader', 'Manager'],
    readTimeMins: 20
  },
  {
    id: '3',
    type: 'use_case',
    title: 'Document Intelligence Use Case',
    summary: 'Automated extraction and classification of information from unstructured documents using AI.',
    contentUrl: '/usecase/approved/3',
    publishedAt: '2024-03-13',
    ownerTeam: 'Operations',
    source: 'Internal',
    status: 'Approved',
    tags: ['document-processing', 'extraction', 'classification'],
    topic: ['Tools', 'Adoption'],
    audience: ['Manager', 'Developer'],
    function: 'Operations',
    valueBand: 'Medium',
    readTimeMins: 18
  },
  {
    id: '4',
    type: 'insight',
    title: 'Use Case Intake Template',
    summary: 'Comprehensive template for submitting new AI use case proposals with all required information.',
    contentUrl: '/usecase/templates/4',
    publishedAt: '2024-03-12',
    ownerTeam: 'Governance',
    source: 'Internal',
    status: 'Approved',
    tags: ['template', 'intake', 'documentation'],
    topic: ['Governance'],
    audience: ['Manager', 'Employee'],
    readTimeMins: 10
  },
  {
    id: '5',
    type: 'use_case',
    title: 'Predictive Maintenance Use Case',
    summary: 'AI-powered predictive maintenance for equipment failure prevention and optimization.',
    contentUrl: '/usecase/approved/5',
    publishedAt: '2024-03-11',
    ownerTeam: 'Manufacturing',
    source: 'Internal',
    status: 'Approved',
    tags: ['predictive-maintenance', 'iot', 'optimization'],
    topic: ['Tools', 'Agents'],
    audience: ['Manager', 'Developer'],
    function: 'Manufacturing',
    valueBand: 'High',
    readTimeMins: 22
  },
  {
    id: '6',
    type: 'insight',
    title: 'ROI Calculation Guide',
    summary: 'Methodology for calculating expected ROI and business value for AI use cases.',
    contentUrl: '/usecase/evaluation/6',
    publishedAt: '2024-03-10',
    ownerTeam: 'Finance',
    source: 'Internal',
    status: 'Approved',
    tags: ['roi', 'value', 'calculation'],
    topic: ['Governance'],
    audience: ['Leader', 'Manager'],
    readTimeMins: 16
  }
];
