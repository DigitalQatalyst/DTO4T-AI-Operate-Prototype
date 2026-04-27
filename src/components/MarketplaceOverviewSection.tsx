import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Rocket, TrendingUp, ArrowRight } from "lucide-react";

const MarketplaceOverviewSection = () => {
  const navigate = useNavigate();

  const dimensions = [
    {
      icon: Search,
      name: "Discern",
      marketplaces: "AI Updates · AI Learning · AI Knowledge",
      route: "/discern",
    },
    {
      icon: Pencil,
      name: "Design",
      marketplaces: "AI Governance Frameworks · AI Architecture Blueprints · AI Use Cases · AI Specification Studio",
      route: "/design",
    },
    {
      icon: Rocket,
      name: "Deploy",
      marketplaces: "AI Asset Library · MLOps · BotOps · AgentOps · DTOps",
      route: "/deploy",
    },
    {
      icon: TrendingUp,
      name: "Drive",
      marketplaces: "AI Workspace · AI Service · Prompt Library · AI Orchestration · AI Performance & Value · AI Monitoring",
      route: "/drive",
    },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#0d2a5e' }}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
              THE AI MARKETPLACES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Explore Across Four Dimensions
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {dimensions.map((dimension, index) => {
            const Icon = dimension.icon;
            return (
              <motion.div
                key={dimension.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-all">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{dimension.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {dimension.marketplaces}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(dimension.route)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-semibold text-white hover:border-accent hover:bg-accent/10 transition-all"
                >
                  Explore {dimension.name}
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

export default MarketplaceOverviewSection;

