import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SectionBadgeProps {
  label: string;
  variant?: "light" | "dark";
}

const SectionBadge = ({ label, variant = "light" }: SectionBadgeProps) => {
  const styles =
    variant === "dark"
      ? "border-white/10 bg-white/[0.05] text-white/50"
      : "border-primary/20 bg-primary/[0.06] text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest ${styles}`}
    >
      <Sparkles className="h-3 w-3" />
      {label}
    </motion.div>
  );
};

export default SectionBadge;
