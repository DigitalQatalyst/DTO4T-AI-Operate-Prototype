import { motion } from "framer-motion";
import { Search, Pencil, Rocket, TrendingUp, ArrowRight, BookOpen, GraduationCap, Library, Shield, Layers, Lightbulb, FileText, Package, GitBranch, MessageSquare, Network, Grid3x3, ShoppingCart, FileCode, Workflow, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const D4ModelSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const stages = [
    {
      icon: Search,
      name: "Discern",
      color: "#FFFFFF",
      description: "Understand needs, uncover opportunities, and identify relevant AI services and pathways",
      marketplaces: [
        {
          icon: BookOpen,
          tag: "COGNITIVE LITERACY",
          title: "AI Updates & Insights Center",
          subtitle: "Curated AI Updates",
          description: "A governed feed of AI updates and decision briefs — what changed, why it matters, and actions teams should take.",
          link: "/discern"
        },
        {
          icon: GraduationCap,
          tag: "COGNITIVE LITERACY",
          title: "AI Learning Center",
          subtitle: "Structured Enablement",
          description: "Role-based AI learning pathways from literacy to advanced prompt engineering.",
          link: "/learning"
        },
        {
          icon: Library,
          tag: "KNOWLEDGE MANAGEMENT",
          title: "AI Knowledge Center",
          subtitle: "Enterprise AI Knowledge Base",
          description: "Strategy, policies, guardrails, and governance documentation for AI adoption.",
          link: "/knowledge"
        }
      ]
    },
    {
      icon: Pencil,
      name: "Design",
      color: "#FFFFFF",
      description: "Shape the right request, workflow, service model, or solution direction",
      marketplaces: [
        {
          icon: Shield,
          tag: "GOVERNANCE",
          title: "AI Governance Frameworks",
          subtitle: "Enterprise Governance Models",
          description: "Governance models, accountability structures, and responsible AI principles.",
          link: "/aiops-framework"
        },
        {
          icon: Layers,
          tag: "ARCHITECTURE",
          title: "AI Architecture Blueprints",
          subtitle: "Proven Design Patterns",
          description: "Architecture patterns for LLMs, RAG, agents, orchestration, and security.",
          link: "/blueprint"
        },
        {
          icon: Lightbulb,
          tag: "USE CASES",
          title: "AI Use Case Marketplace",
          subtitle: "Business-Ready AI Use Cases",
          description: "Explore, assess, and prioritise AI use cases with value scoring.",
          link: "/usecase"
        },
        {
          icon: FileText,
          tag: "SPECIFICATION",
          title: "AI Specification Studio",
          subtitle: "Structured Spec Templates",
          description: "Specification templates for AI models, agents, prompts, and workflows.",
          link: "/design"
        }
      ]
    },
    {
      icon: Rocket,
      name: "Deploy",
      color: "#FFFFFF",
      description: "Execute, fulfil, implement, and operationalise AI into the business",
      marketplaces: [
        {
          icon: Package,
          tag: "ASSETS",
          title: "AI Asset Library",
          subtitle: "Reusable AI Components",
          description: "Versioned prompts, agents, workflows, and evaluation frameworks.",
          link: "/deploys"
        },
        {
          icon: GitBranch,
          tag: "MLOPS",
          title: "Model Operations (MLOps)",
          subtitle: "ML Lifecycle Management",
          description: "Full ML model lifecycle from build to monitoring.",
          link: "/mlops"
        },
        {
          icon: MessageSquare,
          tag: "BOTOPS",
          title: "Conversational Systems",
          subtitle: "Bot Configuration & Operations",
          description: "Configure, test, and monitor conversational AI systems.",
          link: "/botops"
        },
        {
          icon: Network,
          tag: "AGENTOPS",
          title: "Agent Operations",
          subtitle: "AI Agent Orchestration",
          description: "Orchestrate, monitor, and govern AI agents.",
          link: "/agentops"
        }
      ]
    },
    {
      icon: TrendingUp,
      name: "Drive",
      color: "#FFFFFF",
      description: "Govern, monitor, optimise, and realise measurable business value",
      marketplaces: [
        {
          icon: Grid3x3,
          tag: "PRODUCTIVITY",
          title: "AI Workspace",
          subtitle: "Role-Based AI Workspaces",
          description: "Role-based copilots and task assistants for day-to-day AI work.",
          link: "/drive"
        },
        {
          icon: ShoppingCart,
          tag: "SERVICES",
          title: "AI Service Marketplace",
          subtitle: "Enterprise AI Services",
          description: "Browse, request, and manage AI services across the organisation.",
          link: "/drive"
        },
        {
          icon: FileCode,
          tag: "PROMPTS",
          title: "Prompt Library",
          subtitle: "Governed Prompt Catalogue",
          description: "Curated prompts with analytics, version control, and governance.",
          link: "/drive"
        },
        {
          icon: Workflow,
          tag: "ORCHESTRATION",
          title: "AI Orchestration Hub",
          subtitle: "Workflow Execution",
          description: "Monitor and manage AI workflow execution across the enterprise.",
          link: "/drive"
        },
        {
          icon: TrendingUp,
          tag: "VALUE TRACKING",
          title: "AI Performance & Value",
          subtitle: "ROI Tracking",
          description: "Track AI adoption rates, productivity gains, and ROI.",
          link: "/drive"
        },
        {
          icon: Activity,
          tag: "MONITORING",
          title: "AI Monitoring Center",
          subtitle: "System Health & Compliance",
          description: "Monitor AI systems for bias, fairness, drift, and reliability.",
          link: "/drive"
        }
      ]
    },
  ];

  return (
    <section id="d4-model" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">
              THE D4 MODEL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            One Platform. One Journey. Four Stages.
          </h2>
          
          {/* 4D Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition shadow-md ${
                activeFilter === "all"
                  ? "bg-accent text-white"
                  : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("discern")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === "discern"
                  ? "bg-accent text-white shadow-md"
                  : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Discern
            </button>
            <button
              onClick={() => setActiveFilter("design")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === "design"
                  ? "bg-accent text-white shadow-md"
                  : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Design
            </button>
            <button
              onClick={() => setActiveFilter("deploy")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === "deploy"
                  ? "bg-accent text-white shadow-md"
                  : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Deploy
            </button>
            <button
              onClick={() => setActiveFilter("drive")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === "drive"
                  ? "bg-accent text-white shadow-md"
                  : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Drive
            </button>
          </div>
        </motion.div>

        {/* Stages with Marketplaces */}
        {/* Stages with Marketplaces */}
        {stages
          .filter(stage => activeFilter === "all" || stage.name.toLowerCase() === activeFilter)
          .map((stage, stageIndex) => {
          const StageIcon = stage.icon;
          return (
            <div key={stage.name} className="mb-16">
              {/* Stage Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent/10">
                  <StageIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stage.name}</h3>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
              </motion.div>

              {/* Marketplace Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stage.marketplaces.map((marketplace, index) => {
                  const MarketIcon = marketplace.icon;
                  return (
                    <motion.div
                      key={marketplace.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:bg-white/10 hover:border-[#3B6EF8]/50 transition-all group"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-accent/10">
                        <MarketIcon className="h-5 w-5 text-accent" />
                      </div>

                      {/* Tag */}
                      <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded mb-3 bg-accent/10 text-accent">
                        {marketplace.tag}
                      </span>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {marketplace.title}
                      </h4>

                      {/* Subtitle */}
                      <p className="text-xs text-gray-500 mb-3">
                        {marketplace.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {marketplace.description}
                      </p>

                      {/* CTA */}
                      <Link
                        to={marketplace.link}
                        className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-[#3B6EF8] transition-colors group-hover:gap-3"
                      >
                        Explore Marketplace
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider between stages */}
              {stageIndex < stages.length - 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 text-white/20">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
                  <ArrowRight className="h-4 w-4" />
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/10 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default D4ModelSection;
