export type TabSlug =
  | 'enterprise-ai-updates'
  | 'model-release-briefings'
  | 'regulatory-alerts'
  | 'risk-advisories'
  | 'ai-transformation-insights'
  | 'dco-intelligence-briefs'
  | 'enterprise-use-cases'
  | 'industry-analysis';

export interface FilterGroup {
  id: string;
  label: string;
  options: string[];
}

export interface TabConfig {
  slug: TabSlug;
  label: string;
  overview: string;
  searchPlaceholder: string;
  filters: FilterGroup[];
}

export interface InsightItem {
  id: string;
  tab: TabSlug;
  typePill: string;
  title: string;
  summary: string;
  date: string;
  owner: string;
  source: string;
  tags: string[];
  [key: string]: unknown;
}

export type SortOption = 'recent' | 'severity' | 'recommended';

export const GLOBAL_FILTERS: FilterGroup[] = [
  { id: 'Topic', label: 'Topic', options: ['LLM', 'Prompting', 'RAG', 'Chatbots', 'Agents', 'Agentic', 'Governance', 'Risk', 'Tools'] },
  { id: 'Role', label: 'Role/Audience', options: ['Employee', 'Manager', 'Leader', 'Developer', 'Risk'] },
  { id: 'Owner', label: 'Owner/Team', options: ['DIA.AI', 'Governance', 'Architecture', 'Risk', 'Other'] },
  { id: 'Source', label: 'Source', options: ['Internal', 'External', 'Both'] },
  { id: 'Date', label: 'Date', options: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'Custom'] },
  { id: 'Status', label: 'Status', options: ['Approved', 'Archived'] },
];

