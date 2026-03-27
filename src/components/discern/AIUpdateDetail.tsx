import { useState } from 'react';
import { MarketplaceItem, ContentBlock } from '@/types/marketplace';
import { mockItems } from '@/data/discernMarketplace';
import ContentCard from './ContentCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import {
  Home, Share2, Bookmark, CheckCircle2, ExternalLink, ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIUpdateDetailProps {
  item: MarketplaceItem;
  onBack: () => void;
}

const typeConfig: Record<string, { label: string; pill: string; cta: string }> = {
  update:     { label: 'Enterprise Update',      pill: 'bg-blue-100 text-blue-800',    cta: 'Apply Update' },
  release:    { label: 'Model Briefing',         pill: 'bg-purple-100 text-purple-800', cta: 'Use Recommended Model' },
  regulatory: { label: 'Regulatory Alert',       pill: 'bg-orange-100 text-orange-800', cta: 'Acknowledge & View Actions' },
  risk:       { label: 'Risk Advisory',          pill: 'bg-red-100 text-red-800',       cta: 'View Safe Alternative' },
  insight:    { label: 'Transformation Insight', pill: 'bg-green-100 text-green-800',   cta: 'Share to Team' },
  dco_brief:  { label: 'DCO Brief',              pill: 'bg-indigo-100 text-indigo-800', cta: 'Share to Team' },
  use_case:   { label: 'Use Case',               pill: 'bg-teal-100 text-teal-800',     cta: 'Request This Use Case' },
  industry:   { label: 'Industry Analysis',      pill: 'bg-gray-100 text-gray-800',     cta: 'Share to Team' },
};

type DetailTab = 'details' | 'key-takeaways' | 'resources' | 'related';

const defaultDetails = (item: MarketplaceItem): ContentBlock[] => [
  { type: 'heading', text: 'Overview' },
  { type: 'paragraph', text: item.summary },
  { type: 'heading', text: 'Key Points' },
  { type: 'checklist', items: item.tags.map(t => `Related to: ${t}`) },
  { type: 'divider' },
  { type: 'heading', text: 'So What?' },
  { type: 'paragraph', text: 'Review this item with your team and determine what actions are relevant to your current work.' },
];

