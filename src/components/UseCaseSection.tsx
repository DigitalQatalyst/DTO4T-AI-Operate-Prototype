import { motion } from "framer-motion";

const useCases = [
  { 
    title: "AI-Powered Request Management", 
    function: "Operations", 
    impact: "Structured intake and governance for all AI requests across the organisation" 
  },
  { 
    title: "Enterprise AI Governance", 
    function: "Risk & Compliance", 
    impact: "Policy-driven oversight and accountability across all AI initiatives" 
  },
  { 
    title: "Workforce AI Enablement", 
    function: "HR & People", 
    impact: "Learning programs and AI adoption pathways for every role and capability level" 
  },
  { 
    title: "AI Value Tracking", 
    function: "Finance & Strategy", 
    impact: "ROI measurement and outcome visibility for all AI investments and initiatives" 
  },
];

const UseCaseSection = () => (
  <section id="usecases" className="bg-section-light py-20">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            HIGH-IMPACT AI USE CASES
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          What DIA.AI Enables Across the Enterprise
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {useCases.slice(0, 4).map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all"
          >
            <div className="inline-block px-2 py-1 rounded bg-accent/10 mb-3">
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                {uc.function}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{uc.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{uc.impact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCaseSection;
