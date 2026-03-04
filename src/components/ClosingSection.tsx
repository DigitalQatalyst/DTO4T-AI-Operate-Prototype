import { motion } from "framer-motion";
import { Monitor, Wrench, ShieldCheck, BarChart3, BookOpen, ShoppingBag, ArrowRight, Send } from "lucide-react";
import SectionBadge from "./SectionBadge";

const float = (delay: number, y: number) => ({
  y: [0, y, 0],
  transition: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut" as const },
});

const integrationTiles = [
  { icon: Monitor, title: "DXP Integration", desc: "AI-driven personalisation and conversational interfaces.", href: "#" },
  { icon: Wrench, title: "DWS Integration", desc: "Role-based copilots and workflow augmentation.", href: "#" },
  { icon: ShieldCheck, title: "SDO Integration", desc: "Secure DevOps pipelines and release governance.", href: "#" },
  { icon: BarChart3, title: "Analytics Integration", desc: "DIA Analytics Hub for cognitive intelligence.", href: "#" },
];

const ClosingSection = () => (
  <>
    {/* Integration Section */}
    <section className="relative overflow-hidden bg-gray-50 py-28 md:py-40">
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 shadow-sm">
          <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Integration</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Integrated Within the DBP.
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Orchestrated at Scale.</span>
        </motion.h2>

        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-500" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-gray-600"
        >
          DIA AI Hub synchronises experience, work, engineering, and analytics so
          AI operates as one enterprise capability.
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
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-all group-hover:bg-gradient-to-br group-hover:from-blue-900 group-hover:via-purple-600 group-hover:to-orange-500">
                <t.icon className="h-6 w-6 text-gray-700 transition-colors group-hover:text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              <div className="mt-4">
                <ArrowRight className="h-4 w-4 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-orange-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Enter the DIA AI Hub Section */}
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1a3e] via-[#4a2c5e] to-[#c85a54] py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">
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
