import type {
  TeamMember,
  TeamMetrics,
  Approval,
  Escalation,
  ServiceRequest,
  ServiceMetrics,
  ServiceCatalogItem,
  Task,
  SolutionPathway,
  UserAccount,
  PolicyRule,
  AuditLogEntry,
  PortfolioItem,
  StrategicMetric,
  SavedItem,
} from '../types/workspace';

// Helper function to generate random dates
const randomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Helper function to generate future dates
const futureDate = (daysAhead: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
  return date.toISOString();
};

// Mock data generators for Team (Manager role)
const generateTeamMembers = (): TeamMember[] => {
  return [
    {
      id: 'tm-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'employee',
      activeOpportunities: 3,
      activeRequests: 1,
      workload: 'Medium',
    },
    {
      id: 'tm-002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'employee',
      activeOpportunities: 5,
      activeRequests: 2,
      workload: 'High',
    },
    {
      id: 'tm-003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'employee',
      activeOpportunities: 1,
      activeRequests: 0,
      workload: 'Low',
    },
    {
      id: 'tm-004',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'specialist',
      activeOpportunities: 2,
      activeRequests: 3,
      workload: 'High',
    },
    {
      id: 'tm-005',
      name: 'Jessica Martinez',
      email: 'jessica.martinez@company.com',
      role: 'employee',
      activeOpportunities: 2,
      activeRequests: 1,
      workload: 'Medium',
    },
  ];
};

const generateTeamMetrics = (): TeamMetrics => {
  return {
    totalOpportunities: 24,
    totalRequests: 15,
    completionRate: 78.5,
    averageTimeToComplete: 14.2,
    valueDelivered: 1250000,
  };
};

const generatePendingApprovals = (): Approval[] => {
  return [
    {
      id: 'appr-001',
      type: 'request',
      itemId: 'req-045',
      itemTitle: 'Customer Sentiment Analysis Dashboard',
      submittedBy: 'Sarah Johnson',
      submittedAt: randomDate(2),
      urgency: 'High',
      estimatedCost: 45000,
      estimatedDuration: '6 weeks',
      justification: 'Critical for Q2 customer retention initiative. Will provide real-time insights into customer feedback across all channels.',
    },
    {
      id: 'appr-002',
      type: 'request',
      itemId: 'req-046',
      itemTitle: 'Automated Invoice Processing',
      submittedBy: 'Michael Chen',
      submittedAt: randomDate(1),
      urgency: 'Medium',
      estimatedCost: 32000,
      estimatedDuration: '4 weeks',
      justification: 'Will reduce manual processing time by 80% and eliminate data entry errors in accounts payable.',
    },
    {
      id: 'appr-003',
      type: 'opportunity',
      itemId: 'opp-123',
      itemTitle: 'Predictive Maintenance for Manufacturing Equipment',
      submittedBy: 'Emily Rodriguez',
      submittedAt: randomDate(3),
      urgency: 'Critical',
      estimatedCost: 125000,
      estimatedDuration: '12 weeks',
      justification: 'Potential to prevent $2M in annual equipment downtime. High ROI opportunity identified by operations team.',
    },
  ];
};

const generateEscalations = (): Escalation[] => {
  return [
    {
      id: 'esc-001',
      relatedItemId: 'req-042',
      relatedItemType: 'request',
      title: 'Data Access Permissions Blocking Progress',
      description: 'Unable to proceed with customer analytics project due to pending data access approvals from IT security team.',
      raisedBy: 'David Kim',
      raisedAt: randomDate(1),
      severity: 'High',
      status: 'Open',
    },
    {
      id: 'esc-002',
      relatedItemId: 'opp-118',
      relatedItemType: 'opportunity',
      title: 'Resource Conflict with Priority Project',
      description: 'Key specialist assigned to two high-priority projects simultaneously. Need to reprioritize or allocate additional resources.',
      raisedBy: 'Jessica Martinez',
      raisedAt: randomDate(2),
      severity: 'Medium',
      status: 'In Progress',
    },
  ];
};

