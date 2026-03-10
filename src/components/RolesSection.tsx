import { motion } from "framer-motion";
import { Users, Shield, Building, Cog, Settings, ArrowRight } from "lucide-react";
import SectionBadge from "./SectionBadge";

const roleCategories = [
  {
    icon: Users,
    label: "CUSTOMERS & PARTNERS",
    title: "External Stakeholders",
    desc: "AI-enabled experiences and interfaces for customers and partners.",
    cta: "Access AI‑Enabled Experiences",
  },
  {
    icon: Users,
    label: "EMPLOYEES & MANAGERS",
    title: "Workforce Enablement",
    desc: "Role-based copilots that augment human work with governance and accountability.",
    cta: "Launch Role‑Based Copilot",
  },
  {
    icon: Shield,
    label: "EXECUTIVES & STRATEGY",
    title: "Leadership & Strategy",
    desc: "AI portfolio oversight, impact measurement, and strategic decision support.",
    cta: "View AI Portfolio & Impact",
  },
  {
    icon: Building,
    label: "DIGITAL LEADERS",
    title: "CIO/CTO/CDO/Risk",
    desc: "Governance frameworks, architecture oversight, and risk management for enterprise AI.",
    cta: "Enter Governance & Architecture Console",
  },
  {
    icon: Cog,
    label: "DIGITAL TEAMS",
    title: "DevOps/MLOps/AgentOps",
    desc: "Build, deploy, and operate AI systems with lifecycle management and monitoring.",
    cta: "Access Build & Operations Workspace",
  },
];

const RolesSection = () => (
  <section id="roles" className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Who the AI Hub Serves" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        AI Solutions for Every Role
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Role-based environments that preserve accountability while scaling AI capability 
        with governance and measurable value.
      </motion.p>

      <div className="mt-12 overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex gap-6 min-w-max pl-6 pr-12">
          {roleCategories.map((role, i) => (
            <motion.div
              key={role.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted p-6 text-left transition-all hover:border-primary/20 hover:shadow-lg flex-shrink-0 w-80"
            >
              <div className="gradient-hero absolute left-0 top-0 h-[1px] w-full opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="gradient-hero mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <role.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                {role.label}
              </span>
              <h3 className="mt-1 text-lg font-bold text-foreground">{role.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{role.desc}</p>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  {role.cta}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <a
          href="#collaboration"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore AI Collaboration Framework
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default RolesSection;
