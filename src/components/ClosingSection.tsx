import { motion } from "framer-motion";
import { Monitor, Wrench, ShieldCheck, BarChart3, BookOpen, ShoppingBag, ArrowRight, Send } from "lucide-react";
import SectionBadge from "./SectionBadge";

const integrationTiles = [
  { icon: Monitor, title: "DXP Integration", desc: "AI-driven personalisation and conversational interfaces.", href: "#", cta: "Explore DXP Integration" },
  { icon: Wrench, title: "DWS Integration", desc: "Role-based copilots and workflow augmentation.", href: "#", cta: "Explore DWS Integration" },
  { icon: ShieldCheck, title: "SDO Integration", desc: "Secure DevOps pipelines and release governance.", href: "#", cta: "Explore SDO Integration" },
  { icon: BarChart3, title: "Analytics Integration", desc: "DIA Analytics Hub for cognitive intelligence.", href: "#", cta: "Explore Analytics Integration" },
];

const ClosingSection = () => (
  <>
    {/* Integration Section */}
    <section className="relative overflow-hidden bg-gray-50 py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <SectionBadge label="Integration" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
        >
          DBP Master Architecture
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-muted-foreground"
        >
          Connecting experience, work, and analytics through AI.
        </motion.p>

        {/* Integration tiles */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrationTiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            >
              {/* Icon */}
              <div className="gradient-integration-icon mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl group-hover:gradient-hero">
                <t.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Category Label */}
              <div className="mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.title.includes('DXP') ? 'EXPERIENCE PLATFORM' : 
                   t.title.includes('DWS') ? 'DIGITAL WORKSPACE' :
                   t.title.includes('SDO') ? 'SECURE DEVOPS' : 'ANALYTICS HUB'}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="mb-3 text-base font-bold text-foreground">{t.title}</h3>
              
              {/* Description */}
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              
              {/* CTA Button */}
              <div className="mt-auto">
                <button className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                  {t.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Enter the DIA AI Hub Section */}
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1a3e] via-[#4a2c5e] to-[#c85a54] py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold sm:text-4xl leading-tight">
              <span className="block text-white">Enter the</span>
              <span className="block text-orange-400 mt-1">DIA AI Hub</span>
            </h3>
            
            <div className="mt-4 h-1 w-12 bg-white/30 rounded-full" />
            
            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-lg leading-relaxed">
              Learn, collaborate, and scale AI-driven transformation.
            </p>
          </motion.div>

          {/* Right Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <a 
              href="#marketplace" 
              className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-left backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">Learn to work with AI today</span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </a>

            <a 
              href="#marketplace" 
              className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-left backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">Explore AI Marketplaces</span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </a>

            <a 
              href="#" 
              className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-left backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                  <Send className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">Submit AI Service Request</span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);

export default ClosingSection;
