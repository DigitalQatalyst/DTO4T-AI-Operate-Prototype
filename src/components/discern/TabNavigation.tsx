import { TabConfig } from '@/types/marketplace';

interface TabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => (
  <div className="flex gap-0 overflow-x-auto scrollbar-hide">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
          activeTab === tab.id
            ? 'border-[#0f1f5c] text-[#0f1f5c]'
            : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabNavigation;
