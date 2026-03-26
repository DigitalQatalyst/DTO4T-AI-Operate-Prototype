import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(t);
  }, [local]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 h-11 w-full pl-10 pr-4 bg-white font-normal leading-5"
        style={{
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
          fontSize: '14px',
          lineHeight: '20px',
          padding: '10px 12px 10px 40px',
          color: '#111827',
          backgroundColor: '#FFFFFF'
        }}
      />
    </div>
  );
};

export default SearchBar;