export const TABS: TabConfig[] = [
  {
    slug: 'enterprise-ai-updates',
    label: 'Enterprise AI Updates',
    overview: 'Track AI platform changes, approved tools, and capability announcements that affect daily work.',
    searchPlaceholder: 'Search updates… e.g., new tool, model change, platform update',
    filters: [
      { id: 'UpdateType', label: 'Update Type', options: ['Announcement', 'Tool update', 'Platform update', 'Capability update'] },
      { id: 'Impact', label: 'Impact', options: ['Low', 'Medium', 'High'] },
    ],
  },
  {
    slug: 'model-release-briefings',
    label: 'Model Release Briefings',
    overview: 'Briefings that explain what changed, best uses, and limitations—so teams choose the right model.',
    searchPlaceholder: 'Search model briefings… e.g., GPT, Claude, Gemini',
    filters: [
      { id: 'Vendor', label: 'Vendor', options: ['OpenAI', 'Microsoft', 'Google', 'Anthropic', 'Other'] },
      { id: 'ModelFamily', label: 'Model Family', options: ['GPT', 'Claude', 'Gemini', 'Other'] },
      { id: 'Recommendation', label: 'Recommendation', options: ['Approved', 'Pilot', 'Not approved'] },
      { id: 'UseType', label: 'Use Type', options: ['Writing', 'Coding', 'Analysis', 'Agents'] },
    ],
  },
  {
    slug: 'regulatory-alerts',
    label: 'Regulatory Alerts',
    overview: 'AI-related regulation and policy updates by region, including what action is required.',
    searchPlaceholder: 'Search regulatory alerts… e.g., EU AI Act, privacy, compliance',
    filters: [
      { id: 'Region', label: 'Region', options: ['Global', 'UAE', 'EU', 'US', 'Other'] },
      { id: 'ActionRequired', label: 'Action Required', options: ['Yes', 'No'] },
    ],
  },
  {
    slug: 'risk-advisories',
    label: 'Risk Advisories',
    overview: 'Practical risk guidance with approved mitigations to keep AI use safe and consistent.',
    searchPlaceholder: 'Search risk… e.g., client data, privacy, restricted tools',
    filters: [
      { id: 'RiskCategory', label: 'Risk Category', options: ['Privacy', 'Security', 'Compliance', 'Model risk', 'Data handling'] },
      { id: 'Severity', label: 'Severity', options: ['Critical', 'High', 'Normal'] },
      { id: 'MitigationAvailable', label: 'Mitigation Available', options: ['Yes', 'No'] },
    ],
  },
  {
    slug: 'ai-transformation-insights',
    label: 'AI Transformation Insights',
    overview: 'Patterns for scaling adoption—governance, operating model, and change practices that work.',
    searchPlaceholder: 'Search insights… e.g., governance, adoption, operating model',
    filters: [
      { id: 'Theme', label: 'Theme', options: ['Strategy', 'Operating model', 'Adoption', 'Governance', 'Change'] },
      { id: 'Stage', label: 'Stage', options: ['Discern', 'Design', 'Deploy', 'Drive'] },
      { id: 'ReadTime', label: 'Read Time', options: ['Under 5 min', '5–10 min', 'Over 10 min'] },
    ],
  },
  {
    slug: 'dco-intelligence-briefs',
    label: 'DCO Intelligence Briefs',
    overview: 'DCO-grade briefs on decision quality and Man + Machine collaboration—what good looks like and how to measure it.',
    searchPlaceholder: 'Search DCO briefs… e.g., decision quality, Man+Machine',
    filters: [
      { id: 'DCOTheme', label: 'DCO Theme', options: ['Cognition', 'Decision quality', 'Man+Machine', 'Governance', 'Value'] },
      { id: 'AudienceLevel', label: 'Audience Level', options: ['Exec', 'Leaders', 'Practitioners'] },
      { id: 'ReadTime', label: 'Read Time', options: ['Under 5 min', '5–10 min', 'Over 10 min'] },
    ],
  },
  {
    slug: 'enterprise-use-cases',
    label: 'Enterprise Use Cases',
    overview: 'Use cases mapped to functions and patterns to accelerate adoption with proven examples.',
    searchPlaceholder: 'Search use cases… e.g., HR, finance, agent, copilot',
    filters: [
      { id: 'Function', label: 'Function', options: ['HR', 'Finance', 'Ops', 'Legal', 'Product', 'Delivery', 'Support'] },
      { id: 'Pattern', label: 'Pattern', options: ['Copilot', 'RAG', 'Agent', 'Workflow automation'] },
      { id: 'Maturity', label: 'Maturity', options: ['Idea', 'Validated', 'In delivery', 'Live'] },
      { id: 'ValueBand', label: 'Value Band', options: ['Low', 'Medium', 'High'] },
    ],
  },
  {
    slug: 'industry-analysis',
    label: 'Industry Analysis',
    overview: 'External AI trends by industry and horizon that shape strategy and competitive advantage.',
    searchPlaceholder: 'Search industry analysis… e.g., finance, healthcare, regulation',
    filters: [
      { id: 'Industry', label: 'Industry', options: ['Public sector', 'Finance', 'Retail', 'Healthcare', 'Manufacturing', 'Other'] },
      { id: 'TrendType', label: 'Trend Type', options: ['Market', 'Tech', 'Regulation', 'Competitive'] },
      { id: 'Horizon', label: 'Horizon', options: ['Now', '6–12 months', '12–24 months'] },
    ],
  },
];

