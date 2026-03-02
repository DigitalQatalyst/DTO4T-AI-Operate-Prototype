import { motion } from "framer-motion";
import { Users, Briefcase, BarChart3, ShieldCheck, Wrench } from "lucide-react";
import SectionBadge from "./SectionBadge";

const roles = [
  {
    icon: Users,
    label: "EXTERNAL USERS",
    title: "Customers & Partners",
    desc: "Engaging through AI-powered experiences with governed conversational interfaces.",
    items: ["AI Customer Portal", "Partner AI Gateway"],
  },
  {
    icon: Briefcase,
    label: "BUSINESS USERS",
    title: "Employees & Managers",
    desc: "Role-based copilots, hybrid workflows, and prompt workspaces for day-to-day augmentation.",
    items: ["Role-Based Copilots", "Hybrid Workflows", "Prompt Workspace"],
  },
  {
    icon: BarChart3,
    label: "BUSINESS LEADERS",
    title: "Executives & Strategy Owners",
    desc: "Portfolio oversight, value dashboards, and transformation intelligence for decision-makers.",
    items: ["AI Value Dashboard", "Portfolio Oversight"],
  },
  {
    icon: ShieldCheck,
    label: "DIGITAL LEADERS",
    title: "CIO / CTO / CDO / Risk",
    desc: "Governance console, compliance traceability, and AI lifecycle controls.",
    items: ["Governance Console", "Compliance Traceability"],
  },
  {
    icon: Wrench,
    label: "DIGITAL TEAMS",
    title: "DevOps / MLOps / AgentOps",
    desc: "Build and operations workspace for AI industrialisation and lifecycle management.",
    items: ["Build Workspace", "Operations Console"],
  },
];

const RolesSection = () => (
  <section id="roles" className="bg-section-muted py-24">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Section 05 — Coverage" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        Structured Cognitive Enablement Across the Enterprise
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        AI Hub activates DCO-grade collaboration through role-based environments
        for every stakeholder.
      </motion.p>

      <div className="mt-12 space-y-5">
        {roles.map((role, i) => (
          <motion.div
            key={role.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left transition-all hover:border-primary/20 hover:shadow-lg md:p-8"
          >
            <div className="gradient-hero absolute left-0 top-0 h-[1px] w-full opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-start gap-4">
              <div className="gradient-hero flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <role.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {role.label}
                </span>
                <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{role.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RolesSection;