// Mock data generators for Service Owner role
const generateServiceRequests = (): ServiceRequest[] => {
  return [
    {
      id: 'sr-001',
      requestId: 'req-045',
      serviceType: 'Data Analytics',
      title: 'Customer Sentiment Analysis Dashboard',
      submittedBy: 'Sarah Johnson',
      submittedAt: randomDate(5),
      priority: 'High',
      status: 'In Fulfilment',
      assignedTo: 'Analytics Team A',
      estimatedCompletion: futureDate(15),
      slaStatus: 'On Track',
    },
    {
      id: 'sr-002',
      requestId: 'req-046',
      serviceType: 'Process Automation',
      title: 'Automated Invoice Processing',
      submittedBy: 'Michael Chen',
      submittedAt: randomDate(3),
      priority: 'Medium',
      status: 'Under Review',
      slaStatus: 'On Track',
    },
    {
      id: 'sr-003',
      requestId: 'req-047',
      serviceType: 'Machine Learning',
      title: 'Predictive Maintenance Model',
      submittedBy: 'Emily Rodriguez',
      submittedAt: randomDate(10),
      priority: 'Critical',
      status: 'In Fulfilment',
      assignedTo: 'ML Engineering Team',
      estimatedCompletion: futureDate(30),
      slaStatus: 'At Risk',
    },
    {
      id: 'sr-004',
      requestId: 'req-048',
      serviceType: 'Natural Language Processing',
      title: 'Contract Review Automation',
      submittedBy: 'Legal Department',
      submittedAt: randomDate(7),
      priority: 'Medium',
      status: 'Approved',
      slaStatus: 'On Track',
    },
  ];
};

const generateServiceMetrics = (): ServiceMetrics => {
  return {
    totalRequests: 47,
    inProgress: 12,
    completed: 35,
    slaCompliance: 92.3,
    averageDeliveryTime: 18.5,
    customerSatisfaction: 4.6,
  };
};

const generateServiceCatalog = (): ServiceCatalogItem[] => {
  return [
    {
      id: 'svc-001',
      name: 'Data Analytics Dashboard',
      description: 'Custom interactive dashboards for business intelligence and reporting',
      category: 'Data Analytics',
      estimatedDuration: '4-6 weeks',
      requiresApproval: true,
      governanceLevel: 'Medium',
      template: 'analytics-dashboard-template',
    },
    {
      id: 'svc-002',
      name: 'Process Automation',
      description: 'Automated workflows for repetitive business processes using RPA and AI',
      category: 'Automation',
      estimatedDuration: '3-5 weeks',
      requiresApproval: true,
      governanceLevel: 'Medium',
    },
    {
      id: 'svc-003',
      name: 'Predictive Analytics Model',
      description: 'Machine learning models for forecasting and prediction',
      category: 'Machine Learning',
      estimatedDuration: '8-12 weeks',
      requiresApproval: true,
      governanceLevel: 'High',
      template: 'ml-model-template',
    },
    {
      id: 'svc-004',
      name: 'Natural Language Processing',
      description: 'Text analysis, sentiment analysis, and document processing',
      category: 'NLP',
      estimatedDuration: '6-10 weeks',
      requiresApproval: true,
      governanceLevel: 'High',
    },
    {
      id: 'svc-005',
      name: 'Computer Vision Solution',
      description: 'Image recognition, object detection, and visual inspection',
      category: 'Computer Vision',
      estimatedDuration: '10-14 weeks',
      requiresApproval: true,
      governanceLevel: 'High',
    },
    {
      id: 'svc-006',
      name: 'Chatbot Development',
      description: 'Conversational AI for customer service and internal support',
      category: 'Conversational AI',
      estimatedDuration: '5-8 weeks',
      requiresApproval: true,
      governanceLevel: 'Medium',
    },
  ];
};

