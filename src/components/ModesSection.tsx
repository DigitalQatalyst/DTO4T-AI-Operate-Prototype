import { motion } from "framer-motion";
import { MessageSquare, Zap, Bot, GitMerge, Clock, Lock } from "lucide-react";
import SectionBadge from "./SectionBadge";

const modes = [
  {
    icon: MessageSquare,
    title: "Chat Mode",
    audience: "ALL USERS",
    desc: "Conversational interaction for ideation, clarification, and structured reasoning.",
    cta: "Launch Chat Mode",
    active: true,
  },
  {
    icon: Zap,
    title: "Copilot Mode",
    audience: "BUSINESS & DELIVERY TEAMS",
    desc: "Real-time task augmentation within business workflows with full decision authority.",
    cta: "Launch Copilot",
    active: true,
  },
  {
    icon: Bot,
    title: "Agentic Mode",
    audience: "ADVANCED OPERATIONS",
    desc: "AI agents orchestrate cross-system workflows under governed permissions and audit.",
    cta: "Enter AI Workspace",
    active: false,
  },
  {
    icon: GitMerge,
    title: "Hybrid Mode",
    audience: "CROSS-FUNCTIONAL TEAMS",
    desc: "Structured co-ownership where humans and AI share accountability within governed workflows.",
    cta: "Launch Hybrid Mode",
    active: false,
  },
];

const ModesSection = () => (
  <section id="modes" className="bg-section-light py-24">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Section 07 — Modes" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        Enterprise Interaction Patterns for DCO‑Grade AI
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        Four operating modes embedded with governance, monitoring, and
        value controls.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-2xl border p-10 text-center transition-all ${
              m.active
                ? "border-border bg-card hover:-translate-y-1 hover:shadow-lg"
                : "border-border/30 bg-muted/80"
            }`}
          >
            {/* active card gradient overlay on hover */}
            {m.active && (
              <div className="gradient-hero absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}

            {/* Coming soon badge */}
            {!m.active && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950">
                <Clock className="h-3 w-3" />
                Coming Soon
              </div>
            )}

            <div className="relative z-10">
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
                  m.active
                    ? "gradient-hero group-hover:bg-white/20"
                    : "bg-muted"
                }`}
              >
                <m.icon
                  className={`h-6 w-6 transition-colors ${
                    m.active
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <span
                className={`mb-1 text-xs font-medium ${
                  m.active
                    ? "text-muted-foreground group-hover:text-white/70"
                    : "text-muted-foreground/60"
                }`}
              >
                {m.audience}
              </span>
              <h3
                className={`mb-2 mt-1 text-lg font-bold transition-colors ${
                  m.active
                    ? "text-foreground group-hover:text-white"
                    : "text-muted-foreground/70"
                }`}
              >
                {m.title}
              </h3>
              <p
                className={`text-sm transition-colors ${
                  m.active
                    ? "text-muted-foreground group-hover:text-white/70"
                    : "text-muted-foreground/60"
                }`}
              >
                {m.desc}
              </p>

              {m.active ? (
                <button className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold text-primary transition-all group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                  {m.cta}
                </button>
              ) : (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-border/20 bg-background/60 px-4 py-2.5 text-xs text-muted-foreground/50">
                  <Lock className="h-3 w-3" />
                  Locked
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ModesSection;
