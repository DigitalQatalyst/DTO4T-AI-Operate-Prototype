import { motion } from "framer-motion";
import { Monitor, Wrench, Shield, BarChart3 } from "lucide-react";

const DBPIntegrationSection = () => {
  const integrations = [
    {
      icon: Monitor,
      platform: "EXPERIENCE PLATFORM",
      title: "DXP Integration",
      description: "AI-driven personalisation and conversational interfaces.",
      link: "Explore DXP Integration"
    },
    {
      icon: Wrench,
      platform: "DIGITAL WORKSPACE",
      title: "DWS Integration",
      description: "Role-based copilots and workflow augmentation.",
      link: "Explore DWS Integration"
    },
    {
      icon: Shield,
      platform: "SECURE DEVOPS",
      title: "SDO Integration",
      description: "Secure DevOps pipelines and release governance.",
      link: "Explore SDO Integration"
    },
    {
      icon: BarChart3,
      platform: "ANALYTICS HUB",
      title: "Analytics Integration",
      description: "DIA Analytics Hub for cognitive intelligence.",
      link: "Explore Analytics Integration"
    }
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#0d2a5e' }}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
              INTEGRATION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            DBP Master Architecture
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Connecting experience, work, and analytics through AI.
          </p>
        </motion.div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;

            return (
              <motion.div
                key={integration.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="h-8 w-8 text-white/70" />
                </div>

                {/* Platform Label */}
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide text-center mb-2">
                  {integration.platform}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-white text-center mb-3">
                  {integration.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 text-center mb-4 leading-relaxed">
                  {integration.description}
                </p>

                {/* Link Button */}
                <button className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-medium transition-all">
                  {integration.link}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DBPIntegrationSection;
