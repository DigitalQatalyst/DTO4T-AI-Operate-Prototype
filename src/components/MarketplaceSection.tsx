import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";
import { marketplaceClasses, type MarketplaceClass } from "@/data/marketplace";

const filters = [
  { id: "all", label: "All Capabilities" },
  ...marketplaceClasses.map((c) => ({ id: c.id, label: c.filterLabel })),
];

const ClassBlock = ({ cls }: { cls: MarketplaceClass }) => (
  <div className="mb-12">
    <div className="gradient-left-border mb-4 flex items-center gap-3 pl-4">
      <div className="gradient-hero flex h-9 w-9 items-center justify-center rounded-lg">
        <cls.icon className="h-4 w-4 text-white" />
      </div>
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {cls.label}
        </span>
        <h3 className="text-xl font-bold text-foreground">{cls.name}</h3>
      </div>
    </div>
    <p className="mb-6 text-sm text-muted-foreground">{cls.intro}</p>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cls.products.map((p) => (
        <div
          key={p.name}
          className="group rounded-xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="gradient-hero mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
            <p.icon className="h-4 w-4 text-white" />
          </div>
          <span className="mb-1 inline-block rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {p.tag}
          </span>
          <h4 className="mt-2 font-bold text-foreground">{p.name}</h4>
          <p className="text-xs text-primary/70">{p.subtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          {p.name === "AI Updates & Insights Center" ? (
            <Link 
              to="/discern"
              className="mt-4 inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
            >
              {p.cta}
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <button className="mt-4 inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5">
              {p.cta}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

const MarketplaceSection = () => {
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? marketplaceClasses
      : marketplaceClasses.filter((c) => c.id === active);

  return (
    <section id="marketplace" className="py-16" style={{ backgroundColor: '#f0f6ff' }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionBadge label="Marketplace" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            The 4D Cognitive Marketplace Architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            A structured AI capability spanning Discern, Designs, Deploys, and
            Drive — from literacy to scale.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === f.id
                  ? "gradient-hero border-transparent text-white"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {visible.map((cls, i) => (
                <div key={cls.id}>
                  <ClassBlock cls={cls} />
                  {active === "all" && i < visible.length - 1 && (
                    <div className="gradient-divider mx-auto my-8 max-w-xl" />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
