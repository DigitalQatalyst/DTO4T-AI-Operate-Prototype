import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, Settings, Code, Shield, BarChart3, ArrowRight } from "lucide-react";

const RolePathwaysSection = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      icon: Users,
      title: "Business User / Employee",
      description: "Discover AI tools, submit requests, and track your outcomes",
    },
    {
      icon: Briefcase,
      title: "Manager / Team Lead",
      description: "Oversee team AI activity, approve requests, and drive adoption",
    },
    {
      icon: Settings,
      title: "Service Owner / Business Owner",
      description: "Manage AI services, fulfilment workflows, and performance",
    },
    {
      icon: Code,
      title: "Specialist Team (AI / Data / Tech)",
      description: "Design, build, and deploy AI solutions at scale",
    },
    {
      icon: Shield,
      title: "Platform Admin / Governance",
      description: "Configure the platform, manage access, and enforce policy",
    },
    {
      icon: BarChart3,
      title: "Leadership / Executive",
      description: "Monitor enterprise AI demand, governance, and value",
    },
  ];

  return (
    <section className="bg-section-muted py-12">
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
              WHERE WOULD YOU LIKE TO START?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            DIA.AI is Built for Every Stakeholder in Your AI Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCards.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
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

export default RolePathwaysSection;