// Mock data generators for Specialist Team role
const generateWorkQueue = (): Task[] => {
  return [
    {
      id: 'task-001',
      requestId: 'req-045',
      title: 'Design data pipeline for sentiment analysis',
      description: 'Create ETL pipeline to ingest customer feedback from multiple sources',
      assignedTo: 'current-user',
      status: 'In Progress',
      priority: 'High',
      dueDate: futureDate(5),
      estimatedHours: 16,
      actualHours: 8,
      dependencies: [],
    },
    {
      id: 'task-002',
      requestId: 'req-045',
      title: 'Implement sentiment classification model',
      description: 'Train and validate NLP model for sentiment classification',
      assignedTo: 'current-user',
      status: 'Not Started',
      priority: 'High',
      dueDate: futureDate(10),
      estimatedHours: 24,
      dependencies: ['task-001'],
    },
    {
      id: 'task-003',
      requestId: 'req-047',
      title: 'Feature engineering for maintenance prediction',
      description: 'Extract and transform sensor data features for ML model',
      assignedTo: 'current-user',
      status: 'In Progress',
      priority: 'Critical',
      dueDate: futureDate(3),
      estimatedHours: 20,
      actualHours: 12,
      dependencies: [],
    },
    {
      id: 'task-004',
      requestId: 'req-048',
      title: 'Contract entity extraction',
      description: 'Develop NER model to extract key entities from legal contracts',
      assignedTo: 'current-user',
      status: 'Not Started',
      priority: 'Medium',
      dueDate: futureDate(15),
      estimatedHours: 18,
      dependencies: [],
    },
  ];
};

const generateSolutionPathways = (): SolutionPathway[] => {
  return [
    {
      id: 'path-001',
      name: 'Real-time Analytics Pipeline',
      category: 'Data Analytics',
      description: 'Streaming data pipeline architecture for real-time analytics and dashboards',
      architecture: 'Event-driven microservices with stream processing',
      technologies: ['Apache Kafka', 'Apache Flink', 'PostgreSQL', 'React', 'D3.js'],
      estimatedComplexity: 'High',
      documentationUrl: '/docs/pathways/realtime-analytics',
    },
    {
      id: 'path-002',
      name: 'Supervised ML Classification',
      category: 'Machine Learning',
      description: 'Standard approach for classification problems with labeled training data',
      architecture: 'Model training pipeline with MLOps integration',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'MLflow', 'Docker'],
      estimatedComplexity: 'Medium',
      documentationUrl: '/docs/pathways/ml-classification',
    },
    {
      id: 'path-003',
      name: 'Document Processing Automation',
      category: 'NLP',
      description: 'End-to-end pipeline for document ingestion, processing, and information extraction',
      architecture: 'Batch processing with OCR and NLP stages',
      technologies: ['Python', 'Tesseract', 'spaCy', 'FastAPI', 'MongoDB'],
      estimatedComplexity: 'Medium',
      documentationUrl: '/docs/pathways/document-processing',
    },
    {
      id: 'path-004',
      name: 'Conversational AI Platform',
      category: 'Conversational AI',
      description: 'Multi-channel chatbot platform with NLU and dialog management',
      architecture: 'Intent-based dialog system with context management',
      technologies: ['Rasa', 'Python', 'Redis', 'PostgreSQL', 'WebSocket'],
      estimatedComplexity: 'High',
      documentationUrl: '/docs/pathways/conversational-ai',
    },
  ];
};

