import { URLSearchParamsInit } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

interface FilterSidebarProps {
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
  'enterprise-updates': {
    'Update Type': ['Announcement', 'Tool Update', 'Platform Update', 'Capability Update'],
    Impact:        ['Low', 'Medium', 'High'],
  },
  'model-briefings': {
    Vendor:         ['OpenAI', 'Microsoft', 'Google', 'Anthropic', 'Other'],
    'Model Family': ['GPT', 'Claude', 'Gemini', 'Other'],
    Recommendation: ['Approved', 'Pilot', 'Not Approved'],
  },
  'regulatory-alerts': {
    Region:            ['Global', 'UAE', 'EU', 'US', 'Other'],
    'Action Required': ['Yes', 'No'],
  },
  'risk-advisories': {
    'Risk Category':        ['Privacy', 'Security', 'Compliance', 'Model Risk', 'Data Handling'],
    Severity:               ['Critical', 'High', 'Normal'],
    'Mitigation Available': ['Yes', 'No'],
  },
  'transformation-insights': {
    Theme:      ['Strategy', 'Operating Model', 'Adoption', 'Governance', 'Change'],
    Stage:      ['Discern', 'Design', 'Deploy', 'Drive'],
    'Read Time':['<5 min', '5–10 min', '10+ min'],
  },
  'dco-briefs': {
    'DCO Theme':      ['Cognition', 'Decision Quality', 'Man+Machine', 'Governance', 'Value'],
    'Audience Level': ['Exec', 'Leaders', 'Practitioners'],
  },
  'use-cases': {
    Function: ['HR', 'Finance', 'Ops', 'Legal', 'Product', 'Delivery', 'Support'],
    Pattern:  ['Copilot', 'RAG', 'Agent', 'Workflow Automation'],
    Maturity: ['Idea', 'Validated', 'In Delivery', 'Live'],
  },
  'industry-analysis': {
    Industry:    ['Public Sector', 'Finance', 'Retail', 'Healthcare', 'Manufacturing', 'Other'],
    'Trend Type':['Market', 'Tech', 'Regulation', 'Competitive'],
    Horizon:     ['Now', '6–12m', '12–24m'],
  },
  'governance-models': {
    'Framework Type': ['Operating Model', 'Decision Authority', 'Ownership Matrix', 'RACI'],
    'Maturity Level': ['Basic', 'Intermediate', 'Advanced'],
    'Implementation': ['Template', 'Guide', 'Policy'],
  },
  'lifecycle-standards': {
    'Lifecycle Stage': ['Intake', 'Build', 'Release', 'Monitor', 'Retire'],
    'Gate Type': ['Quality', 'Security', 'Compliance', 'Business'],
    'Standard Type': ['Process', 'Checklist', 'Template'],
  },
  'accountability-frameworks': {
    'Framework Focus': ['Roles', 'Approvals', 'Escalation', 'Accountability'],
    'Organizational Level': ['Team', 'Department', 'Enterprise'],
    'Decision Type': ['Technical', 'Business', 'Risk'],
  },
  'responsible-ai-policies': {
    'Policy Area': ['Risk Management', 'Transparency', 'Compliance', 'Ethics'],
    'Regulation': ['NIST', 'EU AI Act', 'Internal', 'Industry'],
    'Control Type': ['Preventive', 'Detective', 'Corrective'],
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
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(!open);
  };

  const active = searchParams.get(filterKey)?.split(',') || [];

  return (
    <div className="border-b border-gray-100 py-2">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-left hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 p-1.5 rounded-lg -mx-1.5"
        style={{ letterSpacing: '0.3px' }}
      >
        <span 
          className="font-semibold text-gray-800"
          style={{
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}
        >
          {title}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {open && (
        <div className="pt-2 space-y-2 animate-in slide-in-from-top-1 duration-200">
          {options.map((opt) => (
            <label 
              key={opt} 
              className="flex items-center gap-2 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-lg transition-all duration-200"
              style={{ letterSpacing: '0.3px' }}
            >
              <input
                type="checkbox"
                checked={active.includes(opt.toLowerCase())}
                onChange={() => onToggle(filterKey, opt)}
                className="rounded border-gray-300 text-[#0f1f5c] focus:ring-[#0f1f5c] h-3 w-3 transition-colors"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                {opt}
              </span>
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
    <div 
      className="rounded-xl bg-white shadow-lg border border-gray-100"
      style={{
        fontFamily: 'Inter, -apple-system, system-ui, "Segoe UI", sans-serif',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.3px',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        padding: '16px',
        margin: '0px',
        width: '280px',
        height: '400px',
        overflow: 'auto'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span 
          className="font-bold text-gray-900"
          style={{
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}
        >
          Filters
        </span>
        {hasActiveFilters && (
          <button 
            onClick={clearAll} 
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            style={{ letterSpacing: '0.3px' }}
          >
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

export default FilterSidebar;
