import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";

const cards = [
  {
    percentage: "85%",
    title: "Productivity Acceleration",
    desc: "Governed copilots augment human work without compromising accountability.",
  },
  {
    percentage: "92%",
    title: "Execution at Scale",
    desc: "Agent frameworks automate workflows under permissions, monitoring, and audit controls.",
  },
  {
    percentage: "78%",
    title: "Cognitive Capacity Expansion",
    desc: "Intelligence scales beyond linear headcount through structured AI enablement.",
  },
  {
    percentage: "96%",
    title: "Trust & Risk Control",
    desc: "Guardrails, approvals, and traceability reduce exposure across every AI interaction.",
  },
];

const WhySection = () => (
  <section id="why" className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Why AI Hub" />
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
            className="rounded-xl border border-border/60 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: '#fafbff' }}
          >
            <div className="mb-4">
              <span className="text-3xl font-bold gradient-hero-text">{c.percentage}</span>
            </div>
            <h3 className="mb-2 font-bold text-foreground">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <a
          href="#architecture"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore the Unified AI Architecture
        </a>
      </motion.div>
    </div>
  </section>
);

export default WhySection;
