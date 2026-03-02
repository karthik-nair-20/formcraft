'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  onFilter: (status: string) => void;
}

const SearchAndFilters = ({ onSearch, onSort, onFilter }: SearchAndFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  if (!isHydrated) {
    return (
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
              <Icon name="SearchIcon" size={20} className="text-text-secondary" />
            </div>
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <select
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth min-w-0"
            disabled
          >
            <option value="date">Sort by Date</option>
          </select>
          <select
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth min-w-0"
            disabled
          >
            <option value="all">All Status</option>
          </select>
        </div>
      </div>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterStatus(value);
    onFilter(value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="flex-1 min-w-0">
        <div className="relative">
          <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Icon name="SearchIcon" size={20} className="text-text-secondary" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search forms..."
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth overflow-hidden text-ellipsis"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth cursor-pointer min-w-0 overflow-hidden text-ellipsis"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="submissions">Sort by Submissions</option>
        </select>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-input rounded-lg text-sm sm:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth cursor-pointer min-w-0 overflow-hidden text-ellipsis"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;