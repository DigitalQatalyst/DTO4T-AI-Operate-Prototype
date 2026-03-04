import { motion } from "framer-motion";
import { BookOpen, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";
import SectionBadge from "./SectionBadge";

const float = (delay: number, y: number, x: number) => ({
  y: [0, y, 0],
  x: [0, x, 0],
  transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" as const },
});

const HeroSection = () => {
  const [promptValue, setPromptValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const promptChips = [
    "Explain LLM vs RAG",
    "List available AI Agents", 
    "Prompting Best Tips",
    "How do I work with AI",
    "Do something for me"
  ];

  const handleChipClick = (chipText: string) => {
    setPromptValue(chipText);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow chip clicks to register
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 150);
  };

  return (
    <section
      id="hero"
      className="gradient-hero relative flex min-h-screen items-center justify-center overflow-hidden pt-16 pb-20"
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

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col justify-center min-h-[80vh]">
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
          {/* Enhanced AI Prompt Bar - Matching Screenshot 1 */}
          <div className="w-full max-w-4xl">
            {/* Main Search Container */}
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-2xl">
              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-white/60" />
                </div>
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Ask me anything about DWS... What do you need help with?"
                  className="flex h-12 w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-24 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/40 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-xs font-medium text-green-400">AI Ready</span>
                  </div>
                  <button className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* AI Assistant Examples Section - Only visible when search is focused */}
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white/90">AI Assistant Examples:</span>
                  </div>
                  
                  {/* First Row - 3 chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {promptChips.slice(0, 3).map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white/80 hover:bg-white/20 hover:text-white transition-all text-left"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  
                  {/* Second Row - 2 chips centered */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                    {promptChips.slice(3).map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white/80 hover:bg-white/20 hover:text-white transition-all text-left"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Powered by AI Footer */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <Sparkles className="h-3 w-3 text-white/50" />
                    <span className="text-xs text-white/50">Powered by AI - I can explain features, guide you, and help you find what you need</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
};

export default HeroSection;