const renderBlock = (block: ContentBlock, idx: number) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={idx} className="flex items-center gap-2 text-xl font-semibold text-foreground mt-6 mb-3">
          <span className="h-6 w-1 rounded-full bg-cta flex-shrink-0" />
          {block.text}
        </h2>
      );
    case 'paragraph':
      return <p key={idx} className="leading-relaxed text-muted-foreground mb-4">{block.text}</p>;
    case 'checklist':
      return (
        <ul key={idx} className="space-y-3 mb-4">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'divider':
      return <hr key={idx} className="border-border my-6" />;
    case 'highlight':
      return (
        <div key={idx} className={`rounded-lg p-4 mb-4 border ${block.variant === 'danger' ? 'bg-red-50 border-red-200' : block.variant === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
          <p className="text-sm">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
};

const AIUpdateDetail = ({ item, onBack }: AIUpdateDetailProps) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('details');
  const [saved, setSaved] = useState(false);

  const cfg = typeConfig[item.type] || { label: item.type, pill: 'bg-gray-100 text-gray-800', cta: 'Share to Team' };
  const content = item.detailContent;
  const details = content?.details || defaultDetails(item);
  const keyTakeaways = content?.keyTakeaways || item.tags.map(t => `Key topic: ${t}`);
  const resources = content?.resources || [
    { label: 'Tool Directory', url: '#', description: 'Browse approved tools' },
    { label: 'Governance Policy', url: '#', description: 'Review policy requirements' },
    { label: 'FAQ & Support', url: '#', description: 'Get help from the DIA.AI team' },
  ];

  const relatedItems = mockItems
    .filter(i => i.type === item.type && i.id !== item.id)
    .slice(0, 3);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const detailTabs: { id: DetailTab; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'key-takeaways', label: 'Key Takeaways' },
    { id: 'resources', label: 'Resources' },
    { id: 'related', label: 'Related' },
  ];

  const metaRows: { label: string; value: string }[] = [
    { label: 'Published', value: formatDate(item.publishedAt) },
    { label: 'Owner', value: item.ownerTeam },
    { label: 'Source', value: item.source },
    ...(item.impact ? [{ label: 'Impact', value: item.impact }] : []),
    ...(item.severity ? [{ label: 'Severity', value: item.severity }] : []),
    ...(item.region ? [{ label: 'Region', value: item.region }] : []),
    ...(item.vendor ? [{ label: 'Vendor', value: item.vendor }] : []),
    ...(item.recommendation ? [{ label: 'Recommendation', value: item.recommendation }] : []),
    ...(item.maturity ? [{ label: 'Maturity', value: item.maturity }] : []),
    ...(item.horizon ? [{ label: 'Horizon', value: item.horizon }] : []),
    ...(item.readTimeMins ? [{ label: 'Read Time', value: `${item.readTimeMins} min` }] : []),
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-background pt-16">

        {/* Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 20%, #8E44AD 40%, #5B7DB1 60%, #2E5090 80%, #1E3A8A 100%)' }} className="py-10 px-6 md:px-16">
          <div className="max-w-[1200px] mx-auto">
            {/* Breadcrumb + actions row */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                <Home className="h-3.5 w-3.5" />
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="opacity-60">›</span>
                <span className="hover:text-white cursor-pointer transition-colors">DIA AI Hub</span>
                <span className="opacity-60">›</span>
                <button onClick={onBack} className="hover:text-white transition-colors">AI Updates</button>
                <span className="opacity-60">›</span>
                <span className="text-white truncate max-w-[200px]" style={{ fontSize: 14 }}>{item.title.substring(0, 40)}...</span>
              </nav>
              <div className="flex items-center gap-2">
                <button
                  onClick={onBack}
                  className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 transition-colors"
                  aria-label="Back to marketplace"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <button
                  className="p-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4 text-white/80" />
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`p-2 border rounded-lg transition-colors ${saved ? 'bg-white/20 border-white/30' : 'bg-white/10 hover:bg-white/20 border-white/15'}`}
                  aria-label={saved ? 'Unsave' : 'Save'}
                >
                  <Bookmark className={`h-4 w-4 ${saved ? 'text-white fill-white' : 'text-white/80'}`} />
                </button>
              </div>
            </div>

            {/* Glass panel */}
            <div
              className="rounded-2xl p-8"
              style={{
                backdropFilter: 'blur(20px)',
                background: 'rgba(248,250,252,0.07)',
                border: '1px solid rgba(248,250,252,0.12)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${cfg.pill}`}>
                {cfg.label}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{item.title}</h1>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-5 max-w-3xl">{item.summary}</p>
              <div className="flex flex-wrap gap-2">
                {metaRows.slice(0, 4).map(m => (
                  <span
                    key={m.label}
                    className="px-3 py-1 rounded-full text-xs text-white/80 border"
                    style={{ background: 'rgba(248,250,252,0.08)', borderColor: 'rgba(248,250,252,0.1)' }}
                  >
                    {m.label}: {m.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-8">
          <div className="flex gap-8 items-start flex-col lg:flex-row">

            {/* Content area */}
            <main className="flex-1 min-w-0">
              {/* Detail tabs */}
              <div className="border-b border-border mb-6" role="tablist" aria-label="Item details">
                <div className="flex gap-0">
                  {detailTabs.map(tab => (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeTab === tab.id
                          ? 'border-foreground text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              {activeTab === 'details' && (
                <div>{details.map((block, i) => renderBlock(block, i))}</div>
              )}

              {activeTab === 'key-takeaways' && (
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
                    <span className="h-6 w-1 rounded-full bg-cta flex-shrink-0" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-4">
                    {keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 p-4 bg-muted/40 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-hero text-hero-foreground text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
                    <span className="h-6 w-1 rounded-full bg-cta flex-shrink-0" />
                    Resources
                  </h2>
                  <div className="space-y-3">
                    {resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:shadow-sm hover:border-foreground/20 transition-all group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-hero transition-colors">{res.label}</p>
                          {res.description && <p className="text-xs text-muted-foreground mt-0.5">{res.description}</p>}
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-hero transition-colors flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
                    <span className="h-6 w-1 rounded-full bg-cta flex-shrink-0" />
                    Related Items
                  </h2>
                  {relatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedItems.map(ri => (
                        <ContentCard key={ri.id} item={ri} compact />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No additional items in this category yet.</p>
                  )}
                </div>
              )}
            </main>

            {/* Sticky sidebar */}
            <aside className="lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24">
              <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Item Summary</h3>
                </div>
                <div className="p-4 space-y-3">
                  {metaRows.map(m => (
                    <div key={m.label} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">{m.label}:</span>
                      <span className="text-xs font-medium text-foreground text-right">{m.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border space-y-2">
                  <button className="w-full py-2.5 bg-cta text-cta-foreground text-sm font-semibold rounded-lg hover:bg-cta/90 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                    {cfg.cta}
                  </button>
                  <button
                    onClick={() => setSaved(!saved)}
                    className="w-full py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Bookmark className={`h-4 w-4 ${saved ? 'fill-foreground' : ''}`} />
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
                {item.tags.length > 0 && (
                  <div className="p-4 border-t border-border">
                    <p className="text-xs font-semibold text-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* Related items section */}
        {relatedItems.length > 0 && (
          <section className="bg-secondary/30 py-10 mt-4">
            <div className="max-w-[1200px] mx-auto px-6 md:px-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Related Items</h2>
                <button
                  onClick={onBack}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse all items →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedItems.map(ri => (
                  <ContentCard key={ri.id} item={ri} compact />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AIUpdateDetail;
