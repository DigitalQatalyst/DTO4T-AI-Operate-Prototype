import { BookOpen, Shield, Wrench, Rocket, AlertTriangle, FileText, FlaskConical, type LucideIcon } from "lucide-react";

export interface MarketplaceProduct {
  icon: LucideIcon;
  tag: string;
  name: string;
  subtitle: string;
  desc: string;
  cta: string;
}

export interface MarketplaceClass {
  id: string;
  filterLabel: string;
  label: string;
  name: string;
  icon: LucideIcon;
  intro: string;
  products: MarketplaceProduct[];
}

export const marketplaceClasses: MarketplaceClass[] = [
  {
    id: "discern",
    filterLabel: "01 Discern",
    label: "CLASS 01",
    name: "DISCERN",
    icon: BookOpen,
    intro: "Build shared AI fluency before scaling automation. Curated news, insights, learning, and knowledge resources.",
    products: [
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI News Center", subtitle: "Curated AI Updates", desc: "Real-time AI developments filtered for enterprise relevance and strategic awareness.", cta: "Explore" },
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI Insight Center", subtitle: "Strategic Intelligence", desc: "Analyst-grade AI insights mapped to enterprise priorities and decision-making.", cta: "Explore" },
      { icon: AlertTriangle, tag: "Risk & Regulatory", name: "AI Risk & Regulatory Alerts", subtitle: "Compliance Monitoring", desc: "Automated alerts on AI regulation changes, risk advisories, and compliance updates.", cta: "Explore" },
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI Learning Center", subtitle: "Structured Enablement", desc: "Role-based AI learning pathways from literacy to advanced prompt engineering.", cta: "Explore" },
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI Knowledge Center", subtitle: "Policy & Guidelines", desc: "Strategy, policies, guardrails, and governance documentation for AI adoption.", cta: "Explore" },
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI Glossary", subtitle: "LLM / RAG / Agents", desc: "Enterprise-grade glossary covering foundational and advanced AI terminology.", cta: "Explore" },
      { icon: BookOpen, tag: "Community", name: "AI Community & Office Hours", subtitle: "Collaboration", desc: "Peer learning, expert sessions, and structured knowledge sharing for AI practitioners.", cta: "Explore" },
    ],
  },
  {
    id: "designs",
    filterLabel: "02 Designs",
    label: "CLASS 02",
    name: "DESIGNS",
    icon: Shield,
    intro: "Ensure AI initiatives are intentional, architecturally aligned, risk-aware, and value-designed before deployment.",
    products: [
      { icon: Shield, tag: "Governance & Architecture", name: "AIOps Framework Library", subtitle: "Reusable Frameworks", desc: "Reusable governance frameworks for AI lifecycle, ethics, and operational standards.", cta: "Explore" },
      { icon: Shield, tag: "Governance & Architecture", name: "AIOps Blueprint Library", subtitle: "Architecture Blueprints", desc: "Pre-built architecture blueprints for common AI deployment scenarios.", cta: "Explore" },
      { icon: Shield, tag: "Governance & Architecture", name: "AI Use Case Intake & Scoring", subtitle: "Structured Intake", desc: "Standardised intake process for evaluating, prioritising, and approving AI use cases.", cta: "Explore" },
      { icon: Shield, tag: "Design & Spec", name: "AI Specification Studio", subtitle: "DocWriter", desc: "Collaborative workspace for defining AI solution specifications and requirements.", cta: "Explore" },
      { icon: FileText, tag: "Responsible AI", name: "Model Cards & Documentation Registry", subtitle: "AI Documentation", desc: "Responsible AI documentation including model cards, data sheets, and impact assessments.", cta: "Explore" },
      { icon: FlaskConical, tag: "Quality & Standards", name: "Prompt Standards & Evaluation Lab", subtitle: "Prompt Engineering", desc: "Standardised prompt templates with evaluation benchmarks and quality assurance.", cta: "Explore" },
    ],
  },
  {
    id: "deploys",
    filterLabel: "03 Deploys",
    label: "CLASS 03",
    name: "DEPLOYS",
    icon: Wrench,
    intro: "Turn AI assets into governed, reusable, enterprise-grade capability with lifecycle controls.",
    products: [
      { icon: Wrench, tag: "Industrialisation", name: "AIOps Build Library", subtitle: "Versioned Components", desc: "Versioned prompts, agents, workflows, and evaluation templates for rapid deployment.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Model Lifecycle (MLOps)", subtitle: "Training & Versioning", desc: "End-to-end model training, versioning and management.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Conversational Lifecycle (BotOps)", subtitle: "Conversational AI", desc: "Governed lifecycle management for conversational AI and chatbot deployments.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Agent Lifecycle (AgentOps)", subtitle: "Autonomous Agents", desc: "End-to-end lifecycle governance for autonomous AI agents.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Prompt Management & Release Pipeline", subtitle: "Prompt Ops", desc: "Version-controlled prompt management with release pipelines and rollback.", cta: "Explore" },
      { icon: Wrench, tag: "Quality Assurance", name: "RAG Evaluation & Test Set Builder", subtitle: "RAG Testing", desc: "Build and manage evaluation test sets for retrieval-augmented generation systems.", cta: "Explore" },
      { icon: Wrench, tag: "Digital Twin", name: "Digital Twin Ops (DTOps)", subtitle: "Twin Management", desc: "Operational management of digital twins across the enterprise.", cta: "Explore" },
    ],
  },
  {
    id: "drive",
    filterLabel: "04 Drive",
    label: "CLASS 04",
    name: "DRIVE",
    icon: Rocket,
    intro: "Institutionalise adoption with monitoring, governance, measurable impact, and continuous improvement.",
    products: [
      { icon: Rocket, tag: "Operate & Scale", name: "AI Self-Service Portal", subtitle: "User Access Layer", desc: "Unified portal for discovering, requesting, and accessing AI capabilities.", cta: "Explore" },
      { icon: Rocket, tag: "Service Management", name: "AI Service Request Console", subtitle: "Request Management", desc: "Structured service request console for AI capability provisioning and support.", cta: "Explore" },
      { icon: Rocket, tag: "Prompt Management", name: "Enterprise Prompt Library", subtitle: "Governed Prompts", desc: "Approved prompts with usage metrics and version traceability.", cta: "Explore" },
      { icon: Rocket, tag: "Workflow Orchestration", name: "AI Orchestration Hub", subtitle: "Cross-Domain Coordination", desc: "Central orchestration layer coordinating AI services across business domains.", cta: "Explore" },
      { icon: Rocket, tag: "Impact Measurement", name: "AI Value & Performance Dashboard", subtitle: "ROI Tracking", desc: "Real-time tracking of AI adoption, productivity uplift, and transformation ROI.", cta: "Explore" },
      { icon: Rocket, tag: "Monitoring", name: "Bias/Drift/Performance Monitoring", subtitle: "Model Health", desc: "Continuous monitoring of model bias, data drift, and performance degradation.", cta: "Explore" },
    ],
  },
];
