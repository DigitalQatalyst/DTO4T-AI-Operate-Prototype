import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { knowledgeTabs, mockKnowledgeItems } from '@/data/knowledgeCenter';
import { KnowledgeItem } from '@/types/knowledgeCenter';
import KnowledgeTabNavigation from '@/components/knowledge/KnowledgeTabNavigation';
import KnowledgeFilterSidebar from '@/components/knowledge/KnowledgeFilterSidebar';
import KnowledgeSearchBar from '@/components/knowledge/KnowledgeSearchBar';
import KnowledgeCardGrid from '@/components/knowledge/KnowledgeCardGrid';
import KnowledgeBreadcrumb from '@/components/knowledge/KnowledgeBreadcrumb';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SlidersHorizontal } from 'lucide-react';

const KnowledgeCenter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>(mockKnowledgeItems);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeTab   = searchParams.get('tab')  || 'strategy-docs';
  const searchQuery = searchParams.get('q')    || '';
  const sortBy      = searchParams.get('sort') || 'recent';

  const searchPlaceholders: Record<string, string> = {
    'strategy-docs':        'Search strategy documents… e.g., roadmap, investment, priorities',
    'governance-policies':  'Search policies… e.g., ethics, privacy, compliance',
    'architecture-standards': 'Search standards… e.g., security, blueprint, patterns',
    'playbooks-patterns':   'Search playbooks… e.g., development, prompt engineering, implementation',
  };

  useEffect(() => {
    let items = [...mockKnowledgeItems];
    const currentTab = knowledgeTabs.find(t => t.id === activeTab);
    if (currentTab) items = items.filter(i => i.type === currentTab.type);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const topicFilter     = searchParams.get('topic')?.split(',').filter(Boolean)     || [];
    const audienceFilter  = searchParams.get('audience')?.split(',').filter(Boolean) || [];
    const statusFilter    = searchParams.get('status')?.split(',').filter(Boolean)   || [];
    const maturityFilter  = searchParams.get('maturity')?.split(',').filter(Boolean) || [];

    if (topicFilter.length)     items = items.filter(i => i.topic.some(t => topicFilter.includes(t.toLowerCase())));
    if (audienceFilter.length)  items = items.filter(i => i.audience.some(a => audienceFilter.includes(a.toLowerCase())));
    if (statusFilter.length)    items = items.filter(i => statusFilter.includes(i.status.toLowerCase()));
    if (maturityFilter.length)  items = items.filter(i => i.maturityLevel && maturityFilter.includes(i.maturityLevel.toLowerCase()));

    if (sortBy === 'recent') items.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    if (sortBy === 'title') items.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredItems(items);
  }, [searchParams]);

  // shared horizontal padding — matches reference left edge
  const px = 'px-16';

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white pt-16">

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className={`${px} py-2.5`}>
            <KnowledgeBreadcrumb activeTab={knowledgeTabs.find(t => t.id === activeTab)?.label || ''} />
          </div>
        </div>

        {/* Page title + subtitle + tabs */}
        <div className={`${px} pt-5 pb-0`}>
          <h1 className="text-2xl font-bold text-gray-900">AI Knowledge Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Single source of truth for how the organization governs and scales AI—strategy, policies, standards, and playbooks.
          </p>
          <div className="mt-4">
            <KnowledgeTabNavigation
              tabs={knowledgeTabs}
              activeTab={activeTab}
              onTabChange={(id) => setSearchParams({ tab: id })}
            />
          </div>
        </div>

        {/* Description + Search boxes */}
        <div className={`${px} py-4 space-y-3`}>
          <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              {knowledgeTabs.find(t => t.id === activeTab)?.description}
            </p>
          </div>
          <div className="border border-gray-200 rounded-md bg-white">
            <KnowledgeSearchBar
              value={searchQuery}
              onChange={(v) => {
                const p = new URLSearchParams(searchParams);
                v ? p.set('q', v) : p.delete('q');
                setSearchParams(p);
              }}
              placeholder={searchPlaceholders[activeTab] || 'Search knowledge base...'}
            />
          </div>
        </div>

        {/* Sidebar + Cards */}
        <div className={`${px} pb-10`}>
          <div className="flex gap-6">

            {/* Filter sidebar */}
            <aside className="hidden lg:block w-44 flex-shrink-0">
              <KnowledgeFilterSidebar
                activeTab={activeTab}
                searchParams={searchParams}
                onFilterChange={(p) => setSearchParams(p)}
              />
            </aside>

            {/* Card area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Available Documents ({filteredItems.length})
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      const p = new URLSearchParams(searchParams);
                      p.set('sort', e.target.value);
                      setSearchParams(p);
                    }}
                    className="text-sm border border-gray-300 rounded px-3 py-1.5"
                  >
                    <option value="recent">Recently Updated</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>

              <KnowledgeCardGrid items={filteredItems} />
            </div>
          </div>
        </div>

        {/* Mobile filter overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
              </div>
              <KnowledgeFilterSidebar
                activeTab={activeTab}
                searchParams={searchParams}
                onFilterChange={(p) => { setSearchParams(p); setIsFilterOpen(false); }}
              />
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
};

export default KnowledgeCenter;