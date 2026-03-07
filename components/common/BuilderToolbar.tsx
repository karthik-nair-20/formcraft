'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BuilderToolbarProps {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onPreview?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

const BuilderToolbar = ({
  onSave,
  onUndo,
  onRedo,
  onPreview,
  canUndo = false,
  canRedo = false,
  isSaving = false,
  lastSaved = null,
}: BuilderToolbarProps) => {
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);

      if (diff < 60) {
        setTimeAgo('Just now');
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        setTimeAgo(`${minutes}m ago`);
      } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        setTimeAgo(`${hours}h ago`);
      } else {
        setTimeAgo('Over a day ago');
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000);

    return () => clearInterval(interval);
  }, [lastSaved]);

  const handleSave = () => {
    if (onSave) {
      onSave();
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }
  };

  const handleUndo = () => {
    if (canUndo && onUndo) {
      onUndo();
    }
  };

  const handleRedo = () => {
    if (canRedo && onRedo) {
      onRedo();
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
    }
  };

  return (
    <div
      className="flex items-center justify-between h-14 px-6 bg-surface border-b border-border"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Left Section - History Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleUndo}
          disabled={!canUndo}
          className={`
            flex items-center justify-center w-9 h-9 rounded-lg transition-smooth
            ${
              canUndo
                ? 'text-text-primary hover:bg-background hover-lift'
                : 'text-text-secondary opacity-40 cursor-not-allowed'
            }
          `}
          title="Undo (⌘Z)"
          aria-label="Undo"
        >
          <Icon name="ReplyIcon" size={18} />
        </button>

        <button
          onClick={handleRedo}
          disabled={!canRedo}
          className={`
            flex items-center justify-center w-9 h-9 rounded-lg transition-smooth
            ${
              canRedo
                ? 'text-text-primary hover:bg-background hover-lift'
                : 'text-text-secondary opacity-40 cursor-not-allowed'
            }
          `}
          title="Redo (⌘⇧Z)"
          aria-label="Redo"
        >
          <Icon name="ReplyIcon" size={18} className="transform scale-x-[-1]" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Save Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background">
          {isSaving ? (
            <>
              <Icon name="RefreshIcon" size={16} className="text-primary animate-spin" />
              <span className="text-sm text-text-secondary">Saving...</span>
            </>
          ) : showSaveSuccess ? (
            <>
              <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
              <span className="text-sm text-success">Saved</span>
            </>
          ) : lastSaved ? (
            <>
              <Icon name="CloudIcon" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">{timeAgo}</span>
            </>
          ) : (
            <>
              <Icon name="CloudIcon" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Not saved</span>
            </>
          )}
        </div>
      </div>

      {/* Center Section - Form Title */}
      <div className="flex-1 flex items-center justify-center px-4">
        <input
          type="text"
          defaultValue="Untitled Form"
          className="text-base font-medium text-text-primary bg-transparent border-none focus:outline-none text-center max-w-md"
          placeholder="Form name"
        />
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePreview}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-background transition-smooth hover-lift"
          title="Preview form"
        >
          <Icon name="EyeIcon" size={18} />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth shadow-subtle"
          title="Save changes (⌘S)"
        >
          <Icon name="SaveIcon" size={18} />
          <span className="hidden sm:inline">Save</span>
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-smooth"
          title="More options"
          aria-label="More options"
        >
          <Icon name="DotsVerticalIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;