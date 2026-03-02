'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormBlockProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
}

const FormBlock = ({
  id,
  type,
  label,
  placeholder,
  required,
  options,
  onDuplicate,
  onDelete,
  onUpdate,
  onDragStart,
  onDragEnd,
}: FormBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);

  const handleLabelBlur = () => {
    setIsEditing(false);
    if (editLabel.trim() !== label) {
      onUpdate(id, { label: editLabel.trim() });
    }
  };

  const renderBlockContent = () => {
    switch (type) {
      case 'short-text':
        return (
          <input
            type="text"
            placeholder={placeholder || 'Your answer'}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
            disabled
          />
        );
      
      case 'long-text':
        return (
          <textarea
            placeholder={placeholder || 'Your answer'}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
            disabled
          />
        );
      
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={id}
                  className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                  disabled
                />
                <span className="text-sm text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkboxes':
        return (
          <div className="space-y-2">
            {options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary border-input focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                  disabled
                />
                <span className="text-sm text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'file-upload':
        return (
          <div className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-input rounded-lg bg-surface">
            <div className="text-center">
              <Icon name="CloudUploadIcon" size={32} className="mx-auto text-text-secondary mb-2" />
              <p className="text-sm text-text-primary font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-text-secondary mt-1">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>
        );
      
      case 'heading':
        return (
          <h2 className="text-2xl font-semibold text-text-primary">{label}</h2>
        );
      
      case 'paragraph':
        return (
          <p className="text-base text-text-secondary leading-relaxed">{placeholder || 'Add your description here...'}</p>
        );
      
      case 'divider':
        return <div className="w-full h-px bg-border" />;
      
      default:
        return null;
    }
  };

  const showLabel = !['heading', 'paragraph', 'divider'].includes(type);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={() => onDragStart(id)}
      onDragEnd={onDragEnd}
    >
      {/* Drag Handle */}
      {isHovered && (
        <div className="absolute -left-8 top-0 flex items-center justify-center w-6 h-6 cursor-grab active:cursor-grabbing">
          <Icon name="MenuIcon" size={16} className="text-text-secondary" />
        </div>
      )}

      <div className="relative p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-smooth">
        {/* Block Controls */}
        {isHovered && (
          <div className="absolute -top-3 right-4 flex items-center gap-1 bg-card border border-border rounded-lg shadow-subtle px-1 py-1">
            <button
              onClick={() => onDuplicate(id)}
              className="flex items-center justify-center w-7 h-7 rounded hover:bg-surface transition-smooth"
              title="Duplicate block"
            >
              <Icon name="DuplicateIcon" size={14} className="text-text-secondary" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex items-center justify-center w-7 h-7 rounded hover:bg-surface transition-smooth"
              title="Delete block"
            >
              <Icon name="TrashIcon" size={14} className="text-error" />
            </button>
          </div>
        )}

        {/* Block Label */}
        {showLabel && (
          <div className="mb-3 flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                onBlur={handleLabelBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLabelBlur();
                  if (e.key === 'Escape') {
                    setEditLabel(label);
                    setIsEditing(false);
                  }
                }}
                className="flex-1 text-sm font-medium text-text-primary bg-transparent border-none focus:outline-none"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 text-left text-sm font-medium text-text-primary hover:text-primary transition-smooth"
              >
                {label}
              </button>
            )}
            {required && (
              <span className="text-error text-sm">*</span>
            )}
          </div>
        )}

        {/* Block Content */}
        {renderBlockContent()}
      </div>
    </div>
  );
};

export default FormBlock;