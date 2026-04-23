import { motion } from "framer-motion";
import { Users, Briefcase, Settings, Code, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollaborationStorySection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      icon: Users,
      title: "Business User / Employee",
      description: "Discover AI tools, submit requests, and track your outcomes",
      path: "/login"
    },
    {
      icon: Briefcase,
      title: "Manager / Team Lead",
      description: "Oversee team AI activity, approve requests, and drive adoption",
      path: "/login"
    },
    {
      icon: Settings,
      title: "Service Owner / Business Owner",
      description: "Manage AI services, fulfilment workflows, and performance",
      path: "/login"
    },
    {
      icon: Code,
      title: "Specialist Team (AI / Data / Tech)",
      description: "Design, build, and deploy AI solutions at scale",
      path: "/login"
    },
    {
      icon: Shield,
      title: "Platform Admin / Governance",
      description: "Configure the platform, manage access, and enforce policy",
      path: "/login"
    },
    {
      icon: TrendingUp,
      title: "Leadership / Executive",
      description: "Monitor enterprise AI demand, governance, and value",
      path: "/login"
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              WHERE WOULD YOU LIKE TO START?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            DIA.AI is Built for Every Stakeholder in Your AI Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {role.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(role.path)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollaborationStorySection;
