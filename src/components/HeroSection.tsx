import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIChatInterface from "./AIChatInterface";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-32 pb-20"
      style={{ minHeight: '70vh', backgroundColor: '#0d2a5e' }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
              DIA.AI — THE ENTERPRISE AI OPERATING PLATFORM
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          From Fragmented AI to Enterprise Advantage
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-white/70 leading-relaxed"
        >
          DIA.AI brings AI discovery, design, deployment, governance, and value realisation into one connected platform — so your organisation can adopt AI with clarity, control, and measurable impact.
        </motion.p>

        {/* AI Chat Interface */}
        <AIChatInterface />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => {
              const d4Section = document.getElementById('d4-model');
              if (d4Section) {
                d4Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white transition hover:bg-accent/90 shadow-lg"
          >
            <BookOpen className="h-5 w-5" />
            Explore AI Marketplaces
          </button>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/50"
          >
            Sign In to Your Workspace
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
