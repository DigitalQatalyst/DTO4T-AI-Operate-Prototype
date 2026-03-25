import { MarketplaceItem } from '@/types/marketplace';

interface ContentCardProps {
  item: MarketplaceItem;
}

const typeConfig: Record<string, { label: string; dot: string }> = {
  update:    { label: 'Enterprise Update',       dot: 'bg-blue-500' },
  release:   { label: 'Model Briefing',          dot: 'bg-purple-500' },
  regulatory:{ label: 'Regulatory Alert',        dot: 'bg-red-500' },
  risk:      { label: 'Risk Advisory',           dot: 'bg-orange-500' },
  insight:   { label: 'Transformation Insight',  dot: 'bg-green-500' },
  dco_brief: { label: 'DCO Brief',               dot: 'bg-teal-500' },
  use_case:  { label: 'Use Case',                dot: 'bg-indigo-500' },
  industry:  { label: 'Industry Analysis',       dot: 'bg-yellow-500' },
};

const ContentCard = ({ item }: ContentCardProps) => {
  const cfg = typeConfig[item.type] || { label: item.type, dot: 'bg-gray-400' };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="w-full max-w-[492px] min-h-[820px] max-h-[880px] bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col p-5">
      {/* Thumbnail / hero image */}
      <div className="relative w-full h-[404px] bg-gradient-to-br from-[#0f1f5c] to-[#1a3a8f] rounded-[14px] flex items-center justify-center overflow-hidden mb-4">
        {/* Type pill top-left */}
        <div className="absolute top-3 left-3 h-6 flex items-center gap-1.5 bg-white/90 rounded-full px-2.5 py-1.5">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span className="text-xs font-semibold text-gray-800">{cfg.label}</span>
        </div>
        {/* Logo top-right */}
        <div className="absolute top-3 right-3 bg-white/10 rounded px-2 py-1">
          <span className="text-white text-xs font-bold tracking-widest">DIA</span>
        </div>
        {/* Center text */}
        <div className="text-center text-white px-6 z-10">
          <p className="text-lg font-bold leading-snug">AI Updates &</p>
          <p className="text-lg font-bold leading-snug">Insights Center</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
      </div>

      {/* Content block */}
      <div className="flex flex-col flex-1 max-w-[357px]">
        {/* Title */}
        <h4 className="text-2xl font-bold text-gray-900 mb-1.5 line-clamp-2 leading-tight">
          {item.title}
        </h4>

        {/* Owner/provider line */}
        <p className="text-sm font-medium text-gray-600 mb-3.5">
          {item.source}
        </p>

        {/* Summary */}
        <p className="text-base text-gray-700 line-clamp-3 mb-4.5 flex-1">
          {item.summary}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3.5 text-sm font-medium text-gray-600 mb-4.5">
          <span>{cfg.label}</span>
          <span>·</span>
          <span>{formatDate(item.publishedAt)}</span>
        </div>

        {/* Primary CTA button */}
        <button className="w-full h-14 bg-[#0f1f5c] hover:bg-[#0a1640] text-white text-base font-semibold rounded-[14px] transition-colors mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ContentCard;