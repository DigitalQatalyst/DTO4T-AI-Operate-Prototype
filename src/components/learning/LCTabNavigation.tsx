import { LearningTab } from '@/types/learning';

const TABS: { id: LearningTab; label: string }[] = [
  { id: 'courses', label: 'Courses' },
  { id: 'learning-tracks', label: 'Learning Tracks' },
  { id: 'reviews', label: 'Reviews' },
];

interface LCTabNavigationProps {
  activeTab: LearningTab;
  onTabChange: (tab: LearningTab) => void;
}

export function LCTabNavigation({ activeTab, onTabChange }: LCTabNavigationProps) {
  return (
    <div className="flex gap-0 border-b border-gray-200">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap focus-visible:outline-none ${
            activeTab === tab.id
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
