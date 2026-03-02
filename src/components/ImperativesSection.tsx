import { motion } from "framer-motion";
import { Globe, Brain, Layers, RefreshCw, Users, Zap, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const items = [
  { icon: Globe, title: "Operational Digital Twin Alignment", desc: "Anchor AI to organisational roles, processes, and accountability structures." },
  { icon: Brain, title: "Shared Cognitive Standards", desc: "Validation criteria and architecture blueprints for enterprise-wide AI consistency." },
  { icon: Layers, title: "Lifecycle Governance by Design", desc: "Built-in governance across the entire AI lifecycle from intake to retirement." },
  { icon: RefreshCw, title: "Responsible AI as Infrastructure", desc: "Ethics, bias detection, and compliance baked into every deployment pipeline." },
  { icon: Users, title: "Scalable Adoption Pathways", desc: "Role-based onboarding and enablement that scales with organisational maturity." },
  { icon: Zap, title: "Measurable Transformation Impact", desc: "Quantified value tracking across adoption, productivity, and risk reduction." },
];

const ImperativesSection = () => (
  <section id="imperatives" className="bg-section-muted py-24">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Section 04 — Structure" />
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
        Six structural imperatives that convert AI from experimentation into
        governed, scalable, value-generating capability.
      </motion.p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="gradient-hero absolute left-0 top-0 h-[1px] w-full opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-3">
              <div className="gradient-hero flex h-10 w-10 items-center justify-center rounded-xl">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-accent"
            >
              Read More
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center gap-4"
      >
        <a
          href="#"
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
