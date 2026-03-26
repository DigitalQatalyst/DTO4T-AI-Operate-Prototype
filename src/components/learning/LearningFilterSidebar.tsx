import { URLSearchParamsInit } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

interface LearningFilterSidebarProps {
  activeTab: string;
  searchParams: URLSearchParams;
  onFilterChange: (params: URLSearchParamsInit) => void;
}

const globalFilters: Record<string, string[]> = {
  Topic:           ['Foundations', 'Prompting', 'Governance', 'Tools', 'Development', 'Productivity', 'Adoption', 'Ethics'],
  'Role/Audience': ['Employee', 'Manager', 'Leader', 'Developer', 'Risk'],
  Level:           ['Beginner', 'Intermediate', 'Advanced'],
  Format:          ['Course', 'Guide', 'Video', 'Workshop', 'Playbook', 'Reference'],
};

const tabFilters: Record<string, Record<string, string[]>> = {
  'foundational': {
    'Duration': ['< 15 min', '15–30 min', '30+ min'],
  },
  'prompt-engineering': {
    'Duration':   ['< 30 min', '30–60 min', '60+ min'],
    'Complexity': ['Basic', 'Intermediate', 'Advanced'],
  },
  'role-pathways': {
    'Function':    ['HR', 'Finance', 'Operations', 'Legal', 'Product', 'Delivery', 'Support', 'Technology'],
    'Career Level':['Individual Contributor', 'Manager', 'Senior Leader', 'Executive'],
  },
  'governance-ethics': {
    'Theme': ['Bias & Fairness', 'Acceptable Use', 'Data Privacy', 'Accountability', 'Regulation'],
  },
  'tool-proficiency': {
    'Tool':    ['Microsoft Copilot', 'GitHub Copilot', 'Glean', 'Azure OpenAI', 'Other'],
    'Duration':['< 30 min', '30–60 min', '60+ min'],
  },
  'advanced-skills': {
    'Technical Area': ['LLMs', 'RAG', 'Agents', 'Fine-Tuning', 'Evaluation', 'MLOps'],
    'Duration':       ['1–2 hrs', '2–4 hrs', '4+ hrs'],
  },
  'certification': {
    'Track':    ['Foundation', 'Practitioner', 'Expert', 'Specialist'],
    'Duration': ['< 4 hrs', '4–8 hrs', '8+ hrs'],
  },
  'resources': {
    'Resource Type': ['Cheat-Sheet', 'Playbook', 'Reference Guide', 'Template', 'Video'],
  },
};

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
      el.style.height = `${el.scrollHeight}px`;
      requestAnimationFrame(() => { el.style.height = '0px'; });
    } else {
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', () => { el.style.height = 'auto'; }, { once: true });
    }
    setOpen(!open);
  };

  const active = searchParams.get(filterKey)?.split(',') || [];

  return (
    <div className="border-b border-gray-100 py-3">
      <button onClick={toggle} className="flex items-center justify-between w-full text-left">
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <ChevronDown
          className="h-4 w-4 text-gray-400 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div ref={contentRef} style={{ overflow: 'hidden', transition: 'height 0.22s ease' }}>
        <div className="pt-2.5 space-y-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={active.includes(opt.toLowerCase())}
                onChange={() => onToggle(filterKey, opt)}
                className="rounded border-gray-300 text-[#0f3d2e] focus:ring-[#0f3d2e] h-3.5 w-3.5"
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

const LearningFilterSidebar = ({ activeTab, searchParams, onFilterChange }: LearningFilterSidebarProps) => {
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

export default LearningFilterSidebar;
