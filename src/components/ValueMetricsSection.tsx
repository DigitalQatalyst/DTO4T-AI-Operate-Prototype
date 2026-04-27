import { motion } from "framer-motion";

const metrics = [
  { 
    value: "80%", 
    label: "of prioritised AI opportunities captured and progressed through DIA.AI" 
  },
  { 
    value: "100%", 
    label: "of in-scope AI initiatives visible and lifecycle-managed on the platform" 
  },
  { 
    value: "90%", 
    label: "of AI requests following defined governance and approval paths" 
  },
  { 
    value: "75%", 
    label: "of priority stakeholder groups actively using DIA.AI" 
  },
  { 
    value: "50%", 
    label: "reduction in fragmented AI coordination methods" 
  },
  { 
    value: "100%", 
    label: "of priority AI use cases with defined value measures and tracking" 
  },
];

const ValueMetricsSection = () => (
  <section id="metrics" className="py-12 bg-white">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-[#0d2a5e]/10 border border-[#0d2a5e]/20 mb-4">
          <span className="text-xs font-semibold text-[#0d2a5e]/80 uppercase tracking-wide">
            PLATFORM OUTCOMES
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0d2a5e] mb-6">
          Measurable AI Impact Across the Enterprise
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-[#3B6EF8] mb-4">{m.value}</div>
            <p className="text-sm text-gray-600 leading-relaxed">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueMetricsSection;

