import { motion } from "framer-motion";
import { Network, Database, Cloud, Lock, Zap, GitBranch } from "lucide-react";

const DBPIntegrationSection = () => {
  const platforms = [
    { icon: Database, label: "Data Platform" },
    { icon: Cloud, label: "Cloud Services" },
    { icon: Lock, label: "Security & Identity" },
    { icon: Zap, label: "DIA.AI" },
    { icon: GitBranch, label: "Integration Hub" },
    { icon: Network, label: "Business Apps" },
  ];

  return (
    <section className="bg-section-light py-20">
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
              PART OF THE DIGITAL BUSINESS PLATFORM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            DIA.AI is One Platform in a Connected Digital Ecosystem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            DIA.AI operates as a specialised platform within the broader Digital Business 
            Platform (DBP) landscape — connecting AI discovery, design, deployment, and 
            governance across the enterprise operating model.
          </p>
        </motion.div>

        {/* Platform Ecosystem Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const isDIAAI = platform.label === "DIA.AI";
              
              return (
                <motion.div
                  key={platform.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-lg p-6 flex flex-col items-center text-center transition-all ${
                    isDIAAI
                      ? "bg-accent/10 border-2 border-accent shadow-lg"
                      : "bg-white border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                      isDIAAI
                        ? "bg-accent text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      isDIAAI ? "text-accent" : "text-gray-700"
                    }`}
                  >
                    {platform.label}
                  </p>
                  {isDIAAI && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Connection Lines Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200">
              <Network className="h-4 w-4 text-accent" />
              <span className="text-sm text-gray-600">
                Seamlessly integrated across the enterprise
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DBPIntegrationSection;