// Mock data generators for Admin role
const generateUserAccounts = (): UserAccount[] => {
  return [
    {
      id: 'user-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      roles: ['employee'],
      department: 'Marketing',
      status: 'Active',
      lastLogin: randomDate(1),
      createdAt: randomDate(180),
    },
    {
      id: 'user-002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      roles: ['employee', 'specialist'],
      department: 'Operations',
      status: 'Active',
      lastLogin: randomDate(0),
      createdAt: randomDate(365),
    },
    {
      id: 'user-003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      roles: ['manager'],
      department: 'Finance',
      status: 'Active',
      lastLogin: randomDate(2),
      createdAt: randomDate(540),
    },
    {
      id: 'user-004',
      name: 'David Kim',
      email: 'david.kim@company.com',
      roles: ['specialist', 'owner'],
      department: 'IT',
      status: 'Active',
      lastLogin: randomDate(0),
      createdAt: randomDate(720),
    },
    {
      id: 'user-005',
      name: 'Jessica Martinez',
      email: 'jessica.martinez@company.com',
      roles: ['employee'],
      department: 'Sales',
      status: 'Active',
      lastLogin: randomDate(3),
      createdAt: randomDate(90),
    },
    {
      id: 'user-006',
      name: 'Robert Taylor',
      email: 'robert.taylor@company.com',
      roles: ['admin'],
      department: 'IT Governance',
      status: 'Active',
      lastLogin: randomDate(0),
      createdAt: randomDate(900),
    },
    {
      id: 'user-007',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      roles: ['executive'],
      department: 'Executive Leadership',
      status: 'Active',
      lastLogin: randomDate(1),
      createdAt: randomDate(1200),
    },
  ];
};

const generatePolicyRules = (): PolicyRule[] => {
  return [
    {
      id: 'policy-001',
      name: 'High-Cost Request Approval',
      description: 'Requests exceeding $50,000 require executive approval',
      category: 'Financial Governance',
      severity: 'High',
      enabled: true,
      conditions: {
        estimatedCost: { operator: 'greaterThan', value: 50000 },
      },
      actions: ['require_executive_approval', 'notify_finance_team'],
    },
    {
      id: 'policy-002',
      name: 'PII Data Access Control',
      description: 'Projects accessing PII must complete privacy impact assessment',
      category: 'Data Privacy',
      severity: 'Critical',
      enabled: true,
      conditions: {
        dataTypes: { operator: 'contains', value: 'PII' },
      },
      actions: ['require_privacy_assessment', 'notify_dpo', 'require_legal_review'],
    },
    {
      id: 'policy-003',
      name: 'External API Integration Review',
      description: 'Integration with external APIs requires security review',
      category: 'Security',
      severity: 'High',
      enabled: true,
      conditions: {
        integrationType: { operator: 'equals', value: 'external_api' },
      },
      actions: ['require_security_review', 'notify_security_team'],
    },
    {
      id: 'policy-004',
      name: 'Model Bias Assessment',
      description: 'ML models affecting customer decisions require bias assessment',
      category: 'AI Ethics',
      severity: 'High',
      enabled: true,
      conditions: {
        serviceType: { operator: 'equals', value: 'Machine Learning' },
        customerImpact: { operator: 'equals', value: true },
      },
      actions: ['require_bias_assessment', 'notify_ethics_board'],
    },
  ];
};

const generateAuditLogs = (): AuditLogEntry[] => {
  return [
    {
      id: 'audit-001',
      timestamp: randomDate(1),
      userId: 'user-003',
      userName: 'Emily Rodriguez',
      action: 'APPROVED_REQUEST',
      resource: 'AIRequest',
      resourceId: 'req-045',
      details: {
        requestTitle: 'Customer Sentiment Analysis Dashboard',
        approvalLevel: 'manager',
      },
      ipAddress: '192.168.1.45',
    },
    {
      id: 'audit-002',
      timestamp: randomDate(1),
      userId: 'user-006',
      userName: 'Robert Taylor',
      action: 'UPDATED_POLICY',
      resource: 'PolicyRule',
      resourceId: 'policy-002',
      details: {
        policyName: 'PII Data Access Control',
        changes: ['enabled: true'],
      },
      ipAddress: '192.168.1.100',
    },
    {
      id: 'audit-003',
      timestamp: randomDate(2),
      userId: 'user-001',
      userName: 'Sarah Johnson',
      action: 'SUBMITTED_REQUEST',
      resource: 'AIRequest',
      resourceId: 'req-045',
      details: {
        requestTitle: 'Customer Sentiment Analysis Dashboard',
        serviceType: 'Data Analytics',
      },
      ipAddress: '192.168.1.23',
    },
    {
      id: 'audit-004',
      timestamp: randomDate(2),
      userId: 'user-004',
      userName: 'David Kim',
      action: 'ASSIGNED_TASK',
      resource: 'Task',
      resourceId: 'task-001',
      details: {
        taskTitle: 'Design data pipeline for sentiment analysis',
        assignedTo: 'Analytics Team A',
      },
      ipAddress: '192.168.1.67',
    },
    {
      id: 'audit-005',
      timestamp: randomDate(3),
      userId: 'user-006',
      userName: 'Robert Taylor',
      action: 'CREATED_USER',
      resource: 'UserAccount',
      resourceId: 'user-005',
      details: {
        userName: 'Jessica Martinez',
        roles: ['employee'],
        department: 'Sales',
      },
      ipAddress: '192.168.1.100',
    },
  ];
};

