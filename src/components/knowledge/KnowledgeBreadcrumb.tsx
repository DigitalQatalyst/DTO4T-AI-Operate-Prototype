import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface KnowledgeBreadcrumbProps {
  activeTab: string;
}

const KnowledgeBreadcrumb = ({ activeTab }: KnowledgeBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Link to="/" className="hover:text-gray-900">Discern</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-gray-900">AI Knowledge Center</span>
    </div>
  );
};

export default KnowledgeBreadcrumb;