'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    alt: string;
    rating: number;
    usageCount: number;
    isFeatured: boolean;
    tags: string[];
  };
  onUseTemplate: (id: string) => void;
  onPreview: (id: string) => void;
}

const TemplateCard = ({ template, onUseTemplate, onPreview }: TemplateCardProps) => {
  return (
    <div className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lift hover:border-primary/20 transition-all duration-300 shadow-card">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <AppImage
          src={template.image}
          alt={template.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {template.isFeatured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-sm text-white text-xs font-medium rounded-lg shadow-subtle">
            ⭐ Featured
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-text-primary shadow-subtle border border-white/20">
          {template.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {template.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-text-secondary text-xs rounded-lg border border-blue-100/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <Icon name="StarIcon" size={16} className="text-amber-500" />
            <span className="font-medium">{template.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="UsersIcon" size={16} className="text-blue-500" />
            <span className="font-medium">{template.usageCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onUseTemplate(template.id)}
            className="flex-1 px-4 py-2.5 gradient-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-95 transition-smooth shadow-subtle"
          >
            Use Template
          </button>
          <button
            onClick={() => onPreview(template.id)}
            className="px-4 py-2.5 border-2 border-border text-text-primary rounded-xl text-sm font-medium hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200"
          >
            <Icon name="EyeIcon" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;