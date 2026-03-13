import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const useCases = [
  { 
    title: "Finance Forecasting & Scenario Intelligence", 
    function: "Finance", 
    impact: "AI-augmented modelling, anomaly detection, and predictive planning integrated with executive decision cycles." 
  },
  { 
    title: "Workforce Productivity Copilots", 
    function: "Operations", 
    impact: "Embedded copilots within daily workflows to accelerate drafting, analysis, coordination, and knowledge retrieval." 
  },
  { 
    title: "Customer Personalisation & Experience Intelligence", 
    function: "Customer Experience", 
    impact: "Real-time recommendation engines, behavioral insights, and governed conversational assistants." 
  },
  { 
    title: "Risk Detection & Compliance Monitoring", 
    function: "Risk & Governance", 
    impact: "Continuous anomaly detection, policy validation, and automated escalation aligned to governance controls." 
  },
  { 
    title: "Predictive Maintenance & Operational Optimisation", 
    function: "Operations", 
    impact: "Sensor-driven forecasting, failure prediction, and workflow orchestration across operations." 
  },
  { 
    title: "Executive Intelligence Assistants", 
    function: "Executive Office", 
    impact: "Strategic briefing generation, cross-domain insight synthesis, and decision-support augmentation for leadership." 
  },
];

const UseCaseSection = () => (
  <section id="usecases" className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Spotlight" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        High-Impact DCO Use Cases
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Enterprise-grade Man + Machine Collaboration patterns delivering measurable 
        value across core functions.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: '#fafbff' }}
          >
            <div className="gradient-hero absolute left-0 top-0 h-[1px] w-full opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="gradient-hero mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              {uc.function}
            </span>
            <h3 className="mt-1 font-bold text-foreground">{uc.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{uc.impact}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <a
          href="#"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore the Use Case Library
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default UseCaseSection;
