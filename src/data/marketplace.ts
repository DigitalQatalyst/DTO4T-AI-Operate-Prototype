import { BookOpen, Shield, Wrench, Rocket, type LucideIcon } from "lucide-react";

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
    intro: "Build enterprise-wide AI awareness through curated news, insights, learning, and knowledge resources.",
    products: [
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI News Center", subtitle: "Curated AI Updates", desc: "Real-time AI developments filtered for enterprise relevance and strategic awareness.", cta: "Explore" },
      { icon: BookOpen, tag: "Cognitive Literacy", name: "AI Insight Center", subtitle: "Strategic Intelligence", desc: "Analyst-grade AI insights mapped to enterprise priorities and decision-making.", cta: "Explore" },
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
    intro: "Govern AI adoption with structured frameworks, blueprints, intake processes, and specification tools.",
    products: [
      { icon: Shield, tag: "Governance & Architecture", name: "AIOps Framework Library", subtitle: "Reusable Frameworks", desc: "Reusable governance frameworks for AI lifecycle, ethics, and operational standards.", cta: "Explore" },
      { icon: Shield, tag: "Governance & Architecture", name: "AIOps Blueprint Library", subtitle: "Architecture Blueprints", desc: "Pre-built architecture blueprints for common AI deployment scenarios.", cta: "Explore" },
      { icon: Shield, tag: "Governance & Architecture", name: "AI Use Case Intake", subtitle: "Structured Intake", desc: "Standardised intake process for evaluating, prioritising, and approving AI use cases.", cta: "Explore" },
      { icon: Shield, tag: "Design & Spec", name: "AI Specification Studio", subtitle: "DocWriter", desc: "Collaborative workspace for defining AI solution specifications and requirements.", cta: "Explore" },
    ],
  },
  {
    id: "deploys",
    filterLabel: "03 Deploys",
    label: "CLASS 03",
    name: "DEPLOYS",
    icon: Wrench,
    intro: "Industrialise AI delivery through build libraries and governed lifecycle management for models, bots, and agents.",
    products: [
      { icon: Wrench, tag: "Industrialisation", name: "AIOps Build Library", subtitle: "Components & Accelerators", desc: "Pre-built AI components, connectors, and accelerators for rapid deployment.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Model Lifecycle (MLOps)", subtitle: "Training & Versioning", desc: "End-to-end model training, versioning and management.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Bot Lifecycle (BotOps)", subtitle: "Conversational AI", desc: "Governed lifecycle management for conversational AI and chatbot deployments.", cta: "Explore" },
      { icon: Wrench, tag: "Industrialisation", name: "Agent Lifecycle (AgentOps)", subtitle: "Autonomous Agents", desc: "End-to-end lifecycle governance for autonomous AI agents.", cta: "Explore" },
    ],
  },
  {
    id: "drive",
    filterLabel: "04 Drive",
    label: "CLASS 04",
    name: "DRIVE",
    icon: Rocket,
    intro: "Operate and scale AI across the enterprise with self-service portals, prompt libraries, orchestration, and value tracking.",
    products: [
      { icon: Rocket, tag: "Operate & Scale", name: "AI Self-Service Portal", subtitle: "User Access Layer", desc: "Unified portal for discovering, requesting, and accessing AI capabilities.", cta: "Explore" },
      { icon: Rocket, tag: "Prompt Management", name: "Enterprise Prompt Library", subtitle: "Governed Prompts", desc: "Curated and governed prompt templates for consistent, high-quality AI interactions.", cta: "Explore" },
      { icon: Rocket, tag: "Workflow Orchestration", name: "AI Orchestration Hub", subtitle: "Cross-Domain Coordination", desc: "Central orchestration layer coordinating AI services across business domains.", cta: "Explore" },
      { icon: Rocket, tag: "Impact Measurement", name: "AI Value Dashboard", subtitle: "ROI Tracking", desc: "Real-time tracking of AI adoption, productivity uplift, and transformation ROI.", cta: "Explore" },
    ],
  },
];
