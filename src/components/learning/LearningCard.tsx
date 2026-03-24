import { Clock, BookOpen } from 'lucide-react';
import { LearningItem } from '@/types/learning';

interface LearningCardProps {
  item: LearningItem;
}

const typeConfig: Record<string, { label: string; dot: string }> = {
  foundational:  { label: 'Foundational',      dot: 'bg-blue-500' },
  prompt:        { label: 'Prompt Engineering', dot: 'bg-purple-500' },
  pathway:       { label: 'Role Pathway',       dot: 'bg-indigo-500' },
  governance:    { label: 'Governance & Ethics',dot: 'bg-red-500' },
  tool:          { label: 'Tool Proficiency',   dot: 'bg-orange-500' },
  advanced:      { label: 'Advanced Skills',    dot: 'bg-teal-500' },
  certification: { label: 'Certification',      dot: 'bg-green-500' },
  resource:      { label: 'Resource',           dot: 'bg-yellow-500' },
};

const levelBadge: Record<string, string> = {
  Beginner:     'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced:     'bg-red-100 text-red-700',
};

const LearningCard = ({ item }: LearningCardProps) => {
  const cfg = typeConfig[item.type] || { label: item.type, dot: 'bg-gray-400' };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const formatDuration = (mins?: number) => {
    if (!mins) return null;
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Header block */}
      <div className="relative h-44 bg-gradient-to-br from-[#0f3d2e] to-[#1a6b4a] flex items-center justify-center overflow-hidden">
        {/* pill top-left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 rounded-full px-2.5 py-1">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span className="text-xs font-medium text-gray-800">{cfg.label}</span>
        </div>
        {/* logo top-right */}
        <div className="absolute top-3 right-3 bg-white/10 rounded px-2 py-1">
          <span className="text-white text-xs font-bold tracking-widest">DIA</span>
        </div>
        {/* centre text */}
        <div className="text-center text-white px-6 z-10">
          <div className="flex items-center justify-center mb-1">
            <BookOpen className="h-6 w-6 text-white/80" />
          </div>
          <p className="text-lg font-bold leading-snug">AI Learning</p>
          <p className="text-lg font-bold leading-snug">Center</p>
        </div>
        {/* decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs text-gray-500">
            {cfg.label} · {formatDate(item.publishedAt)}
          </p>
          {item.level && (
            <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${levelBadge[item.level]}`}>
              {item.level}
            </span>
          )}
        </div>

        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {item.title}
        </h4>

        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
          {item.summary}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 mb-4">
          {item.durationMins && (
            <>
              <Clock className="h-3 w-3" />
              <span>{formatDuration(item.durationMins)}</span>
              <span>·</span>
            </>
          )}
          {item.format && <span>{item.format}</span>}
          <span>·</span>
          <span>{item.source}</span>
        </div>

        <button className="w-full py-2.5 bg-[#0f3d2e] hover:bg-[#0a2e22] text-white text-sm font-medium rounded-md transition-colors">
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default LearningCard;