// Mock data generators for Executive role
const generatePortfolio = (): PortfolioItem[] => {
  return [
    {
      id: 'port-001',
      title: 'Customer Sentiment Analysis Dashboard',
      type: 'request',
      businessUnit: 'Marketing',
      status: 'In Fulfilment',
      investment: 45000,
      expectedValue: 250000,
      realizedValue: 0,
      riskLevel: 'Low',
      startDate: randomDate(30),
      targetCompletionDate: futureDate(15),
    },
    {
      id: 'port-002',
      title: 'Predictive Maintenance Initiative',
      type: 'initiative',
      businessUnit: 'Operations',
      status: 'In Progress',
      investment: 125000,
      expectedValue: 2000000,
      realizedValue: 450000,
      riskLevel: 'Medium',
      startDate: randomDate(90),
      targetCompletionDate: futureDate(30),
    },
    {
      id: 'port-003',
      title: 'Automated Invoice Processing',
      type: 'request',
      businessUnit: 'Finance',
      status: 'Under Review',
      investment: 32000,
      expectedValue: 180000,
      realizedValue: 0,
      riskLevel: 'Low',
      startDate: randomDate(10),
      targetCompletionDate: futureDate(40),
    },
    {
      id: 'port-004',
      title: 'Supply Chain Optimization',
      type: 'opportunity',
      businessUnit: 'Operations',
      status: 'Under Assessment',
      investment: 0,
      expectedValue: 1500000,
      realizedValue: 0,
      riskLevel: 'High',
      startDate: randomDate(5),
      targetCompletionDate: futureDate(120),
    },
    {
      id: 'port-005',
      title: 'Customer Churn Prediction',
      type: 'request',
      businessUnit: 'Sales',
      status: 'Completed',
      investment: 55000,
      expectedValue: 800000,
      realizedValue: 620000,
      riskLevel: 'Low',
      startDate: randomDate(180),
      targetCompletionDate: randomDate(30),
    },
  ];
};

const generateStrategicMetrics = (): StrategicMetric[] => {
  return [
    {
      name: 'AI Adoption Rate',
      value: 68,
      target: 75,
      trend: 'up',
      period: 'Q1 2024',
    },
    {
      name: 'Portfolio ROI',
      value: 245,
      target: 200,
      trend: 'up',
      period: 'YTD',
    },
    {
      name: 'Time to Value (days)',
      value: 42,
      target: 35,
      trend: 'down',
      period: 'Q1 2024',
    },
    {
      name: 'Governance Compliance',
      value: 94,
      target: 95,
      trend: 'stable',
      period: 'Q1 2024',
    },
    {
      name: 'Active AI Initiatives',
      value: 47,
      target: 50,
      trend: 'up',
      period: 'Current',
    },
    {
      name: 'Business Value Delivered ($M)',
      value: 3.8,
      target: 4.5,
      trend: 'up',
      period: 'YTD',
    },
  ];
};

