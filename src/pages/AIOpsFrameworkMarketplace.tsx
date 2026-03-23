import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tabs, mockItems } from '@/data/aiopsFrameworkMarketplace';
import { MarketplaceItem } from '@/types/marketplace';
import TabNavigation from '@/components/discern/TabNavigation';
import FilterSidebar from '@/components/discern/FilterSidebar';
import SearchBar from '@/components/discern/SearchBar';
import CardGrid from '@/components/discern/CardGrid';
import Breadcrumb from '@/components/discern/Breadcrumb';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SlidersHorizontal } from 'lucide-react';

const AIOpsFrameworkMarketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(mockItems);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTab = searchParams.get('tab') || tabs[0].id;
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let filtered = mockItems;

    // Filter by active tab
    const activeTabConfig = tabs.find(t => t.id === activeTab);
    if (activeTabConfig) {
      filtered = filtered.filter(item => item.type === activeTabConfig.type);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply other filters from URL params
    const topicFilter = searchParams.get('topic');
    if (topicFilter) {
      const topics = topicFilter.split(',');
      filtered = filtered.filter(item =>
        topics.some(topic => item.topic.includes(topic))
      );
    }

    const audienceFilter = searchParams.get('audience');
    if (audienceFilter) {
      const audiences = audienceFilter.split(',');
      filtered = filtered.filter(item =>
        audiences.some(audience => item.audience.includes(audience))
      );
    }

    setFilteredItems(filtered);
  }, [searchParams, activeTab, searchQuery]);

  const handleTabChange = (tabId: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tabId);
    setSearchParams(newParams);
  };

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (values.length > 0) {
      newParams.set(filterType, values.join(','));
    } else {
      newParams.delete(filterType);
    }
    setSearchParams(newParams);
  };

  // Responsive padding
  const px = 'px-4 sm:px-6 lg:px-8';

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className={`${px} py-3 border-b border-gray-200 bg-white`}>
          <div className="flex items-center text-sm text-gray-500">
            <Breadcrumb pageName="AIOps Framework Library" />
          </div>
        </div>

        {/* Page title + subtitle + tabs */}
        <div className={`${px} pt-5 pb-0`}>
          <h1 className="text-2xl font-bold text-gray-900">AIOps Framework Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Define the rules that make AI governable at enterprise scale. Governance models, lifecycle standards, accountability frameworks, and responsible AI policies.
          </p>
          
          <div className="mt-6">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>

        {/* Search + Filter Toggle */}
        <div className={`${px} pt-4 pb-6 bg-white border-b border-gray-200`}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search frameworks and policies..."
              />
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex">
          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 bg-white border-r border-gray-200
            ${sidebarOpen ? 'fixed inset-y-0 left-0 z-40 pt-16' : ''}
          `}>
            <FilterSidebar
              searchParams={searchParams}
              onFilterChange={handleFilterChange}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className={`${px} py-6`}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  {filteredItems.length} framework{filteredItems.length !== 1 ? 's' : ''} available
                </p>
                <div className="text-xs text-gray-400">
                  Auto-refresh: <span className="text-blue-600 font-medium">Live</span>
                </div>
              </div>

              <CardGrid items={filteredItems} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIOpsFrameworkMarketplace;