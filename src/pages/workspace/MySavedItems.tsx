import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Trash2, ExternalLink, Calendar, Tag, FolderOpen, Search, Filter } from 'lucide-react';
import { SavedItem } from '@/types/workspace';
import { workspaceDataService } from '@/services/workspaceData';

interface MySavedItemsProps {
  user: { name: string; email: string; role: string };
}

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  opportunity: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  pathway: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  resource: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  service: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

const typeLabels: Record<string, string> = {
  opportunity: 'AI Opportunity',
  pathway: 'Solution Pathway',
  resource: 'Resource',
  service: 'AI Service',
};

export default function MySavedItems({ user }: MySavedItemsProps) {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadSavedItems();
  }, [user.email]);

  const loadSavedItems = async () => {
    setLoading(true);
    try {
      const items = await workspaceDataService.getSavedItems(user.email);
      setSavedItems(items);
    } catch (error) {
      console.error('Failed to load saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (itemId: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleQuickAction = (item: SavedItem) => {
    // Navigate based on item type
    switch (item.type) {
      case 'opportunity':
        navigate('/workspace/opportunity');
        break;
      case 'pathway':
        navigate('/workspace/specialist-workspaces');
        break;
      case 'service':
        navigate('/workspace/request', { state: { prefilledService: item } });
        break;
      default:
        navigate('/workspace/discovery');
    }
  };

  // Get unique tags from all saved items
  const allTags = Array.from(new Set(savedItems.flatMap(item => item.tags))).sort();

  // Filter items
  const filteredItems = savedItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });

  // Group by type
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SavedItem[]>);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Saved Items</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your bookmarked AI opportunities, pathways, and resources
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(typeLabels).map(([type, label]) => {
          const count = savedItems.filter(item => item.type === type).length;
          const colors = typeColors[type];
          return (
            <div
              key={type}
              className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}
            >
              <p className={`text-xs font-medium ${colors.text}`}>{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="flex-1 outline-none text-sm text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium">Type:</span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {Object.entries(typeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 font-medium">Tags:</span>
            {allTags.slice(0, 10).map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  );
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filteredItems.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{savedItems.length}</span> items
        </p>
        {(searchQuery || selectedType !== 'all' || selectedTags.length > 0) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedTags([]);
            }}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Saved Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const colors = typeColors[item.type];
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-[#0f1f5c] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Saved {new Date(item.savedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuickAction(item)}
                    className="flex-1 px-3 py-2 bg-[#0f1f5c] text-white text-xs font-medium rounded-lg hover:bg-[#1a2f7c] transition-colors"
                  >
                    Quick Action
                  </button>
                  <button
                    className="px-3 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    title="View details"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          {savedItems.length === 0 ? (
            <>
              <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Start exploring AI capabilities and save items for quick access later
              </p>
              <button
                onClick={() => navigate('/workspace/discovery')}
                className="px-4 py-2 bg-[#0f1f5c] text-white text-sm font-medium rounded-lg hover:bg-[#1a2f7c] transition-colors"
              >
                Browse AI Discovery
              </button>
            </>
          ) : (
            <>
              <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No items match your filters</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedTags([]);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear all filters
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
