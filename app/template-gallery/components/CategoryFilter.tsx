'use client';



interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-subtle'
                : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-text-primary border border-border/50'
            }
          `}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;