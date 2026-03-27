import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LCBreadcrumb() {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500">
      <Home className="h-3.5 w-3.5 flex-shrink-0" />
      <Link to="/" className="hover:text-gray-800 transition-colors">Home</Link>
      <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="text-gray-900 font-medium">DQ Learning Center</span>
    </nav>
  );
}
