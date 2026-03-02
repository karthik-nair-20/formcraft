import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Icon name="DocumentAddIcon" size={48} className="text-primary" />
        </div>
        <svg
          className="absolute -top-2 -right-2 w-12 h-12 text-accent"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4L29.09 18.26L44 20.27L32.77 29.97L36.18 44.73L24 36.77L11.82 44.73L15.23 29.97L4 20.27L18.91 18.26L24 4Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">No forms yet</h3>
      <p className="text-text-secondary text-center max-w-md mb-8 leading-relaxed">
        Create your first form to start collecting responses. Choose from templates or build from scratch.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/form-builder-workspace"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-smooth shadow-subtle"
        >
          <Icon name="PlusIcon" size={20} />
          <span>Create Your First Form</span>
        </Link>
        <Link
          href="/template-gallery"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-text-primary rounded-xl font-medium hover:bg-surface transition-smooth"
        >
          <Icon name="TemplateIcon" size={20} />
          <span>Browse Templates</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;