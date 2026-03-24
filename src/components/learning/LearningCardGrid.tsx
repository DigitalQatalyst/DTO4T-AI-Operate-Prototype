import { LearningItem } from '@/types/learning';
import LearningCard from './LearningCard';

interface LearningCardGridProps {
  items: LearningItem[];
}

const LearningCardGrid = ({ items }: LearningCardGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No items found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <LearningCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default LearningCardGrid;
