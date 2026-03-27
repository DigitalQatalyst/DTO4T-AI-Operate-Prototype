import { TabConfig } from '@/data/aiHubData';

interface AHTabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (slug: string) => void;
}

export function AHTabNavigation({ tabs, activeTab, onTabChange }: AHTabNavigationProps) {
  return (
    <div className="overflow-x-auto scrollbar-none border-b border-gray-200">
      <div className="flex min-w-max">
        {tabs.map(tab => (
          <button
            key={tab.slug}
            onClick={() => onTabChange(tab.slug)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:outline-none ${
              activeTab === tab.slug
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === tab.slug}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
