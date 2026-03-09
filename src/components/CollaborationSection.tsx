import { motion } from "framer-motion";
import { Target, Cpu, CheckCircle, Play, RefreshCw, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SectionBadge from "./SectionBadge";

const steps = [
  { icon: Target, step: "01", title: "Intent & Context", owner: "Human-led", desc: "Define purpose, constraints, and success criteria before AI engagement begins." },
  { icon: Cpu, step: "02", title: "Augment & Generate", owner: "AI-assisted", desc: "AI drafts, synthesises, and surfaces options within governed parameters." },
  { icon: CheckCircle, step: "03", title: "Evaluate & Decide", owner: "Human accountable", desc: "Humans review, refine, and make the final decision with full accountability." },
  { icon: Play, step: "04", title: "Orchestrate & Execute", owner: "AI-enabled action", desc: "AI coordinates execution across systems under monitored permissions." },
  { icon: RefreshCw, step: "05", title: "Learn & Improve", owner: "Human + system", desc: "Feedback loops improve models, processes, and governance continuously." },
];

const CollaborationSection = () => {
  const [selectedStep, setSelectedStep] = useState(0); // Default to first step
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update progress based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (maxScroll === 0) return; // No scrolling needed
      
      // Calculate which step should be active based on scroll position
      const scrollProgress = scrollLeft / maxScroll;
      const stepIndex = Math.round(scrollProgress * (steps.length - 1));
      
      setSelectedStep(Math.max(0, Math.min(stepIndex, steps.length - 1)));
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Handle step circle click - scroll to corresponding card
  const handleStepClick = (index: number) => {
    setSelectedStep(index);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
      const scrollPosition = index * cardWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
  <section id="collaboration" className="bg-section-muted py-16">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <SectionBadge label="Collaboration" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
      >
        The DCO Collaboration Standard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-muted-foreground"
      >
        A governed loop for accountable, scalable Man + Machine
        Collaboration—designed for traceability and continuous improvement.
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex items-center justify-center"
      >
        <div className="flex items-center gap-0 max-w-3xl w-full">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                index <= selectedStep 
                  ? 'gradient-hero text-white' 
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
              onClick={() => handleStepClick(index)}
              >
                {index + 1}
              </div>
              
              {/* Progress Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 transition-all ${
                  index < selectedStep 
                    ? 'gradient-hero' 
                    : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Horizontal Scrolling Cards */}
      <div className="mt-12 overflow-x-auto overflow-y-hidden scrollbar-hide" ref={scrollContainerRef}>
        <div className="flex gap-6 min-w-max pl-6 pr-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border py-8 px-6 text-left transition-all hover:shadow-lg flex-shrink-0 w-80 cursor-pointer ${
                i === selectedStep
                  ? 'border-primary/40 bg-card shadow-lg scale-105'
                  : 'border-border/60 bg-card hover:border-primary/20'
              }`}
              onClick={() => handleStepClick(i)}
            >
              <div className={`absolute left-0 top-0 h-[1px] w-full transition-opacity ${
                i === selectedStep ? 'gradient-hero opacity-100' : 'gradient-hero opacity-0 group-hover:opacity-100'
              }`} />
              
              {/* Step number in top right corner */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  STEP
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all group-hover:bg-primary/10">
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-primary">
                    {s.step}
                  </span>
                </div>
              </div>
              
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                i === selectedStep ? 'gradient-hero' : 'gradient-hero'
              }`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-all ${
                  i === selectedStep 
                    ? 'border-primary/30 bg-primary/20 text-primary' 
                    : 'border-primary/15 bg-primary/[0.06] text-primary'
                }`}>
                  {s.owner}
                </span>
              </div>
              <h3 className="mb-3 font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <a
          href="#"
          className="gradient-hero inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Explore the Collaboration Framework
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
  );
};

export default CollaborationSection;
