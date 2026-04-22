import { motion } from "framer-motion";
import { Users, Briefcase, Settings, Code, Shield, BarChart3 } from "lucide-react";

const CollaborationStorySection = () => {
  const roles = [
    { icon: Users, label: "Business User" },
    { icon: Briefcase, label: "Manager" },
    { icon: Settings, label: "Service Owner" },
    { icon: Code, label: "Specialist Team" },
    { icon: Shield, label: "Platform Admin" },
    { icon: BarChart3, label: "Executive" },
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
              BUILT FOR YOUR PEOPLE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            AI That Works With Your Organisation, Not Around It
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            DIA.AI is designed for every stakeholder in the enterprise AI journey. 
            Whether you are a business user discovering AI possibilities, a specialist 
            team deploying solutions, or a leader governing outcomes — DIA.AI gives you 
            the right tools, visibility, and control for your role.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-3 hover:border-accent hover:shadow-lg transition-all">
                  <Icon className="h-7 w-7 text-gray-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">{role.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollaborationStorySection;
