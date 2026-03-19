import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tabs, mockItems } from '@/data/discernMarketplace';
import { MarketplaceItem } from '@/types/marketplace';
import TabNavigation from '@/components/discern/TabNavigation';
import FilterSidebar from '@/components/discern/FilterSidebar';
import SearchBar from '@/components/discern/SearchBar';
import CardGrid from '@/components/discern/CardGrid';
import Breadcrumb from '@/components/discern/Breadcrumb';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SlidersHorizontal } from 'lucide-react';

const DiscernMarketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(mockItems);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeTab   = searchParams.get('tab')  || 'enterprise-updates';
  const searchQuery = searchParams.get('q')    || '';
  const sortBy      = searchParams.get('sort') || 'recent';

  const searchPlaceholders: Record<string, string> = {
    'enterprise-updates':      'Search announcements and updates… e.g., townhall, product update',
    'model-briefings':         'Search model briefings… e.g., GPT-5, Claude 3',
    'regulatory-alerts':       'Search regulatory alerts… e.g., EU AI Act, disclosure',
    'risk-advisories':         'Search risk advisories… e.g., privacy, restricted tools',
    'transformation-insights': 'Search insights… e.g., adoption, governance',
    'dco-briefs':              'Search DCO briefs… e.g., decision quality, man+machine',
    'use-cases':               'Search use cases… e.g., HR, finance, agent',
    'industry-analysis':       'Search industry analysis… e.g., finance, public sector',
  };

  const autoRefreshTabs = ['enterprise-updates', 'model-briefings', 'regulatory-alerts', 'risk-advisories'];

  useEffect(() => {
    let items = [...mockItems];
    const currentTab = tabs.find(t => t.id === activeTab);
    if (currentTab) items = items.filter(i => i.type === currentTab.type);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const topicFilter  = searchParams.get('topic')?.split(',').filter(Boolean)  || [];
    const roleFilter   = searchParams.get('role')?.split(',').filter(Boolean)   || [];
    const sourceFilter = searchParams.get('source')?.split(',').filter(Boolean) || [];

    if (topicFilter.length)  items = items.filter(i => i.topic.some(t => topicFilter.includes(t.toLowerCase())));
    if (roleFilter.length)   items = items.filter(i => i.audience.some(a => roleFilter.includes(a.toLowerCase())));
    if (sourceFilter.length) items = items.filter(i => sourceFilter.includes(i.source.toLowerCase()));

    if (sortBy === 'recent') items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
            <Breadcrumb activeTab={tabs.find(t => t.id === activeTab)?.label || ''} />
          </div>
        </div>

        {/* Page title + subtitle + tabs */}
        <div className={`${px} pt-5 pb-0`}>
          <h1 className="text-2xl font-bold text-gray-900">AI Updates & Insights Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Your starting point for AI updates, decision briefs, and insights—what changed, why it matters, and actions teams should take.
          </p>
          <div className="mt-4">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(id) => setSearchParams({ tab: id })}
            />
          </div>
        </div>

        {/* Description + Search boxes */}
        <div className={`${px} py-4 space-y-3`}>
          <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              {tabs.find(t => t.id === activeTab)?.description}
            </p>
          </div>
          <div className="border border-gray-200 rounded-md bg-white">
            <SearchBar
              value={searchQuery}
              onChange={(v) => {
                const p = new URLSearchParams(searchParams);
                v ? p.set('q', v) : p.delete('q');
                setSearchParams(p);
              }}
              placeholder={searchPlaceholders[activeTab] || 'Search...'}
            />
          </div>
        </div>

        {/* Sidebar + Cards */}
        <div className={`${px} pb-10`}>
          <div className="flex gap-6">

            {/* Filter sidebar */}
            <aside className="hidden lg:block w-44 flex-shrink-0">
              <FilterSidebar
                activeTab={activeTab}
                searchParams={searchParams}
                onFilterChange={setSearchParams}
              />
            </aside>

            {/* Card area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Available Items ({filteredItems.length})
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                  {autoRefreshTabs.includes(activeTab) && (
                    <span className="text-sm text-gray-500">
                      Auto-refresh · <span className="text-green-600 font-medium">Live</span>
                    </span>
                  )}
                </div>
              </div>

              <CardGrid items={filteredItems} />
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
              <FilterSidebar
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

export default DiscernMarketplace;
