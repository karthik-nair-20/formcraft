import Icon from '@/components/ui/AppIcon';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  resultsCount: number;
}

const FilterControls = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  statusFilter,
  onStatusFilterChange,
  resultsCount,
}: FilterControlsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Icon
            name="SearchIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search submissions..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth shadow-subtle">
          <Icon name="DownloadIcon" size={18} />
          <span>Export</span>
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Date Range */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-text-secondary mb-1">
              From Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                onDateRangeChange({ ...dateRange, start: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">
              To Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                onDateRangeChange({ ...dateRange, end: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <label className="block text-xs text-text-secondary mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
          >
            <option value="all">All Submissions</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium text-text-primary">{resultsCount}</span> results
        </p>
        <button className="text-sm text-primary hover:underline transition-smooth">
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;