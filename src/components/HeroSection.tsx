import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import SectionBadge from "./SectionBadge";

const float = (delay: number, y: number, x: number) => ({
  y: [0, y, 0],
  x: [0, x, 0],
  transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" as const },
});

const HeroSection = () => (
  <section
    id="hero"
    className="gradient-hero relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16"
  >
    {/* floating circles */}
    <motion.div
      animate={float(0, -30, 20)}
      className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-white/5 blur-3xl"
    />
    <motion.div
      animate={float(2, 25, -15)}
      className="absolute bottom-[15%] right-[15%] h-96 w-96 rounded-full bg-white/5 blur-3xl"
    />
    <motion.div
      animate={float(4, -20, -25)}
      className="absolute right-[30%] top-[40%] h-48 w-48 rounded-full bg-white/5 blur-3xl"
    />

    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionBadge label="DIA AI Hub — The Cognitive Core" variant="dark" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-8 text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
      >
        The Enterprise AI Hub for DCO‑Grade{" "}
        <span className="text-white/70">Man + Machine Collaboration</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-white/60"
      >
        Governed copilots and agents that augment human judgement and accelerate
        measurable outcomes across the Digital Cognitive Organisation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-10 flex flex-col items-center justify-center gap-6"
      >
        {/* AI Prompt Bar */}
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask AI anything..."
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-white/50 backdrop-blur-md transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90">
              Ask
            </button>
          </div>
          
          {/* Prompt Chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              "Explain LLM vs RAG",
              "List available AI Agents", 
              "Prompting Best Tips",
              "How do I work with AI",
              "Do something for me"
            ].map((chip) => (
              <button
                key={chip}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#learning"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
          >
            <BookOpen className="h-4 w-4" />
            Learn to work with AI today
          </a>
          <a
            href="#marketplace"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore AI Marketplaces
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
