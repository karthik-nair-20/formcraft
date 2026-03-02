'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BulkActionsProps {
  selectedCount: number;
  onArchive: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
}

const BulkActions = ({ selectedCount, onArchive, onDelete, onClearSelection }: BulkActionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  if (!isHydrated || selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-scale-in">
      <div className="bg-card border border-border rounded-xl shadow-lift px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckCircleIcon" size={20} className="text-primary" variant="solid" />
          <span className="text-sm font-medium text-text-primary">
            {selectedCount} form{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2">
          <button
            onClick={onArchive}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-surface transition-smooth"
          >
            <Icon name="ArchiveIcon" size={18} />
            <span>Archive</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-error hover:bg-error/5 transition-smooth"
          >
            <Icon name="TrashIcon" size={18} />
            <span>Delete</span>
          </button>
          <button
            onClick={onClearSelection}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
          >
            <Icon name="XIcon" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;