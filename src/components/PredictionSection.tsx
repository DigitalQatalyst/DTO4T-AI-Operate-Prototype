import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, Brain, ShieldCheck } from "lucide-react";
import SectionBadge from "./SectionBadge";

const predictions = [
  {
    icon: Brain,
    title: "Decision Intelligence Will Define Competitive Advantage",
    desc: "Organisations that embed AI into decision-making loops—not just automation—will outperform peers by compressing decision cycles from weeks to hours.",
  },
  {
    icon: TrendingUp,
    title: "Multi-Agent Execution Will Replace Linear Workflows",
    desc: "Governed autonomous agents will orchestrate cross-functional processes end-to-end, shifting enterprises from task-level AI to system-level intelligence.",
  },
  {
    icon: ShieldCheck,
    title: "AI Governance Will Become a Board-Level Priority",
    desc: "Regulatory pressure and operational risk will force governance from an afterthought into the architecture itself—measurable, auditable, and embedded by design.",
  },
];

const PredictionSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % predictions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="predictions" className="bg-section-light py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionBadge label="Section 02 — Prediction" />
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
          Three high-impact predictions on decision intelligence, multi-agent
          execution, and governance shifts.
        </motion.p>

        <div className="relative mt-12 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card mx-auto max-w-2xl rounded-2xl p-8 text-center"
            >
              <div className="gradient-hero mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                {(() => {
                  const Icon = predictions[active].icon;
                  return <Icon className="h-5 w-5 text-white" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {predictions[active].title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {predictions[active].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {predictions.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === active
                  ? "gradient-hero w-6"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
