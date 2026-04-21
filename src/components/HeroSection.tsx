import { motion } from "framer-motion";
import { BookOpen, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const float = (delay: number, y: number, x: number) => ({
  y: [0, y, 0],
  x: [0, x, 0],
  transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" as const },
});

const HeroSection = () => {
  const [promptValue, setPromptValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

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

  const scrollToMarketplace = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const marketplaceSection = document.getElementById('marketplace');
    if (marketplaceSection) {
      marketplaceSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="hero"
      className="gradient-hero relative flex items-center justify-center overflow-hidden py-16"
      style={{ minHeight: '70vh' }}
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

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col justify-center">
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
          The Enterprise AI Hub for Human-<span style={{ color: '#d8c6cd' }}>AI Collaboration</span>
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
          {/* Enhanced AI Prompt Bar - White Background with Modern Design */}
          <div className="w-full max-w-4xl">
            {/* Main Search Container */}
            <div className="rounded-2xl bg-white p-2 shadow-2xl">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Ask me anything about DWS... What do you need help with?"
                  className="flex h-14 w-full rounded-xl border-2 border-transparent bg-gray-50 pl-12 pr-32 text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-primary focus-visible:bg-white transition-all text-base"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 border border-green-200">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-700">AI Ready</span>
                  </div>
                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-primary transition-all">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* AI Assistant Examples Section - Only visible when search is focused */}
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-4 space-y-4 px-2 pb-2"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-gray-700">AI Assistant Examples:</span>
                  </motion.div>
                  
                  {/* First Row - 3 chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {promptChips.slice(0, 3).map((chip, index) => (
                      <motion.button
                        key={chip}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-primary hover:shadow-md transition-all text-left"
                      >
                        {chip}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Second Row - 2 chips centered */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                    {promptChips.slice(3).map((chip, index) => (
                      <motion.button
                        key={chip}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        onClick={() => handleChipClick(chip)}
                        className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-primary hover:shadow-md transition-all text-left"
                      >
                        {chip}
                      </motion.button>
                    ))}
                  </div>

                  {/* Powered by AI Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 pt-3 border-t border-gray-200"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs text-gray-500">Powered by AI - I can explain features, guide you, and help you find what you need</span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/discern')}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/90 shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              Learn to work with AI today
            </button>
            <button
              onClick={() => navigate('/discern')}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/50"
            >
              Explore AI Marketplaces
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
