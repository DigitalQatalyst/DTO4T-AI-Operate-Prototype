import { motion } from "framer-motion";
import { GitBranch, Layers, Shield, Cpu, TrendingUp, Target, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const imperatives = [
  {
    icon: GitBranch,
    number: "1",
    title: "Operational Digital Twin Alignment",
    desc: "Anchor AI models and agents to organisational roles, processes, value streams, and accountability structures.",
  },
  {
    icon: Layers,
    number: "2", 
    title: "Shared Cognitive Standards",
    desc: "Establish reusable prompt patterns, model evaluation criteria, architecture blueprints, and collaboration norms across the enterprise.",
  },
  {
    icon: Shield,
    number: "3",
    title: "Lifecycle Governance by Design",
    desc: "Embed structured intake, validation, release gates, monitoring, and retirement controls across the full AI lifecycle.",
  },
  {
    icon: Cpu,
    number: "4",
    title: "Responsible AI as Infrastructure",
    desc: "Operationalise ethics, explainability, risk classification, auditability, and compliance as built-in system controls—not optional overlays.",
  },
  {
    icon: TrendingUp,
    number: "5",
    title: "Scalable Adoption Pathways",
    desc: "Deploy role-based copilots and governed agent frameworks with clear onboarding, training, and usage guardrails.",
  },
  {
    icon: Target,
    number: "6",
    title: "Measurable Transformation Impact",
    desc: "Link AI initiatives to decision-cycle compression, productivity uplift, risk reduction, and enterprise ROI.",
  },
];

const ImperativesSection = () => (
  <section id="imperatives" className="bg-section-muted py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="How to Succeed with AI" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        The Six DCO Imperatives (AIOps)
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Structural principles that transform AI from experimentation into governed, 
        scalable, and value-generating cognitive infrastructure.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {imperatives.map((imperative, i) => (
          <motion.div
            key={imperative.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 p-6 text-left transition-all hover:bg-white hover:shadow-lg hover:-translate-y-1"
          >
            {/* Number badge in top-right corner */}
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all group-hover:bg-orange-500">
              <span className="text-sm font-bold text-muted-foreground group-hover:text-white transition-all">{imperative.number}</span>
            </div>
            
            {/* Icon */}
            <div className="mb-4">
              <div className="gradient-hero flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110">
                <imperative.icon className="h-5 w-5 text-white transition-all group-hover:scale-110" />
              </div>
            </div>
            
            <h3 className="mb-3 text-base font-bold text-foreground pr-8">{imperative.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{imperative.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <a
          href="#framework"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore the DCO AI Framework
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ImperativesSection;
