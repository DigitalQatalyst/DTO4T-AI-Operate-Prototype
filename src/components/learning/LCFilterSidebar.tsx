import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState } from '@/types/learning';
import { filterOptions } from '@/data/learningData';

interface LCFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const sections: { key: keyof FilterState; label: string }[] = [
  { key: 'department',  label: 'Department' },
  { key: 'category',    label: 'Course Category' },
  { key: 'provider',    label: 'LMS Item Provider' },
  { key: 'courseType',  label: 'Course Types' },
  { key: 'rating',      label: 'Rating - SFIA' },
  { key: 'location',    label: 'Location/Studio' },
  { key: 'audience',    label: 'Audience' },
];

function FilterSection({
  label,
  filterKey,
  options,
  selected,
  onToggle,
}: {
  label: string;
  filterKey: keyof FilterState;
  options: string[];
  selected: string[];
  onToggle: (key: keyof FilterState, value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors px-1 rounded"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-3 space-y-2 px-1">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(filterKey, opt)}
                className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function LCFilterSidebar({ filters, onFilterChange, onReset }: LCFilterSidebarProps) {
  const hasActive = Object.values(filters).some(v => v.length > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">Filters</span>
        {hasActive && (
          <button
            onClick={onReset}
            className="text-xs text-indigo-600 hover:underline transition-colors"
          >
            Reset all
          </button>
        )}
      </div>
      {sections.map(s => (
        <FilterSection
          key={s.key}
          label={s.label}
          filterKey={s.key}
          options={filterOptions[s.key]}
          selected={filters[s.key]}
          onToggle={onFilterChange}
        />
      ))}
    </div>
  );
}
