import { motion } from "framer-motion";
import { Target, Cpu, CheckCircle, Play, RefreshCw, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const steps = [
  { icon: Target, step: "01", title: "Intent & Context", owner: "Human-led", desc: "Define purpose, constraints, and success criteria before AI engagement begins." },
  { icon: Cpu, step: "02", title: "Augment & Generate", owner: "AI-assisted", desc: "AI drafts, synthesises, and surfaces options within governed parameters." },
  { icon: CheckCircle, step: "03", title: "Evaluate & Decide", owner: "Human accountable", desc: "Humans review, refine, and make the final decision with full accountability." },
  { icon: Play, step: "04", title: "Orchestrate & Execute", owner: "AI-enabled action", desc: "AI coordinates execution across systems under monitored permissions." },
  { icon: RefreshCw, step: "05", title: "Learn & Improve", owner: "Human + system", desc: "Feedback loops improve models, processes, and governance continuously." },
];

const CollaborationSection = () => (
  <section id="collaboration" className="bg-section-muted py-24">
    <div className="mx-auto max-w-5xl px-6 text-center">
      <SectionBadge label="Section 06 — Collaboration" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        The DCO Collaboration Standard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        A governed loop for accountable, scalable Man + Machine
        Collaboration—designed for traceability and continuous improvement.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left transition-all hover:border-primary/20 hover:shadow-lg"
          >
            <div className="gradient-hero absolute left-0 top-0 h-[1px] w-full opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="gradient-hero mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Step {s.step}
              </span>
              <span className="rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold text-primary">
                {s.owner}
              </span>
            </div>
            <h3 className="mb-2 font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
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
          Explore the Collaboration Framework
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default CollaborationSection;
