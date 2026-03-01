import Icon from '@/components/ui/AppIcon';

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const EmptyState = ({ searchQuery, onClearSearch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mb-6">
        <Icon name="SearchIcon" size={40} className="text-text-secondary" />
      </div>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">
        No templates found
      </h3>
      <p className="text-text-secondary text-center max-w-md mb-8 leading-relaxed">
        {searchQuery
          ? `We couldn't find any templates matching "${searchQuery}"`
          : 'Try adjusting your filters to see more results'}
      </p>
      <button
        onClick={onClearSearch}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-smooth shadow-subtle"
      >
        Clear Search
      </button>
    </div>
  );
};

export default EmptyState;