'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search templates...' }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 bg-background border rounded-lg
          transition-smooth
          ${isFocused ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-input'}
        `}
      >
        <Icon 
          name="SearchIcon" 
          size={20} 
          className={isFocused ? 'text-primary' : 'text-text-secondary'} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="text-text-secondary hover:text-text-primary transition-smooth"
            aria-label="Clear search"
          >
            <Icon name="XIcon" size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;