// Mock data generator for Saved Items (common)
const generateSavedItems = (): SavedItem[] => {
  return [
    {
      id: 'saved-001',
      type: 'opportunity',
      itemId: 'opp-123',
      title: 'Predictive Maintenance for Manufacturing Equipment',
      description: 'ML-based solution to predict equipment failures before they occur',
      savedAt: randomDate(10),
      tags: ['machine-learning', 'operations', 'high-value'],
    },
    {
      id: 'saved-002',
      type: 'pathway',
      itemId: 'path-001',
      title: 'Real-time Analytics Pipeline',
      description: 'Streaming data pipeline architecture for real-time analytics',
      savedAt: randomDate(15),
      tags: ['analytics', 'architecture', 'streaming'],
    },
    {
      id: 'saved-003',
      type: 'service',
      itemId: 'svc-003',
      title: 'Predictive Analytics Model',
      description: 'Machine learning models for forecasting and prediction',
      savedAt: randomDate(20),
      tags: ['ml', 'forecasting', 'service-catalog'],
    },
    {
      id: 'saved-004',
      type: 'pathway',
      itemId: 'path-004',
      title: 'Conversational AI Platform',
      description: 'Multi-channel chatbot platform with NLU and dialog management',
      savedAt: randomDate(5),
      tags: ['chatbot', 'nlp', 'customer-service'],
    },
  ];
};

