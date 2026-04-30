import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bookmark, ExternalLink, Sparkles, BookOpen, Wrench, Users, TrendingUp, X } from 'lucide-react';
import { MarketplaceItem } from '@/types/marketplace';

// Import marketplace data
import { mockItems as useCaseItems } from '@/data/usecaseMarketplace';
import { mockItems as driveItems } from '@/data/driveMarketplace';
import { mockItems as designItems } from '@/data/designMarketplace';
import { mockItems as deployItems } from '@/data/deploysMarketplace';

interface AIDiscoveryProps {}

type ItemWithCategory = MarketplaceItem & { itemCategory: 'use-cases' | 'tools' | 'blueprints' | 'community' };

const categories = [
  { id: 'all', label: 'All Categories', icon: Sparkles },
  { id: 'use-cases', label: 'Use Cases', icon: BookOpen },
  { id: 'tools', label: 'Tools & Platforms', icon: Wrench },
  { id: 'blueprints', label: 'Blueprints', icon: TrendingUp },
  { id: 'community', label: 'Community', icon: Users },
];

export default function AIDiscovery({}: AIDiscoveryProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemWithCategory[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  // Combine all marketplace items with category metadata
  const allItems: ItemWithCategory[] = [
    ...useCaseItems.map(item => ({ ...item, itemCategory: 'use-cases' as const })),
    ...driveItems.map(item => ({ ...item, itemCategory: 'tools' as const })),
    ...designItems.map(item => ({ ...item, itemCategory: 'blueprints' as const })),
    ...deployItems.map(item => ({ ...item, itemCategory: 'tools' as const })),
  ];

  // Extract unique tags
  const allTags = Array.from(new Set(allItems.flatMap(item => item.tags))).sort();

  useEffect(() => {
    let items = [...allItems];

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.itemCategory === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      items = items.filter(item =>
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    setFilteredItems(items);
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleSave = (itemId: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleRequestSubmission = (item: ItemWithCategory) => {
    // Navigate to AI Request workflow with pre-filled data
    navigate('/workspace/request', { state: { prefilledItem: item } });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Discovery</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse available AI capabilities, services, and resources across the platform
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI capabilities, tools, use cases..."
            className="flex-1 outline-none text-sm text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              showFilters || selectedTags.length > 0
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedTags.length > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#0f1f5c] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <cat.icon className="h-4 w-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Filter by Tags</h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 20).map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200"
            >
              {tag}
              <button onClick={() => toggleTag(tag)} className="hover:text-blue-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filteredItems.length}</span> items found
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#0f1f5c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{item.ownerTeam}</p>
              </div>
              <button
                onClick={() => toggleSave(item.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  savedItems.has(item.id)
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${savedItems.has(item.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {item.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRequestSubmission(item)}
                className="flex-1 px-3 py-2 bg-[#0f1f5c] text-white text-xs font-medium rounded-lg hover:bg-[#1a2f7c] transition-colors"
              >
                Request Access
              </button>
              <button
                onClick={() => navigate(item.contentUrl)}
                className="px-3 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTags([]);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
