import { KnowledgeItem } from '@/types/knowledgeCenter';
import KnowledgeContentCard from './KnowledgeContentCard';

interface KnowledgeCardGridProps {
  items: KnowledgeItem[];
}

const KnowledgeCardGrid = ({ items }: KnowledgeCardGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No documents found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <KnowledgeContentCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default KnowledgeCardGrid;