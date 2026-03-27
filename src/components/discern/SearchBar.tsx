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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ width: 16, height: 16 }} />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          paddingLeft: 36,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
          border: '1px solid #D1D5DB',
          borderRadius: 8,
          fontSize: 14,
          color: '#111827',
          background: 'white',
          outline: 'none',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#6366F1')}
        onBlur={e => (e.currentTarget.style.borderColor = '#D1D5DB')}
      />
    </div>
  );
};

export default SearchBar;
