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
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">
              INTEGRATION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            DBP Master Architecture
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="h-8 w-8 text-gray-600" />
                </div>

                {/* Platform Label */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center mb-2">
                  {integration.platform}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  {integration.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                  {integration.description}
                </p>

                {/* Link Button */}
                <button className="w-full px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium transition-all">
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
