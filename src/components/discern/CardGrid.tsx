import { MarketplaceItem } from '@/types/marketplace';
import ContentCard from './ContentCard';

interface CardGridProps {
  items: MarketplaceItem[];
  basePath?: string; // e.g., '/discern' or '/aiops-framework'
}

const CardGrid = ({ items, basePath }: CardGridProps) => {
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
        <ContentCard key={item.id} item={item} basePath={basePath} />
      ))}
    </div>
  );
};

export default CardGrid;
