import { MarketplaceItem } from '@/types/marketplace';
import ContentCard from './ContentCard';

interface CardGridProps {
  items: MarketplaceItem[];
  onViewDetail?: (id: string) => void;
  compact?: boolean;
}

const CardGrid = ({ items, onViewDetail, compact }: CardGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">No items found. Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onViewDetail={onViewDetail} compact={compact} />
      ))}
    </div>
  );
};

export default CardGrid;
