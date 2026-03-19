import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const options = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'recommended', label: 'Recommended' },
    { value: 'severity', label: 'Highest Severity' },
    { value: 'viewed', label: 'Most Viewed' }
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;
