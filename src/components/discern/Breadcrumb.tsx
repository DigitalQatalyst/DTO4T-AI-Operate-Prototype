import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string;
  section?: string; // e.g., 'Discern', 'Designs', 'Deploys', 'Drive'
}

const Breadcrumb = ({ pageName, section }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Determine the parent section based on current path or prop
  const getParentSection = () => {
    if (section) return { name: section, link: '/' };
    const path = location.pathname;
    if (path.includes('/design')) return { name: 'Design', link: '/design' };
    if (path.includes('/drive')) return { name: 'Drive', link: '/drive' };
    // All other marketplaces fall under Discern
    return { name: 'Discern', link: '/discern' };
  };

  const parentSection = getParentSection();
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <Home className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">Home</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">Resources</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/" className="hover:text-gray-900">DIA.AI</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to={parentSection.link} className="hover:text-gray-900">{parentSection.name}</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-gray-900">{pageName}</span>
    </div>
  );
};

export default Breadcrumb;