// Service interface
export const workspaceDataService = {
  // Team data for managers
  getTeamMembers: async (managerId: string): Promise<TeamMember[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateTeamMembers();
  },

  getTeamMetrics: async (managerId: string): Promise<TeamMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateTeamMetrics();
  },

  getPendingApprovals: async (managerId: string): Promise<Approval[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generatePendingApprovals();
  },

  getEscalations: async (managerId: string): Promise<Escalation[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateEscalations();
  },

  // Service data for owners
  getServiceRequests: async (ownerId: string): Promise<ServiceRequest[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateServiceRequests();
  },

  getServiceMetrics: async (serviceId: string): Promise<ServiceMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateServiceMetrics();
  },

  getServiceCatalog: async (): Promise<ServiceCatalogItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateServiceCatalog();
  },

  // Specialist data
  getWorkQueue: async (specialistId: string): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateWorkQueue();
  },

  getSolutionPathways: async (): Promise<SolutionPathway[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateSolutionPathways();
  },

  // Admin data
  getUserAccounts: async (): Promise<UserAccount[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateUserAccounts();
  },

  getPolicyRules: async (): Promise<PolicyRule[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generatePolicyRules();
  },

  getAuditLogs: async (filters?: any): Promise<AuditLogEntry[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateAuditLogs();
  },

  // Executive data
  getPortfolio: async (): Promise<PortfolioItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generatePortfolio();
  },

  getStrategicMetrics: async (): Promise<StrategicMetric[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateStrategicMetrics();
  },

  // Common data
  getSavedItems: async (userId: string): Promise<SavedItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateSavedItems();
  },

  // Team performance metrics for managers
  getTeamPerformanceMetrics: async (managerId: string, timePeriod: string): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Generate metrics based on time period
    const baseMetrics = {
      '7d': { valueDelivered: 125000, completionRate: 85, aiAdoptionRate: 72, averageTimeToComplete: 12, totalInitiatives: 8, successfulDeployments: 3 },
      '30d': { valueDelivered: 485000, completionRate: 82, aiAdoptionRate: 75, averageTimeToComplete: 14, totalInitiatives: 25, successfulDeployments: 12 },
      '90d': { valueDelivered: 1250000, completionRate: 78, aiAdoptionRate: 78, averageTimeToComplete: 15, totalInitiatives: 67, successfulDeployments: 34 },
      '1y': { valueDelivered: 4800000, completionRate: 76, aiAdoptionRate: 82, averageTimeToComplete: 16, totalInitiatives: 245, successfulDeployments: 128 },
    };
    
    return baseMetrics[timePeriod as keyof typeof baseMetrics] || baseMetrics['30d'];
  },

  // Resource planning data for managers
  getResourcePlanningData: async (managerId: string): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    return {
      capacity: {
        totalCapacity: 200,
        allocatedCapacity: 165,
        availableCapacity: 35,
        utilizationRate: 82.5,
      },
      skillGaps: [
        {
          id: 'gap-001',
          skill: 'Machine Learning Engineering',
          currentLevel: 'Basic',
          requiredLevel: 'Advanced',
          priority: 'Critical',
          affectedProjects: 5,
        },
        {
          id: 'gap-002',
          skill: 'Cloud Architecture (AWS)',
          currentLevel: 'Intermediate',
          requiredLevel: 'Expert',
          priority: 'High',
          affectedProjects: 3,
        },
        {
          id: 'gap-003',
          skill: 'Natural Language Processing',
          currentLevel: 'None',
          requiredLevel: 'Intermediate',
          priority: 'High',
          affectedProjects: 4,
        },
        {
          id: 'gap-004',
          skill: 'Data Pipeline Engineering',
          currentLevel: 'Intermediate',
          requiredLevel: 'Advanced',
          priority: 'Medium',
          affectedProjects: 2,
        },
      ],
      trainingNeeds: [
        {
          id: 'train-001',
          title: 'Advanced Machine Learning with TensorFlow',
          category: 'Technical Skills',
          targetAudience: ['Sarah Johnson', 'Michael Chen', 'David Kim'],
          priority: 'Critical',
          estimatedDuration: '4 weeks',
          provider: 'Coursera',
          status: 'Scheduled',
        },
        {
          id: 'train-002',
          title: 'AWS Solutions Architect Certification',
          category: 'Cloud Infrastructure',
          targetAudience: ['David Kim', 'Emily Rodriguez'],
          priority: 'High',
          estimatedDuration: '6 weeks',
          provider: 'AWS Training',
          status: 'Planned',
        },
        {
          id: 'train-003',
          title: 'NLP Fundamentals and Applications',
          category: 'AI/ML',
          targetAudience: ['Sarah Johnson', 'Jessica Martinez'],
          priority: 'High',
          estimatedDuration: '3 weeks',
          provider: 'Internal',
          status: 'In Progress',
        },
        {
          id: 'train-004',
          title: 'Agile Project Management',
          category: 'Soft Skills',
          targetAudience: ['Michael Chen', 'Emily Rodriguez'],
          priority: 'Medium',
          estimatedDuration: '2 weeks',
          status: 'Completed',
        },
      ],
      allocations: [
        {
          memberId: 'tm-001',
          memberName: 'Sarah Johnson',
          currentProjects: 3,
          allocatedHours: 35,
          availableHours: 5,
          utilizationRate: 87.5,
          skills: ['Python', 'Data Analysis', 'SQL', 'Tableau'],
        },
        {
          memberId: 'tm-002',
          memberName: 'Michael Chen',
          currentProjects: 4,
          allocatedHours: 38,
          availableHours: 2,
          utilizationRate: 95,
          skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
        },
        {
          memberId: 'tm-003',
          memberName: 'Emily Rodriguez',
          currentProjects: 2,
          allocatedHours: 28,
          availableHours: 12,
          utilizationRate: 70,
          skills: ['Project Management', 'Business Analysis', 'Agile'],
        },
        {
          memberId: 'tm-004',
          memberName: 'David Kim',
          currentProjects: 5,
          allocatedHours: 40,
          availableHours: 0,
          utilizationRate: 100,
          skills: ['Python', 'Machine Learning', 'Docker', 'Kubernetes', 'TensorFlow'],
        },
        {
          memberId: 'tm-005',
          memberName: 'Jessica Martinez',
          currentProjects: 2,
          allocatedHours: 24,
          availableHours: 16,
          utilizationRate: 60,
          skills: ['UX Design', 'Figma', 'User Research'],
        },
      ],
    };
  },
};
