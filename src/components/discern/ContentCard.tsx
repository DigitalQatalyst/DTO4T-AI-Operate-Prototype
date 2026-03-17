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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Image / header block */}
      <div className="relative h-44 bg-gradient-to-br from-[#0f1f5c] to-[#1a3a8f] flex items-center justify-center overflow-hidden">
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
          <p className="text-lg font-bold leading-snug">AI Updates &</p>
          <p className="text-lg font-bold leading-snug">Insights Center</p>
        </div>
        {/* decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-2">
          {cfg.label} · {formatDate(item.publishedAt)}
        </p>

        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {item.title}
        </h4>

        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
          {item.summary}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 mb-4">
          <span>0 views</span>
          <span>·</span>
          <span>{item.source}</span>
        </div>

        <button className="w-full py-2.5 bg-[#0f1f5c] hover:bg-[#0a1640] text-white text-sm font-medium rounded-md transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
