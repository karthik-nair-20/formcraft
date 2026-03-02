'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FormCardProps {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  submissions: number;
  thumbnail: string;
  thumbnailAlt: string;
  onDuplicate: () => void;
  onDelete: () => void;
}

const FormCard = ({
  id,
  title,
  status,
  createdAt,
  submissions,
  thumbnail,
  thumbnailAlt,
  onDuplicate,
  onDelete,
}: FormCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const statusConfig = {
    published: {
      label: 'Published',
      color: 'text-success',
      bgColor: 'bg-success/10',
      icon: 'CheckCircleIcon' as const,
    },
    draft: {
      label: 'Draft',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'PencilIcon' as const,
    },
    archived: {
      label: 'Archived',
      color: 'text-text-secondary',
      bgColor: 'bg-muted',
      icon: 'ArchiveIcon' as const,
    },
  };

  const currentStatus = statusConfig[status];

  if (!isHydrated) {
    return (
      <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lift hover:border-primary/20 transition-all duration-300 shadow-card">
        <div className="relative h-52 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
          <AppImage
            src={thumbnail}
            alt={thumbnailAlt}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md bg-white/90 border border-white/20 shadow-subtle ${currentStatus.bgColor}`}>
            <Icon name={currentStatus.icon} size={14} className={currentStatus.color} variant="solid" />
            <span className={`text-xs font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight">{title}</h3>
          <div className="flex items-center gap-5 text-sm text-text-secondary mb-5">
            <div className="flex items-center gap-2">
              <Icon name="CalendarIcon" size={18} />
              <span className="font-medium">{createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CollectionIcon" size={18} />
              <span className="font-medium">{submissions}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/form-builder-workspace?id=${id}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 gradient-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-95 transition-smooth shadow-subtle">

              <Icon name="PencilIcon" size={16} />
              <span>Edit Form</span>
            </Link>
            <button className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-border text-text-secondary hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-200">
              <Icon name="DotsVerticalIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lift hover:border-primary/20 transition-all duration-300 relative shadow-card group">
      <div className="relative h-52 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <AppImage
          src={thumbnail}
          alt={thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md bg-white/90 border border-white/20 shadow-subtle ${currentStatus.bgColor}`}>
          <Icon name={currentStatus.icon} size={14} className={currentStatus.color} variant="solid" />
          <span className={`text-xs font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight">{title}</h3>
        <div className="flex items-center gap-5 text-sm text-text-secondary mb-5">
          <div className="flex items-center gap-2">
            <Icon name="CalendarIcon" size={18} />
            <span className="font-medium">{createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CollectionIcon" size={18} />
            <span className="font-medium">{submissions}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/form-builder-workspace?id=${id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 gradient-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-95 transition-smooth shadow-subtle">

            <Icon name="PencilIcon" size={16} />
            <span>Edit Form</span>
          </Link>
          <button
            onClick={() => setShowActions(!showActions)}
            className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-border text-text-secondary hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-200">

            <Icon name="DotsVerticalIcon" size={20} />
          </button>
        </div>
      </div>

      {showActions && (
        <>
          <div 
            className="fixed inset-0 z-[1]" 
            onClick={() => setShowActions(false)}
          />
          <div className="absolute right-5 bottom-24 bg-white border-2 border-border rounded-xl shadow-lift overflow-hidden z-[2] w-52">
            <Link
              href={`/form-submissions-view?id=${id}`}
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-text-primary hover:bg-blue-50 hover:text-primary transition-smooth">

              <Icon name="CollectionIcon" size={18} />
              <span>View Submissions</span>
            </Link>
            <Link
              href={`/form-preview-mode?id=${id}`}
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-text-primary hover:bg-blue-50 hover:text-primary transition-smooth">

              <Icon name="EyeIcon" size={18} />
              <span>Preview Form</span>
            </Link>
            <button
              onClick={onDuplicate}
              className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-medium text-text-primary hover:bg-blue-50 hover:text-primary transition-smooth">

              <Icon name="DuplicateIcon" size={18} />
              <span>Duplicate</span>
            </button>
            <div className="h-px bg-border" />
            <button
              onClick={onDelete}
              className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-medium text-error hover:bg-red-50 transition-smooth">

              <Icon name="TrashIcon" size={18} />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormCard;