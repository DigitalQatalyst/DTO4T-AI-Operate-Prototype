import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AHPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function AHPagination({ currentPage, totalPages, onPageChange }: AHPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 text-gray-600" />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
            p === currentPage
              ? 'bg-slate-900 text-white'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
}
