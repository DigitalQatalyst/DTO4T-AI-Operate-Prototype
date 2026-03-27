import { URLSearchParamsInit } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { TabId } from '@/types/marketplace';

interface FilterSidebarProps {
  activeTab: TabId;
  searchParams: URLSearchParams;
  onFilterChange: (params: URLSearchParamsInit) => void;
}

const globalFilters: Record<string, string[]> = {
  Topic:           ['LLM', 'Prompting', 'RAG', 'Chatbots', 'Agents', 'Agentic', 'Governance', 'Risk', 'Tools'],
  'Role/Audience': ['Employee', 'Manager', 'Leader', 'Developer', 'Risk'],
  'Owner/Team':    ['DIA.AI', 'Governance', 'Architecture', 'Risk', 'Other'],
  Source:          ['Internal', 'External'],
  Date:            ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'],
  Status:          ['Approved', 'Archived'],
};

const tabFilters: Partial<Record<TabId, Record<string, string[]>>> = {
  'enterprise-ai-updates': {
    'Update Type': ['Announcement', 'Tool Update', 'Platform Update', 'Capability Update'],
    Impact:        ['Low', 'Medium', 'High'],
  },
  'model-release-briefings': {
    Vendor:         ['OpenAI', 'Microsoft', 'Google', 'Anthropic', 'Other'],
    'Model Family': ['GPT', 'Claude', 'Gemini', 'Other'],
    Recommendation: ['Approved', 'Pilot', 'Not Approved'],
    'Use Type':     ['Writing', 'Coding', 'Analysis', 'Agents'],
  },
  'regulatory-alerts': {
    Region:            ['Global', 'UAE', 'EU', 'US', 'Other'],
    'Policy Impacted': ['GDPR', 'AI Act', 'Local Regulations', 'Other'],
    'Action Required': ['Yes', 'No'],
  },
  'risk-advisories': {
    'Risk Category':        ['Privacy', 'Security', 'Compliance', 'Model Risk', 'Data Handling'],
    Severity:               ['Critical', 'High', 'Normal'],
    'Mitigation Available': ['Yes', 'No'],
  },
  'ai-transformation-insights': {
    Theme:       ['Strategy', 'Operating Model', 'Adoption', 'Governance', 'Change'],
    Stage:       ['Discern', 'Design', 'Deploy', 'Drive'],
    'Read Time': ['<5 min', '5–10 min', '10+ min'],
  },
  'dco-intelligence-briefs': {
    'DCO Theme':      ['Cognition', 'Decision Quality', 'Man+Machine', 'Governance', 'Value'],
    'Audience Level': ['Exec', 'Leaders', 'Practitioners'],
    'Read Time':      ['<5 min', '5–10 min', '10+ min'],
  },
  'enterprise-use-cases': {
    Function:     ['HR', 'Finance', 'Ops', 'Legal', 'Product', 'Delivery', 'Support'],
    Pattern:      ['Copilot', 'RAG', 'Agent', 'Workflow Automation'],
    Maturity:     ['Idea', 'Validated', 'In Delivery', 'Live'],
    'Value Band': ['Low', 'Medium', 'High'],
  },
  'industry-analysis': {
    Industry:    ['Public Sector', 'Finance', 'Retail', 'Healthcare', 'Manufacturing', 'Other'],
    'Trend Type':['Market', 'Tech', 'Regulation', 'Competitive'],
    Horizon:     ['Now', '6–12m', '12–24m'],
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
  const [open, setOpen] = useState(false);
  const active = searchParams.get(filterKey)?.split(',').filter(Boolean) || [];

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 px-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <ChevronDown
          className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          style={{ width: 14, height: 14, color: '#9CA3AF' }}
        />
      </button>
      {open && (
        <div className="pb-2 px-4">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 py-1.5 cursor-pointer hover:text-gray-900 transition-colors"
              style={{ fontSize: 13, color: '#4B5563' }}
            >
              <input
                type="checkbox"
                checked={active.includes(opt.toLowerCase())}
                onChange={() => onToggle(filterKey, opt)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ width: 14, height: 14 }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ activeTab, searchParams, onFilterChange }: FilterSidebarProps) => {
  const handleToggle = (filterKey: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(filterKey)?.split(',').filter(Boolean) || [];
    const idx = current.indexOf(value.toLowerCase());
    if (idx > -1) current.splice(idx, 1);
    else current.push(value.toLowerCase());
    if (current.length > 0) params.set(filterKey, current.join(','));
    else params.delete(filterKey);
    params.delete('page');
    onFilterChange(params);
  };

  const hasActiveFilters = [...searchParams.entries()].some(([k]) => !['tab', 'q', 'sort', 'page'].includes(k));

  const clearAll = () => {
    const params = new URLSearchParams();
    if (searchParams.get('tab')) params.set('tab', searchParams.get('tab')!);
    if (searchParams.get('q')) params.set('q', searchParams.get('q')!);
    onFilterChange(params);
  };

  const specific = tabFilters[activeTab] || {};

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Filters</span>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            style={{ fontSize: 12, color: '#6366F1', background: 'none', border: 'none', cursor: 'pointer' }}
            className="hover:underline"
          >
            Reset all
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
          options={opts as string[]}
          searchParams={searchParams}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default FilterSidebar;
