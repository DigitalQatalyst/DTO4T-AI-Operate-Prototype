import { motion } from "framer-motion";
import { Brain, Zap, Shield, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const predictions = [
  {
    icon: Brain,
    title: "Decision Intelligence Revolution",
    desc: "AI-augmented decision-making transforms from reactive to predictive, enabling real-time strategic pivots.",
  },
  {
    icon: Zap,
    title: "Multi-Agent Execution at Scale",
    desc: "Coordinated AI agents orchestrate complex workflows across departments with human oversight and governance.",
  },
  {
    icon: Shield,
    title: "Governance-First AI Adoption",
    desc: "Organizations shift from AI experimentation to governed, measurable, and accountable AI transformation.",
  },
];

const PredictionSection = () => {
  return (
  <section id="predictions" className="py-16" style={{ backgroundColor: '#f0f6ff' }}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <SectionBadge label="AI Prediction" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
        >
          The Future of Man + Machine Collaboration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-muted-foreground"
        >
          Three rotating predictions on decision intelligence, multi-agent execution, 
          governance shifts, and what it takes to become a measurable DCO.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {predictions.map((prediction, i) => (
            <motion.div
              key={prediction.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-2xl bg-white border border-border/60 p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="gradient-hero mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <prediction.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-foreground">{prediction.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{prediction.desc}</p>
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
            href="#insights"
            className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View AI Frontier Insights
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PredictionSection;

