import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ClosingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-[#0d2a5e] mb-10"
        >
          Ready to bring your AI journey into one place?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3B6EF8] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#3B6EF8]/90 shadow-lg"
          >
            Sign In to DIA.AI
          </button>
          <button
            onClick={() => navigate('/discern')}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0d2a5e]/30 bg-transparent px-8 py-3.5 text-base font-semibold text-[#0d2a5e] transition hover:bg-[#0d2a5e]/10 hover:border-[#0d2a5e]/50"
          >
            Explore the Marketplaces
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
