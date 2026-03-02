import { motion } from "framer-motion";
import { ShoppingBag, BookOpen, Globe, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const float = (delay: number, y: number) => ({
  y: [0, y, 0],
  transition: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut" as const },
});

const cards = [
  { icon: ShoppingBag, title: "Explore AI Marketplaces", href: "#marketplace" },
  { icon: BookOpen, title: "Explore the DCO Framework", href: "#imperatives" },
  { icon: Globe, title: "Explore Role Coverage", href: "#roles" },
];

const ClosingSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(228,100%,14%)] via-[hsl(224,56%,22%)] to-[hsl(228,100%,25%)] py-28 md:py-40">
    {/* Coral accent glow */}
    <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-[hsl(14,97%,60%,0.08)] to-transparent" />

    {/* Floating blurs */}
    <motion.div
      animate={float(0, -20)}
      className="absolute left-[15%] top-[25%] h-64 w-64 rounded-full bg-white/5 blur-3xl"
    />
    <motion.div
      animate={float(3, 25)}
      className="absolute bottom-[20%] right-[20%] h-80 w-80 rounded-full bg-white/5 blur-3xl"
    />

    {/* Dot pattern */}
    <div className="dot-pattern absolute inset-0 opacity-[0.03]" />

    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <SectionBadge label="Section 07 — System" variant="dark" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
      >
        Integrated Within the DBP.
        <br />
        <span className="gradient-coral-text">Orchestrated at Scale.</span>
      </motion.h2>

      {/* Accent bar */}
      <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[hsl(14,97%,60%)] to-[hsl(14,97%,60%,0.5)]" />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-6 max-w-xl text-white/50"
      >
        DIA AI Hub synchronises experience, work, engineering, and analytics so
        AI operates as one enterprise capability.
      </motion.p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 text-left backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08]"
          >
            {/* Top glow line on hover */}
            <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[hsl(14,97%,60%)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
              <c.icon className="h-5 w-5 text-white/60 transition-colors group-hover:text-accent" />
            </div>
            <h3 className="text-sm font-bold text-white/80">{c.title}</h3>
            <ArrowRight className="mt-3 h-4 w-4 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ClosingSection;
