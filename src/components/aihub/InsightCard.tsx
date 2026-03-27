import { Calendar, User, Building2 } from 'lucide-react';
import { InsightItem } from '@/data/aiHubData';

const TYPE_CONFIG: Record<string, { pill: string; gradient: string; emoji: string }> = {
  'Enterprise Update':     { pill: 'bg-blue-100 text-blue-800',    gradient: 'from-blue-50 to-blue-100',    emoji: '🚀' },
  'Model Briefing':        { pill: 'bg-purple-100 text-purple-800', gradient: 'from-purple-50 to-purple-100', emoji: '🤖' },
  'Regulatory Alert':      { pill: 'bg-red-100 text-red-800',       gradient: 'from-red-50 to-red-100',       emoji: '⚖️' },
  'Risk Advisory':         { pill: 'bg-orange-100 text-orange-800', gradient: 'from-orange-50 to-orange-100', emoji: '🛡️' },
  'Transformation Insight':{ pill: 'bg-emerald-100 text-emerald-800',gradient: 'from-emerald-50 to-emerald-100',emoji: '💡' },
  'DCO Brief':             { pill: 'bg-indigo-100 text-indigo-800', gradient: 'from-indigo-50 to-indigo-100', emoji: '📊' },
  'Use Case':              { pill: 'bg-cyan-100 text-cyan-800',     gradient: 'from-cyan-50 to-cyan-100',     emoji: '⚙️' },
  'Industry Analysis':     { pill: 'bg-amber-100 text-amber-800',   gradient: 'from-amber-50 to-amber-100',   emoji: '📈' },
};

const DEFAULT_CFG = { pill: 'bg-gray-100 text-gray-700', gradient: 'from-gray-50 to-gray-100', emoji: '📄' };

interface InsightCardProps {
  item: InsightItem;
}

export function InsightCard({ item }: InsightCardProps) {
  const cfg = TYPE_CONFIG[item.typePill] || DEFAULT_CFG;

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date('2026-03-27');
    const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day ago';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 14) return '1 week ago';
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      {/* Header area */}
      <div className={`relative h-48 bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        <span
          className="text-5xl select-none transition-transform duration-200 hover:scale-110 opacity-60"
          role="img"
          aria-hidden="true"
        >
          {cfg.emoji}
        </span>
        {/* Type pill */}
        <span className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.pill}`}>
          {item.typePill}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-grow mb-4">
          {item.summary}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            {formatDate(item.date)}
          </span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3 flex-shrink-0" />
            {item.owner}
          </span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3 flex-shrink-0" />
            {item.source}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <button
            onClick={() => alert(`Opening details for: ${item.title}`)}
            className="w-full h-14 bg-[#0a1930] hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
