import { motion } from "framer-motion";
import { TrendingUp, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const metrics = [
  { 
    icon: TrendingUp, 
    label: "Adoption & Engagement Rates", 
    value: "Active users, copilot utilisation, agent invocation frequency, and role-based penetration across the enterprise." 
  },
  { 
    icon: Activity, 
    label: "Decision-Cycle Compression", 
    value: "Reduction in time-to-insight, approval latency, and end-to-end workflow execution duration." 
  },
  { 
    icon: ShieldCheck, 
    label: "Quality & Output Uplift", 
    value: "Improvements in accuracy, consistency, compliance adherence, and deliverable quality benchmarks." 
  },
  { 
    icon: TrendingUp, 
    label: "Cost & Efficiency Optimisation", 
    value: "Operational savings, automation impact, and productivity gains relative to baseline performance." 
  },
  { 
    icon: ShieldCheck, 
    label: "Risk & Control Reduction", 
    value: "Decrease in compliance breaches, anomaly rates, governance incidents, and model drift exposure." 
  },
  { 
    icon: Activity, 
    label: "Cognitive Capacity Expansion", 
    value: "Increase in analytical throughput, scenario simulations, strategic options generated, and cross-domain insight synthesis." 
  },
  { 
    icon: TrendingUp, 
    label: "AI Portfolio ROI", 
    value: "Value realisation versus investment across use cases, functions, and transformation initiatives." 
  },
];

const ValueMetricsSection = () => (
  <section id="metrics" className="bg-section-muted py-16">
    <div className="mx-auto max-w-5xl px-6 text-center">
      <SectionBadge label="Value" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        Measuring Cognitive Impact & Enterprise Value
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Track adoption, decision-cycle compression, quality uplift, efficiency
        gains, risk reduction, and portfolio ROI.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 text-left transition-transform hover:-translate-y-1"
          >
            <div className="gradient-hero mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <m.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mb-3 font-bold text-foreground">{m.label}</h3>
            <p className="text-sm text-muted-foreground">{m.value}</p>
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
          View Enterprise AI Value Dashboard
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ValueMetricsSection;
