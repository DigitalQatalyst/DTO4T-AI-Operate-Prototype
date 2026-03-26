import { URLSearchParamsInit } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

interface KnowledgeFilterSidebarProps {
  activeTab: string;
  searchParams: URLSearchParams;
  onFilterChange: (params: URLSearchParamsInit) => void;
}

const globalFilters: Record<string, string[]> = {
  Topic:           ['LLM', 'RAG', 'Agents', 'Agentic', 'Governance', 'Security', 'Adoption', 'Tools'],
  'Role/Audience': ['Employee', 'Manager', 'Leader', 'Developer', 'Risk'],
  Date:            ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'],
};

const tabFilters: Record<string, Record<string, string[]>> = {
  'strategy-docs': {
    'Document Type': ['Strategic Plan', 'Framework', 'Roadmap', 'Investment Guide'],
    'Approval Level': ['Executive', 'Department', 'Team'],
  },
  'governance-policies': {
    'Policy Type':        ['Ethics', 'Privacy', 'Compliance', 'Risk Management'],
    'Compliance Required': ['Yes', 'No'],
  },
  'architecture-standards': {
    'Standard Type': ['Security', 'Blueprint', 'Technical', 'Integration'],
    'Maturity Level': ['Foundation', 'Intermediate', 'Advanced'],
  },
  'playbooks-patterns': {
    'Guide Type': ['Playbook', 'Best Practices', 'Templates', 'Procedures'],
    'Implementation': ['Yes', 'No'],
    'Read Time': ['<15 min', '15–30 min', '30+ min'],
  },
};

// Animated collapsible section
const FilterSection = ({
  title,
  filterKey,
  options,
  searchParams,
  onToggle,
}: {
  title: string;
  filterKey: string;
  options: string[];
  searchParams: URLSearchParams;
  onToggle: (key: string, val: string) => void;
}) => {
  const [open, setOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      // collapse: set explicit px height first, then animate to 0
      el.style.height = `${el.scrollHeight}px`;
      requestAnimationFrame(() => {
        el.style.height = '0px';
      });
    } else {
      // expand: animate to scrollHeight, then clear to auto
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', () => {
        el.style.height = 'auto';
      }, { once: true });
    }
    setOpen(!open);
  };

  const active = searchParams.get(filterKey)?.split(',') || [];

  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <ChevronDown
          className="h-4 w-4 text-gray-400 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        ref={contentRef}
        style={{ overflow: 'hidden', transition: 'height 0.22s ease' }}
      >
        <div className="pt-2.5 space-y-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={active.includes(opt.toLowerCase())}
                onChange={() => onToggle(filterKey, opt)}
                className="rounded border-gray-300 text-[#0f1f5c] focus:ring-[#0f1f5c] h-3.5 w-3.5"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const KnowledgeFilterSidebar = ({ activeTab, searchParams, onFilterChange }: KnowledgeFilterSidebarProps) => {
  const handleToggle = (filterKey: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(filterKey)?.split(',').filter(Boolean) || [];
    const idx = current.indexOf(value.toLowerCase());
    if (idx > -1) current.splice(idx, 1);
    else current.push(value.toLowerCase());
    if (current.length > 0) params.set(filterKey, current.join(','));
    else params.delete(filterKey);
    onFilterChange(params);
  };

  const hasActiveFilters = [...searchParams.entries()].some(
    ([k]) => !['tab', 'q', 'sort', 'page'].includes(k)
  );

  const clearAll = () => {
    const params = new URLSearchParams();
    if (searchParams.get('tab')) params.set('tab', searchParams.get('tab')!);
    if (searchParams.get('q'))   params.set('q',   searchParams.get('q')!);
    onFilterChange(params);
  };

  const specific = tabFilters[activeTab] || {};

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-gray-900">Filters</span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs text-blue-600 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {Object.entries(globalFilters).map(([title, opts]) => (
        <FilterSection
          key={title}
          title={title}
          filterKey={title.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')}
          options={opts}
          searchParams={searchParams}
          onToggle={handleToggle}
        />
      ))}

      {Object.entries(specific).map(([title, opts]) => (
        <FilterSection
          key={title}
          title={title}
          filterKey={title.toLowerCase().replace(/\s+/g, '-')}
          options={opts}
          searchParams={searchParams}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default KnowledgeFilterSidebar;