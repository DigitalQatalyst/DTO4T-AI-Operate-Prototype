import { Clock, Lock, type LucideIcon } from "lucide-react";

interface ComingSoonCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  audience?: string;
}

const ComingSoonCard = ({ icon: Icon, title, description, audience }: ComingSoonCardProps) => (
  <div className="relative flex flex-col items-center rounded-2xl border border-border/30 bg-muted/80 p-10 text-center">
    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950">
      <Clock className="h-3 w-3" />
      Coming Soon
    </div>
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
      <Icon className="h-6 w-6 text-muted-foreground" />
    </div>
    {audience && (
      <span className="mb-2 text-xs font-medium text-muted-foreground">{audience}</span>
    )}
    <h3 className="mb-2 text-lg font-bold text-muted-foreground/70">{title}</h3>
    <p className="text-sm text-muted-foreground/60">{description}</p>
    <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border/20 bg-background/60 px-4 py-2.5 text-xs text-muted-foreground/50">
      <Lock className="h-3 w-3" />
      Locked
    </div>
  </div>
);

export default ComingSoonCard;
