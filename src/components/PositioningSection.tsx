import { motion } from "framer-motion";
import { Network, Zap } from "lucide-react";

const PositioningSection = () => {
  return (
    <section className="bg-section-light py-12">
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
              WHY DIA.AI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            AI Adoption is Fragmented. DIA.AI Fixes That.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Most organisations run AI across disconnected teams, tools, and processes. 
            Requests go untracked. Governance is inconsistent. Value is hard to measure. 
            DIA.AI is the enterprise AI operating platform that connects every stage of 
            the AI journey — from identifying opportunities to governing outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Fragmented State */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Network className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Fragmented</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Disconnected teams and tools</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Untracked requests and initiatives</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Inconsistent governance</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Unmeasured value and ROI</p>
              </div>
            </div>
          </motion.div>

          {/* Connected Platform */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg border-2 border-accent p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Connected</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Unified platform and workflows</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Full visibility and tracking</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Governed and compliant</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Measurable outcomes and value</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
