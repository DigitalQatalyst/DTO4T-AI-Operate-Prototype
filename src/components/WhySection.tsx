import { motion } from "framer-motion";
import { Cpu, ShieldCheck, BarChart3, Eye } from "lucide-react";
import SectionBadge from "./SectionBadge";

const cards = [
  {
    icon: Cpu,
    title: "Productivity Acceleration",
    desc: "Governed copilots augment human work without compromising accountability.",
  },
  {
    icon: ShieldCheck,
    title: "Execution at Scale",
    desc: "Agent frameworks automate workflows under permissions, monitoring, and audit controls.",
  },
  {
    icon: BarChart3,
    title: "Cognitive Capacity Expansion",
    desc: "Intelligence scales beyond linear headcount through structured AI enablement.",
  },
  {
    icon: Eye,
    title: "Trust & Risk Control",
    desc: "Guardrails, approvals, and traceability reduce exposure across every AI interaction.",
  },
];

const WhySection = () => (
  <section id="why" className="bg-section-light py-24">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Section 03 — Why AI Hub" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        From Fragmented AI to Enterprise Cognitive Advantage
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        AI only scales when it's orchestrated as shared infrastructure—governed,
        contextual, and measured end-to-end.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card group rounded-xl p-6 text-left transition-transform hover:-translate-y-1"
          >
            <div className="gradient-hero mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <c.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Proof Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 grid gap-8 sm:grid-cols-3"
      >
        <div className="text-center">
          <div className="text-3xl font-bold gradient-hero-text">X%</div>
          <p className="mt-1 text-sm text-muted-foreground">decision‑cycle compression</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold gradient-hero-text">X%</div>
          <p className="mt-1 text-sm text-muted-foreground">productivity uplift</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold gradient-hero-text">X%</div>
          <p className="mt-1 text-sm text-muted-foreground">risk/control reduction</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <a
          href="#architecture"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Explore the Unified AI Architecture
        </a>
      </motion.div>

      <div className="gradient-divider mx-auto mt-16 max-w-xl" />
      <p className="mt-6 text-sm text-muted-foreground">
        AI must be orchestrated as shared cognitive infrastructure — integrated
        with strategy, governance, and measurable outcomes.
      </p>
    </div>
  </section>
);

export default WhySection;
