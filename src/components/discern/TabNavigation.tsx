import { TabConfig, TabId } from '@/types/marketplace';

interface TabNavigationProps {
  tabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => (
  <nav role="tablist" aria-label="Content categories" className="flex gap-0 overflow-x-auto scrollbar-hide">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-current={activeTab === tab.id ? 'page' : undefined}
        onClick={() => onTabChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          activeTab === tab.id
            ? 'border-foreground text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default TabNavigation;
