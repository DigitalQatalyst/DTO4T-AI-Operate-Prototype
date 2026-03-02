import { motion } from "framer-motion";
import { TrendingUp, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const metrics = [
  { icon: TrendingUp, label: "Decision-Cycle Compression", value: "X%", desc: "Faster decision loops through AI-augmented analysis and recommendation." },
  { icon: Activity, label: "Productivity Uplift", value: "X%", desc: "Measurable efficiency gains across copilot-enabled workflows." },
  { icon: ShieldCheck, label: "Risk & Control Reduction", value: "X%", desc: "Reduced exposure through governed AI guardrails and audit trails." },
];

const ValueMetricsSection = () => (
  <section id="metrics" className="bg-section-muted py-24">
    <div className="mx-auto max-w-5xl px-6 text-center">
      <SectionBadge label="Section 10 — Value" />
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

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-8 text-center transition-transform hover:-translate-y-1"
          >
            <div className="gradient-hero mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <m.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-hero-text">{m.value}</span>
            <h3 className="mt-2 font-bold text-foreground">{m.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
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
          View the AI Value Dashboard
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ValueMetricsSection;
