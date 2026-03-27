import { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FilterGroup } from '@/data/aiHubData';

interface AHFilterSidebarProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  activeTabKey?: string; // used to auto-collapse on tab switch
}

function AccordionSection({
  group,
  selected,
  onChange,
  resetKey,
}: {
  group: FilterGroup;
  selected: string[];
  onChange: (v: string) => void;
  resetKey: string;
}) {
  const [open, setOpen] = useState(false);

  // Auto-collapse when tab changes
  useEffect(() => { setOpen(false); }, [resetKey]);

  const count = selected.length;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-3 px-1 text-left hover:bg-gray-50 rounded transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{group.label}</span>
          {count > 0 && (
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {count}
            </span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-3 space-y-2 px-1">
          {group.options.map(opt => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
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

export function AHFilterSidebar({
  groups,
  selected,
  onChange,
  onClearAll,
  isMobileOpen,
  onCloseMobile,
  activeTabKey = '',
}: AHFilterSidebarProps) {
  const totalActive = Object.values(selected).reduce((s, v) => s + v.length, 0);

  const inner = (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">Filters</span>
          {totalActive > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button onClick={onClearAll} className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors">
            Reset All
          </button>
        )}
      </div>
      {groups.map(g => (
        <AccordionSection
          key={g.id}
          group={g}
          selected={selected[g.id] || []}
          onChange={v => onChange(g.id, v)}
          resetKey={activeTabKey}
        />
      ))}
    </div>
  );

  // Mobile drawer
  if (isMobileOpen !== undefined) {
    return (
      <>
        {/* Desktop */}
        <div className="hidden lg:block">{inner}</div>

        {/* Mobile drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={onCloseMobile} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900">Filters</span>
                <button onClick={onCloseMobile} aria-label="Close">
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {groups.map(g => (
                  <AccordionSection
                    key={g.id}
                    group={g}
                    selected={selected[g.id] || []}
                    onChange={v => onChange(g.id, v)}
                    resetKey={activeTabKey}
                  />
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 flex gap-2 flex-shrink-0">
                <button onClick={onClearAll} className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Reset
                </button>
                <button onClick={onCloseMobile} className="flex-1 py-2 text-sm text-white rounded-lg transition-colors" style={{ background: '#0a1930' }}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return inner;
}