export const SEED_DATA: InsightItem[] = [
  // ── Enterprise AI Updates ──────────────────────────────────────────────
  { id: 'u1', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'New Approved Copilot: SpecWriter v1', summary: 'SpecWriter v1 is now approved for writing technical specifications, architecture docs, and API documentation. Includes templates for requirements and design docs.', date: '2026-03-25', owner: 'DIA.AI', source: 'Internal', tags: ['copilot', 'tools', 'approved'], UpdateType: 'Tool update', Impact: 'High', Status: 'Approved' },
  { id: 'u2', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'Azure OpenAI Service Update: GPT-4 Turbo Now Available', summary: 'GPT-4 Turbo is now available in our Azure OpenAI deployment. Offers 128K context window and improved performance at lower cost.', date: '2026-03-22', owner: 'Architecture', source: 'Internal', tags: ['azure', 'openai', 'gpt-4'], UpdateType: 'Platform update', Impact: 'High', Status: 'Approved' },
  { id: 'u3', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'Platform Announcement: AI Governance Dashboard v2.0', summary: 'New governance dashboard with real-time usage tracking, compliance monitoring, and automated policy enforcement across all AI tools.', date: '2026-03-20', owner: 'Governance', source: 'Internal', tags: ['governance', 'dashboard', 'compliance'], UpdateType: 'Announcement', Impact: 'High', Status: 'Approved' },
  { id: 'u4', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'New Tool Approval: Claude 3.5 Sonnet for Code Review', summary: 'Claude 3.5 Sonnet is now approved for code review workflows. Excels at understanding complex codebases and providing detailed feedback.', date: '2026-03-18', owner: 'Architecture', source: 'Internal', tags: ['claude', 'code-review', 'approved'], UpdateType: 'Tool update', Impact: 'Medium', Status: 'Approved' },
  { id: 'u5', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'Capability Update: RAG Pipeline Templates Now Available', summary: 'Pre-built RAG pipeline templates for common use cases. Includes document injection, chunking strategies, and retrieval optimization.', date: '2026-03-15', owner: 'Architecture', source: 'Internal', tags: ['rag', 'templates', 'pipeline'], UpdateType: 'Capability update', Impact: 'Medium', Status: 'Approved' },
  { id: 'u6', tab: 'enterprise-ai-updates', typePill: 'Enterprise Update', title: 'Announcement: AI Office Hours Every Thursday', summary: 'Join weekly AI office hours for questions, demos, and guidance. Thursdays 2–3 pm, open to all teams. Recordings available on SharePoint.', date: '2026-03-10', owner: 'DIA.AI', source: 'Internal', tags: ['office-hours', 'support', 'community'], UpdateType: 'Announcement', Impact: 'Low', Status: 'Approved' },

  // ── Model Release Briefings ────────────────────────────────────────────
  { id: 'm1', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'GPT-4.5 Turbo — What Teams Need to Know', summary: 'OpenAI\'s latest model brings improved reasoning, longer context, and better instruction following. Approved for enterprise use via Azure.', date: '2026-03-24', owner: 'Architecture', source: 'External', tags: ['gpt-4', 'openai', 'approved'], Vendor: 'OpenAI', ModelFamily: 'GPT', Recommendation: 'Approved', UseType: 'Analysis', Status: 'Approved' },
  { id: 'm2', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'Claude 3.7 Sonnet: Extended Thinking Mode', summary: 'Anthropic releases extended thinking mode for complex reasoning tasks. Best for multi-step analysis, legal review, and strategic planning.', date: '2026-03-21', owner: 'Architecture', source: 'External', tags: ['claude', 'anthropic', 'reasoning'], Vendor: 'Anthropic', ModelFamily: 'Claude', Recommendation: 'Pilot', UseType: 'Analysis', Status: 'Approved' },
  { id: 'm3', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'Gemini 2.0 Flash: Speed vs Quality Trade-offs', summary: 'Google\'s Gemini 2.0 Flash offers 10x faster inference at reduced cost. Suitable for high-volume, lower-complexity tasks.', date: '2026-03-19', owner: 'Architecture', source: 'External', tags: ['gemini', 'google', 'speed'], Vendor: 'Google', ModelFamily: 'Gemini', Recommendation: 'Pilot', UseType: 'Writing', Status: 'Approved' },
  { id: 'm4', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'GPT-o3: Advanced Reasoning for Complex Problems', summary: 'OpenAI\'s o3 model excels at mathematical reasoning, code generation, and scientific analysis. Not yet approved for production use.', date: '2026-03-17', owner: 'Architecture', source: 'External', tags: ['gpt-o3', 'reasoning', 'openai'], Vendor: 'OpenAI', ModelFamily: 'GPT', Recommendation: 'Not approved', UseType: 'Coding', Status: 'Approved' },
  { id: 'm5', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'Microsoft Phi-4: Small Model, Big Performance', summary: 'Phi-4 delivers near-GPT-4 performance at a fraction of the cost. Ideal for edge deployment and cost-sensitive workloads.', date: '2026-03-14', owner: 'Architecture', source: 'External', tags: ['phi-4', 'microsoft', 'small-model'], Vendor: 'Microsoft', ModelFamily: 'Other', Recommendation: 'Pilot', UseType: 'Coding', Status: 'Approved' },
  { id: 'm6', tab: 'model-release-briefings', typePill: 'Model Briefing', title: 'Llama 3.3 70B: Open Source Option for Sensitive Data', summary: 'Meta\'s Llama 3.3 70B can be self-hosted for sensitive data workloads. Architecture team evaluating for on-premise deployment.', date: '2026-03-11', owner: 'Architecture', source: 'External', tags: ['llama', 'open-source', 'self-hosted'], Vendor: 'Other', ModelFamily: 'Other', Recommendation: 'Pilot', UseType: 'Analysis', Status: 'Approved' },

  // ── Regulatory Alerts ─────────────────────────────────────────────────
  { id: 'r1', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'EU AI Act: High-Risk System Classification Deadline', summary: 'Organizations must classify and register high-risk AI systems by August 2026. HR screening, credit scoring, and biometric tools are in scope.', date: '2026-03-26', owner: 'Risk', source: 'External', tags: ['eu-ai-act', 'compliance', 'deadline'], Region: 'EU', ActionRequired: 'Yes', Status: 'Approved' },
  { id: 'r2', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'UAE AI Governance Framework: Updated Requirements', summary: 'UAE has updated its national AI governance framework. New requirements for transparency, accountability, and human oversight in AI systems.', date: '2026-03-23', owner: 'Risk', source: 'External', tags: ['uae', 'governance', 'framework'], Region: 'UAE', ActionRequired: 'Yes', Status: 'Approved' },
  { id: 'r3', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'GDPR Update: AI-Generated Content and Data Rights', summary: 'European Data Protection Board clarifies GDPR application to AI-generated content. Individuals have right to explanation for AI decisions.', date: '2026-03-20', owner: 'Risk', source: 'External', tags: ['gdpr', 'data-rights', 'eu'], Region: 'EU', ActionRequired: 'No', Status: 'Approved' },
  { id: 'r4', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'US Executive Order on AI: Federal Contractor Requirements', summary: 'Federal contractors must now disclose AI use in deliverables and comply with new safety standards for AI systems used in government work.', date: '2026-03-18', owner: 'Risk', source: 'External', tags: ['us', 'federal', 'contractors'], Region: 'US', ActionRequired: 'Yes', Status: 'Approved' },
  { id: 'r5', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'Global AI Safety Summit: Voluntary Commitments Update', summary: 'Major AI providers have updated voluntary safety commitments. Includes red-teaming requirements and incident reporting protocols.', date: '2026-03-15', owner: 'Governance', source: 'External', tags: ['safety', 'global', 'commitments'], Region: 'Global', ActionRequired: 'No', Status: 'Approved' },
  { id: 'r6', tab: 'regulatory-alerts', typePill: 'Regulatory Alert', title: 'ISO 42001 AI Management System: Certification Path', summary: 'ISO 42001 certification is now available. Organizations can demonstrate AI governance maturity through third-party audit and certification.', date: '2026-03-12', owner: 'Governance', source: 'External', tags: ['iso', 'certification', 'management'], Region: 'Global', ActionRequired: 'No', Status: 'Approved' },

  // ── Risk Advisories ───────────────────────────────────────────────────
  { id: 'ri1', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'Do Not Paste Client Data into Public AI Tools', summary: 'Critical reminder: pasting client data, PII, or confidential information into public AI tools violates data protection policies and client agreements.', date: '2026-03-27', owner: 'Risk', source: 'Internal', tags: ['client-data', 'privacy', 'critical'], RiskCategory: 'Privacy', Severity: 'Critical', MitigationAvailable: 'Yes', Status: 'Approved' },
  { id: 'ri2', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'Prompt Injection Attacks: What to Watch For', summary: 'Adversarial prompts can manipulate AI systems to bypass safety controls. Teams building AI applications must implement input validation.', date: '2026-03-24', owner: 'Architecture', source: 'Internal', tags: ['prompt-injection', 'security', 'attacks'], RiskCategory: 'Security', Severity: 'High', MitigationAvailable: 'Yes', Status: 'Approved' },
  { id: 'ri3', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'AI Hallucination Risk in Legal and Financial Documents', summary: 'AI models can generate plausible but incorrect information. All AI-generated legal and financial content must be reviewed by qualified professionals.', date: '2026-03-22', owner: 'Risk', source: 'Internal', tags: ['hallucination', 'legal', 'financial'], RiskCategory: 'Compliance', Severity: 'High', MitigationAvailable: 'Yes', Status: 'Approved' },
  { id: 'ri4', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'Model Drift: Monitoring AI Performance Over Time', summary: 'AI models can degrade in performance as data distributions shift. Production AI systems require ongoing monitoring and periodic revalidation.', date: '2026-03-19', owner: 'Architecture', source: 'Internal', tags: ['model-drift', 'monitoring', 'performance'], RiskCategory: 'Model risk', Severity: 'Normal', MitigationAvailable: 'Yes', Status: 'Approved' },
  { id: 'ri5', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'Third-Party AI API Data Retention Policies', summary: 'Review data retention policies for all third-party AI APIs. Some providers retain prompts for up to 30 days for safety monitoring.', date: '2026-03-16', owner: 'Risk', source: 'Internal', tags: ['api', 'data-retention', 'third-party'], RiskCategory: 'Data handling', Severity: 'Normal', MitigationAvailable: 'No', Status: 'Approved' },
  { id: 'ri6', tab: 'risk-advisories', typePill: 'Risk Advisory', title: 'Bias in AI Hiring Tools: Compliance Requirements', summary: 'AI tools used in hiring decisions must be audited for bias. New compliance requirements mandate annual bias assessments for HR AI tools.', date: '2026-03-13', owner: 'Risk', source: 'Internal', tags: ['bias', 'hiring', 'compliance'], RiskCategory: 'Compliance', Severity: 'High', MitigationAvailable: 'Yes', Status: 'Approved' },

  // ── AI Transformation Insights ────────────────────────────────────────
  { id: 'i1', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'The 5 Patterns of Successful AI Adoption at Scale', summary: 'Analysis of 50+ enterprise AI programs reveals five consistent patterns: governance-first, use-case focus, change management, measurement, and iteration.', date: '2026-03-26', owner: 'DIA.AI', source: 'Internal', tags: ['adoption', 'patterns', 'scale'], Theme: 'Adoption', Stage: 'Discern', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'i2', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'Building an AI Operating Model: From CoE to Embedded', summary: 'How to evolve from a centralized AI Center of Excellence to an embedded model where AI capability lives in every business unit.', date: '2026-03-23', owner: 'DIA.AI', source: 'Internal', tags: ['operating-model', 'coe', 'embedded'], Theme: 'Operating model', Stage: 'Design', ReadTime: 'Over 10 min', Status: 'Approved' },
  { id: 'i3', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'AI Governance That Enables Rather Than Blocks', summary: 'Governance frameworks that are too restrictive kill adoption. This insight covers the balance between control and enablement.', date: '2026-03-21', owner: 'Governance', source: 'Internal', tags: ['governance', 'enablement', 'balance'], Theme: 'Governance', Stage: 'Discern', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'i4', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'Change Management for AI: What\'s Different This Time', summary: 'AI transformation requires different change management approaches than previous technology waves. Focus on mindset, not just skills.', date: '2026-03-18', owner: 'DIA.AI', source: 'Internal', tags: ['change-management', 'mindset', 'transformation'], Theme: 'Change', Stage: 'Deploy', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'i5', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'Measuring AI Value: Beyond Cost Savings', summary: 'Most AI ROI frameworks focus on cost reduction. This insight covers quality improvement, speed, decision quality, and strategic value metrics.', date: '2026-03-15', owner: 'DIA.AI', source: 'Internal', tags: ['roi', 'value', 'measurement'], Theme: 'Strategy', Stage: 'Drive', ReadTime: 'Under 5 min', Status: 'Approved' },
  { id: 'i6', tab: 'ai-transformation-insights', typePill: 'Transformation Insight', title: 'AI Strategy Playbook: From Vision to Roadmap', summary: 'Step-by-step guide to developing an enterprise AI strategy. Covers vision setting, capability assessment, prioritization, and roadmap development.', date: '2026-03-12', owner: 'DIA.AI', source: 'Internal', tags: ['strategy', 'playbook', 'roadmap'], Theme: 'Strategy', Stage: 'Discern', ReadTime: 'Over 10 min', Status: 'Approved' },

  // ── DCO Intelligence Briefs ───────────────────────────────────────────
  { id: 'd1', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'Decision Quality in the Age of AI: A Framework', summary: 'How AI changes the nature of decision-making. Framework for assessing decision quality when AI is involved in the process.', date: '2026-03-25', owner: 'DIA.AI', source: 'Internal', tags: ['decision-quality', 'framework', 'dco'], DCOTheme: 'Decision quality', AudienceLevel: 'Leaders', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'd2', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'Man + Machine: Designing Effective Collaboration Patterns', summary: 'The most effective AI deployments combine human judgment with machine capability. This brief covers the key collaboration patterns.', date: '2026-03-22', owner: 'DIA.AI', source: 'Internal', tags: ['man-machine', 'collaboration', 'patterns'], DCOTheme: 'Man+Machine', AudienceLevel: 'Practitioners', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'd3', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'Cognitive Augmentation: Enhancing Human Thinking with AI', summary: 'AI as a cognitive prosthetic. How to design AI systems that enhance rather than replace human cognitive capabilities.', date: '2026-03-20', owner: 'DIA.AI', source: 'Internal', tags: ['cognition', 'augmentation', 'human'], DCOTheme: 'Cognition', AudienceLevel: 'Exec', ReadTime: 'Under 5 min', Status: 'Approved' },
  { id: 'd4', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'AI Governance for Decision-Makers: The Executive Brief', summary: 'What executives need to know about AI governance. Covers accountability, oversight, risk tolerance, and strategic governance decisions.', date: '2026-03-17', owner: 'Governance', source: 'Internal', tags: ['governance', 'executive', 'accountability'], DCOTheme: 'Governance', AudienceLevel: 'Exec', ReadTime: 'Under 5 min', Status: 'Approved' },
  { id: 'd5', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'Measuring the Value of AI-Augmented Decisions', summary: 'How to quantify the value created when AI augments human decision-making. Metrics, measurement approaches, and case studies.', date: '2026-03-14', owner: 'DIA.AI', source: 'Internal', tags: ['value', 'measurement', 'decisions'], DCOTheme: 'Value', AudienceLevel: 'Leaders', ReadTime: '5–10 min', Status: 'Approved' },
  { id: 'd6', tab: 'dco-intelligence-briefs', typePill: 'DCO Brief', title: 'The Practitioner\'s Guide to AI-Assisted Analysis', summary: 'Practical guide for analysts using AI tools. Covers prompt design, output validation, bias checking, and documentation requirements.', date: '2026-03-11', owner: 'DIA.AI', source: 'Internal', tags: ['analysis', 'practitioners', 'guide'], DCOTheme: 'Decision quality', AudienceLevel: 'Practitioners', ReadTime: 'Over 10 min', Status: 'Approved' },

  // ── Enterprise Use Cases ──────────────────────────────────────────────
  { id: 'uc1', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'HR Onboarding Copilot — Live in Production', summary: 'AI copilot that guides new employees through onboarding, answers policy questions, and connects them with the right resources. 40% reduction in HR queries.', date: '2026-03-25', owner: 'DIA.AI', source: 'Internal', tags: ['hr', 'onboarding', 'copilot'], Function: 'HR', Pattern: 'Copilot', Maturity: 'Live', ValueBand: 'High', Status: 'Approved' },
  { id: 'uc2', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'Finance Report Generation: From Hours to Minutes', summary: 'RAG-based system that generates monthly financial reports from structured data. Reduces report preparation time from 4 hours to 15 minutes.', date: '2026-03-22', owner: 'DIA.AI', source: 'Internal', tags: ['finance', 'reporting', 'rag'], Function: 'Finance', Pattern: 'RAG', Maturity: 'Live', ValueBand: 'High', Status: 'Approved' },
  { id: 'uc3', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'Legal Contract Review Agent: Pilot Results', summary: 'AI agent that reviews contracts for standard clauses, flags risks, and suggests amendments. Pilot with legal team showed 60% time savings.', date: '2026-03-20', owner: 'DIA.AI', source: 'Internal', tags: ['legal', 'contracts', 'agent'], Function: 'Legal', Pattern: 'Agent', Maturity: 'Validated', ValueBand: 'High', Status: 'Approved' },
  { id: 'uc4', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'Customer Support Workflow Automation', summary: 'Automated triage and routing of customer support tickets using AI classification. 35% reduction in first-response time.', date: '2026-03-18', owner: 'DIA.AI', source: 'Internal', tags: ['support', 'automation', 'triage'], Function: 'Support', Pattern: 'Workflow automation', Maturity: 'In delivery', ValueBand: 'Medium', Status: 'Approved' },
  { id: 'uc5', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'Product Requirements Copilot: Design Phase', summary: 'Copilot that helps product managers write better requirements by suggesting acceptance criteria, edge cases, and user story formats.', date: '2026-03-15', owner: 'DIA.AI', source: 'Internal', tags: ['product', 'requirements', 'copilot'], Function: 'Product', Pattern: 'Copilot', Maturity: 'Validated', ValueBand: 'Medium', Status: 'Approved' },
  { id: 'uc6', tab: 'enterprise-use-cases', typePill: 'Use Case', title: 'Ops Incident Response: AI-Assisted Runbooks', summary: 'AI system that surfaces relevant runbooks and past incident data during live incidents. Reduces mean time to resolution by 25%.', date: '2026-03-12', owner: 'Architecture', source: 'Internal', tags: ['ops', 'incidents', 'runbooks'], Function: 'Ops', Pattern: 'RAG', Maturity: 'Live', ValueBand: 'High', Status: 'Approved' },

  // ── Industry Analysis ─────────────────────────────────────────────────
  { id: 'ia1', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'Financial Services AI: From Chatbots to Autonomous Agents', summary: 'The financial services sector is moving beyond chatbots to autonomous AI agents for trading, compliance, and customer service. Key trends and implications.', date: '2026-03-26', owner: 'DIA.AI', source: 'External', tags: ['finance', 'agents', 'autonomous'], Industry: 'Finance', TrendType: 'Tech', Horizon: 'Now', Status: 'Approved' },
  { id: 'ia2', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'Healthcare AI: Diagnostic Models Reaching Clinical Grade', summary: 'AI diagnostic models are achieving clinical-grade accuracy in radiology, pathology, and genomics. Regulatory approval pathways are accelerating.', date: '2026-03-23', owner: 'DIA.AI', source: 'External', tags: ['healthcare', 'diagnostics', 'clinical'], Industry: 'Healthcare', TrendType: 'Tech', Horizon: '6–12 months', Status: 'Approved' },
  { id: 'ia3', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'Public Sector AI Adoption: Governance Challenges', summary: 'Government agencies face unique challenges in AI adoption: procurement rules, transparency requirements, and public accountability.', date: '2026-03-21', owner: 'DIA.AI', source: 'External', tags: ['public-sector', 'government', 'governance'], Industry: 'Public sector', TrendType: 'Regulation', Horizon: 'Now', Status: 'Approved' },
  { id: 'ia4', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'Retail AI: Personalization at Scale and Privacy Trade-offs', summary: 'Retailers are deploying AI personalization at scale, but consumer privacy concerns and regulation are creating new constraints.', date: '2026-03-19', owner: 'DIA.AI', source: 'External', tags: ['retail', 'personalization', 'privacy'], Industry: 'Retail', TrendType: 'Market', Horizon: 'Now', Status: 'Approved' },
  { id: 'ia5', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'Manufacturing AI: Predictive Maintenance ROI Analysis', summary: 'Analysis of 200+ manufacturing AI deployments shows predictive maintenance delivers the highest and most consistent ROI across all AI use cases.', date: '2026-03-16', owner: 'DIA.AI', source: 'External', tags: ['manufacturing', 'predictive-maintenance', 'roi'], Industry: 'Manufacturing', TrendType: 'Market', Horizon: '6–12 months', Status: 'Approved' },
  { id: 'ia6', tab: 'industry-analysis', typePill: 'Industry Analysis', title: 'AI Regulation Horizon: What\'s Coming in 2026–2027', summary: 'Comprehensive overview of AI regulation expected in the next 12–24 months across major jurisdictions. Includes compliance preparation guidance.', date: '2026-03-13', owner: 'Risk', source: 'External', tags: ['regulation', 'horizon', 'compliance'], Industry: 'Other', TrendType: 'Regulation', Horizon: '12–24 months', Status: 'Approved' },
];
