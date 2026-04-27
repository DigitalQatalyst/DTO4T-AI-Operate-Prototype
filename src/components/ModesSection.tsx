import { motion } from "framer-motion";
import { MessageCircle, UserCheck, Bot, Users, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const modes = [
  {
    icon: MessageCircle,
    title: "Chat Mode",
    desc: "Guided exploration through conversational interfaces with built-in guardrails and context awareness.",
    cta: "Explore Chat Mode",
  },
  {
    icon: UserCheck,
    title: "Copilot Mode",
    desc: "Augmented performance where AI assists human work while preserving accountability and decision authority.",
    cta: "Launch Copilot",
  },
  {
    icon: Bot,
    title: "Agentic Mode",
    desc: "Governed multi-step execution where AI agents perform complex tasks under monitored permissions.",
    cta: "Deploy Agents",
  },
  {
    icon: Users,
    title: "Hybrid Mode",
    desc: "Structured co-ownership combining human judgment with AI capabilities for complex decision-making.",
    cta: "Enable Hybrid",
  },
];

const ModesSection = () => (
  <section id="modes" className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Man + Machine Operating Modes" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        Enterprise Interaction Patterns for DCO‑Grade AI
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Four operating modes embedded with governance, monitoring, and value controls 
        for scalable Man + Machine collaboration.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: '#fafbff' }}
          >
            <div className="gradient-hero absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-hero group-hover:bg-white/20">
                <mode.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 mt-1 text-lg font-bold text-foreground group-hover:text-white transition-colors">
                {mode.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
                {mode.desc}
              </p>

              <button className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold text-primary transition-all group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                {mode.cta}
              </button>
            </div>
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
          href="#operating-modes"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore Operating Modes
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ModesSection;

