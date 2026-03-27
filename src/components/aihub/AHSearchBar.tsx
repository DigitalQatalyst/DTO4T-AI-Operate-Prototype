import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AHSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function AHSearchBar({ value, onChange, placeholder = 'Search...' }: AHSearchBarProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange(local), 300);
    return () => clearTimeout(t);
  }, [local]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={local}
        onChange={e => setLocal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
      />
    </div>
  );
}
