import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  activeTab: string;
}

const Breadcrumb = ({ activeTab }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <Home className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">Home</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">Resources</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">DIA AI Hub</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">Discern</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-gray-900">AI Updates & Insights Center</span>
    </div>
  );
};

export default Breadcrumb;
