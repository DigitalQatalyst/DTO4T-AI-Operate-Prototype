import { MarketplaceItem } from '@/types/marketplace';
import { Calendar, User, Globe } from 'lucide-react';

interface ContentCardProps {
  item: MarketplaceItem;
  onViewDetail?: (id: string) => void;
  compact?: boolean;
}

const typeLabels: Record<string, string> = {
  update:     'Enterprise Update',
  release:    'Model Briefing',
  regulatory: 'Regulatory Alert',
  risk:       'Risk Advisory',
  insight:    'Transformation Insight',
  dco_brief:  'DCO Brief',
  use_case:   'Use Case',
  industry:   'Industry Analysis',
};

// Impact badge — matches reference: colored text, light bg, subtle border
const ImpactBadge = ({ value }: { value: string }) => {
  const styles: Record<string, { color: string; bg: string; border: string }> = {
    High:     { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    Critical: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    Medium:   { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
    Low:      { color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' },
    Normal:   { color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' },
  };
  const s = styles[value] || styles.Normal;
  return (
    <span style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4, display: 'inline-block' }}>
      {value}
    </span>
  );
};

const ContentCard = ({ item, onViewDetail }: ContentCardProps) => {
  const label = typeLabels[item.type] || item.type;

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewDetails = () => {
    if (onViewDetail) onViewDetail(item.id);
    else window.dispatchEvent(new CustomEvent('viewItemDetail', { detail: { itemId: item.id } }));
  };

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      style={{ border: '1px solid #E5E7EB', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')}
    >
      {/* Visual area — light periwinkle/blue-gray gradient matching reference */}
      <div
        className="relative flex flex-col justify-between p-4 flex-shrink-0"
        style={{
          height: 160,
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)',
        }}
      >
        {/* Type badge top-left */}
        <div className="flex items-start justify-between">
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#4338CA',
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(99,102,241,0.2)',
              padding: '4px 10px',
              borderRadius: 20,
              backdropFilter: 'blur(4px)',
            }}
          >
            {label}
          </span>
        </div>

        {/* Center icon — blue square matching reference */}
        <div className="flex items-center justify-center flex-1">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
            }}
          />
        </div>
      </div>

      {/* White content area */}
      <div className="flex flex-col flex-1 p-4 bg-white">
        <h4
          className="line-clamp-2 mb-2"
          style={{ fontSize: 15, fontWeight: 700, color: '#111827', lineHeight: 1.4 }}
        >
          {item.title}
        </h4>

        <p
          className="line-clamp-3 flex-1"
          style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 12 }}
        >
          {item.summary}
        </p>

        {/* Meta row — matches reference: date · owner · source with icons */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3" style={{ fontSize: 12, color: '#9CA3AF' }}>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            {formatDate(item.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3 flex-shrink-0" />
            {item.ownerTeam}
          </span>
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3 flex-shrink-0" />
            {item.source}
          </span>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.impact && <ImpactBadge value={item.impact} />}
          {item.severity && !item.impact && <ImpactBadge value={item.severity} />}
          {item.recommendation && (
            <span style={{ fontSize: 11, fontWeight: 500, color: item.recommendation === 'Approved' ? '#059669' : item.recommendation === 'Pilot' ? '#D97706' : '#DC2626', background: item.recommendation === 'Approved' ? '#ECFDF5' : item.recommendation === 'Pilot' ? '#FFFBEB' : '#FEF2F2', border: `1px solid ${item.recommendation === 'Approved' ? '#A7F3D0' : item.recommendation === 'Pilot' ? '#FDE68A' : '#FECACA'}`, padding: '3px 8px', borderRadius: 4 }}>
              {item.recommendation}
            </span>
          )}
          {item.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              style={{ fontSize: 11, fontWeight: 500, color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', padding: '3px 8px', borderRadius: 4 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleViewDetails}
          className="w-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400"
          style={{ background: '#0B1736', color: 'white', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1a2d5a')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#0B1736')}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ContentCard;
