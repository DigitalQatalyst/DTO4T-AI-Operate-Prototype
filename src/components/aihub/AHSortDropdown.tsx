import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/data/aiHubData';

interface AHSortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
  options: { value: SortOption; label: string }[];
}

export function AHSortDropdown({ value, onChange, options }: AHSortDropdownProps) {
  return (
    <div className="relative flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-gray-300 transition-colors">
      <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
      <select
        value={value}
        onChange={e => onChange(e.target.value as SortOption)}
        className="text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none pr-1"
        aria-label="Sort"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
