import { useState, useMemo, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { InsightCard } from '@/components/aihub/InsightCard';
import { AHTabNavigation } from '@/components/aihub/AHTabNavigation';
import { AHSearchBar } from '@/components/aihub/AHSearchBar';
import { AHFilterSidebar } from '@/components/aihub/AHFilterSidebar';
import { AHSortDropdown } from '@/components/aihub/AHSortDropdown';
import { AHPagination } from '@/components/aihub/AHPagination';
import { TABS, GLOBAL_FILTERS, SEED_DATA, TabSlug, SortOption, FilterGroup } from '@/data/aiHubData';
import { Home, ChevronRight, SlidersHorizontal, FilterX } from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 6;
const REF_DATE = new Date('2026-03-27');

const SEV_ORDER: Record<string, number> = { Critical: 0, High: 1, Normal: 2 };

function dateInRange(dateStr: string, range: string): boolean {
  const d = new Date(dateStr);
  const diff = Math.floor((REF_DATE.getTime() - d.getTime()) / 86400000);
  if (range === 'Last 7 days') return diff <= 7;
  if (range === 'Last 30 days') return diff <= 30;
  if (range === 'Last 90 days') return diff <= 90;
  if (range === 'This year') return d.getFullYear() === 2026;
  return true;
}

const DiscernMarketplace = () => {
  // ── URL state init ──────────────────────────────────────────────────────
  const getParam = (key: string) => new URLSearchParams(window.location.search).get(key) ?? '';

  const [activeTab, setActiveTab] = useState<TabSlug>((getParam('tab') as TabSlug) || 'enterprise-ai-updates');
  const [search, setSearch] = useState(getParam('q'));
  const [sort, setSort] = useState<SortOption>((getParam('sort') as SortOption) || 'recent');
  const [page, setPage] = useState(parseInt(getParam('page') || '1', 10));
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabCfg = TABS.find(t => t.slug === activeTab)!;
  const filterGroups: FilterGroup[] = [...GLOBAL_FILTERS, ...tabCfg.filters];

  // Build initial selected filters from URL
  const initFilters = (): Record<string, string[]> => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string[]> = {};
    filterGroups.forEach(g => {
      const v = params.get(g.id);
      if (v) result[g.id] = v.split(',');
    });
    return result;
  };
  const [selected, setSelected] = useState<Record<string, string[]>>(initFilters);

  // ── Sync URL ────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('tab', activeTab);
    if (search) params.set('q', search);
    if (sort !== 'recent') params.set('sort', sort);
    if (page > 1) params.set('page', String(page));
    Object.entries(selected).forEach(([k, v]) => { if (v.length) params.set(k, v.join(',')); });
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [activeTab, search, sort, page, selected]);

  // ── Tab switch resets everything ────────────────────────────────────────
  const handleTabChange = (slug: string) => {
    setActiveTab(slug as TabSlug);
    setSearch('');
    setSelected({});
    setSort('recent');
    setPage(1);
  };

  // ── Filter toggle ───────────────────────────────────────────────────────
  const handleFilterChange = (groupId: string, value: string) => {
    setSelected(prev => {
      const cur = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value],
      };
    });
    setPage(1);
  };

  const clearAll = () => { setSelected({}); setPage(1); };

  // ── Filtered + sorted items ─────────────────────────────────────────────
  const processed = useMemo(() => {
    let items = SEED_DATA.filter(i => i.tab === activeTab);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.owner.toLowerCase().includes(q) ||
        i.source.toLowerCase().includes(q)
      );
    }

    // Checkbox filters — OR within group, AND across groups
    Object.entries(selected).forEach(([groupId, vals]) => {
      if (!vals.length) return;
      if (groupId === 'Date') {
        items = items.filter(i => vals.some(v => dateInRange(i.date, v)));
      } else {
        items = items.filter(i => {
          const field = i[groupId];
          if (Array.isArray(field)) return (field as string[]).some(f => vals.includes(f));
          return vals.includes(field as string);
        });
      }
    });

    // Sort
    if (sort === 'recent') {
      items = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'severity') {
      items = [...items].sort((a, b) => (SEV_ORDER[a.Severity as string] ?? 9) - (SEV_ORDER[b.Severity as string] ?? 9));
    } else if (sort === 'recommended') {
      items = [...items].sort((a, b) => a.title.length - b.title.length);
    }

    return items;
  }, [activeTab, search, selected, sort]);

  const totalPages = Math.ceil(processed.length / PAGE_SIZE);
  const paged = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Sort options per tab
  const sortOptions = useMemo(() => {
    const base = [{ value: 'recent' as SortOption, label: 'Most Recent' }];
    if (['ai-transformation-insights', 'dco-intelligence-briefs'].includes(activeTab))
      base.push({ value: 'recommended', label: 'Recommended' });
    if (['risk-advisories', 'regulatory-alerts'].includes(activeTab))
      base.push({ value: 'severity', label: 'Highest Severity' });
    return base;
  }, [activeTab]);

  const totalActive = Object.values(selected).reduce((s, v) => s + v.length, 0);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-16" style={{ background: '#fafafa' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 py-4 overflow-x-auto scrollbar-none">
            <Home className="h-3.5 w-3.5 flex-shrink-0" />
            <Link to="/" className="hover:text-gray-800 transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
            <span className="whitespace-nowrap hover:text-gray-800 cursor-pointer">DIA AI Hub</span>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
            <span className="whitespace-nowrap hover:text-gray-800 cursor-pointer">Discern</span>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
            <span className="whitespace-nowrap font-semibold text-gray-900">AI Updates & Insights Center</span>
          </nav>

          {/* Page header */}
          <div className="mb-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              AI Updates & Insights Center
            </h1>
            <p className="text-base text-gray-600 max-w-3xl">
              A governed feed of AI updates and decision briefs—what changed, why it matters, and actions teams should take.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-5">
            <AHTabNavigation tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Info strip */}
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5 shadow-sm">
            <p className="text-sm text-gray-500">{tabCfg.overview}</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <AHSearchBar
              value={search}
              onChange={v => { setSearch(v); setPage(1); }}
              placeholder={tabCfg.searchPlaceholder}
            />
          </div>

          {/* Two-column layout */}
          <div className="flex gap-6 items-start pb-12">

            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 sticky top-8">
              <AHFilterSidebar
                groups={filterGroups}
                selected={selected}
                onChange={handleFilterChange}
                onClearAll={clearAll}
                isMobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
                activeTabKey={activeTab}
              />
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results header */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-sm font-bold text-gray-900">
                  Available Items ({processed.length})
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-500 hidden sm:inline">
                    Showing {paged.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, processed.length)} of {processed.length} items
                  </span>
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters {totalActive > 0 && `(${totalActive})`}
                  </button>
                  <AHSortDropdown value={sort} onChange={v => { setSort(v); setPage(1); }} options={sortOptions} />
                </div>
              </div>

              {/* Grid */}
              {paged.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paged.map(item => <InsightCard key={item.id} item={item} />)}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-20 text-center">
                  <FilterX className="h-10 w-10 text-gray-300 mb-3" />
                  <p className="text-gray-500 mb-3 text-sm">No items found matching your criteria.</p>
                  <button
                    onClick={() => { clearAll(); setSearch(''); }}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              <AHPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DiscernMarketplace;
