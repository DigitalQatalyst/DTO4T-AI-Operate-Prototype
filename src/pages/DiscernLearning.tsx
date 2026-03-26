import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { learningTabs, mockLearningItems } from '@/data/discernLearning';
import { LearningItem } from '@/types/learning';
import TabNavigation from '@/components/discern/TabNavigation';
import LearningFilterSidebar from '@/components/learning/LearningFilterSidebar';
import SearchBar from '@/components/discern/SearchBar';
import LearningCardGrid from '@/components/learning/LearningCardGrid';
import LearningBreadcrumb from '@/components/learning/LearningBreadcrumb';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SlidersHorizontal } from 'lucide-react';

// Adapt the LearningTabConfig to satisfy TabNavigation's TabConfig shape
const tabsForNav = learningTabs.map(({ id, label, description }) => ({
  id,
  label,
  description,
  type: id as never,
}));

const DiscernLearning = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState<LearningItem[]>(mockLearningItems);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeTab   = searchParams.get('tab')  || 'foundational';
  const searchQuery = searchParams.get('q')    || '';

  const searchPlaceholders: Record<string, string> = {
    'foundational':       'Search foundational courses… e.g., AI basics, terminology',
    'prompt-engineering': 'Search prompt guides… e.g., CLEAR framework, few-shot',
    'role-pathways':      'Search role pathways… e.g., HR, finance, developer',
    'governance-ethics':  'Search governance content… e.g., bias, acceptable use',
    'tool-proficiency':   'Search tool guides… e.g., Copilot, GitHub, Azure',
    'advanced-skills':    'Search advanced topics… e.g., RAG, agents, fine-tuning',
    'certification':      'Search certifications… e.g., foundation, practitioner',
    'resources':          'Search resources… e.g., cheat-sheet, playbook, templates',
  };

  useEffect(() => {
    let items = [...mockLearningItems];
    const currentTab = learningTabs.find(t => t.id === activeTab);
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
    const roleFilter   = searchParams.get('role-audience')?.split(',').filter(Boolean) || [];
    const levelFilter  = searchParams.get('level')?.split(',').filter(Boolean)  || [];
    const formatFilter = searchParams.get('format')?.split(',').filter(Boolean) || [];

    if (topicFilter.length)  items = items.filter(i => i.topic.some(t => topicFilter.includes(t.toLowerCase())));
    if (roleFilter.length)   items = items.filter(i => i.audience.some(a => roleFilter.includes(a.toLowerCase())));
    if (levelFilter.length)  items = items.filter(i => i.level && levelFilter.includes(i.level.toLowerCase()));
    if (formatFilter.length) items = items.filter(i => i.format && formatFilter.includes(i.format.toLowerCase()));

    items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    setFilteredItems(items);
  }, [searchParams]);

  const px = 'px-16';

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white pt-16">

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className={`${px} py-2.5`}>
            <LearningBreadcrumb activeTab={learningTabs.find(t => t.id === activeTab)?.label || ''} />
          </div>
        </div>

        {/* Page title + subtitle + tabs */}
        <div className={`${px} pt-5 pb-0`}>
          <h1 className="text-2xl font-bold text-gray-900">AI Learning Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Role-based AI learning pathways from foundational literacy to advanced prompt engineering and certification.
          </p>
          <div className="mt-4">
            <TabNavigation
              tabs={tabsForNav}
              activeTab={activeTab}
              onTabChange={(id) => setSearchParams({ tab: id })}
            />
          </div>
        </div>

        {/* Description + Search */}
        <div className={`${px} py-4 space-y-3`}>
          <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              {learningTabs.find(t => t.id === activeTab)?.description}
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
              <LearningFilterSidebar
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
                </div>
              </div>

              <LearningCardGrid items={filteredItems} />
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
              <LearningFilterSidebar
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

export default DiscernLearning;
