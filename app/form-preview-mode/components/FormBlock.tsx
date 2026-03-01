'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FormBlockProps {
  block: {
    id: string;
    type: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
    content?: string;
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
    columns?: number;
  };
  onValueChange?: (value: any) => void;
  isDarkMode?: boolean;
}

const FormBlock = ({ block, onValueChange, isDarkMode = false }: FormBlockProps) => {
  const [value, setValue] = useState<any>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (newValue: any) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleCheckboxChange = (option: string) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelected);
    if (onValueChange) {
      onValueChange(newSelected);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (onValueChange) {
        onValueChange(file);
      }
    }
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            {block.content || 'Heading'}
          </h2>
        );

      case 'paragraph':
        return (
          <p className="text-base text-text-secondary leading-relaxed">
            {block.content || 'Paragraph text goes here.'}
          </p>
        );

      case 'short-text':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              {block.label || 'Short Text'}
              {block.required && <span className="text-error ml-1">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={block.placeholder || 'Enter your answer'}
              required={block.required}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40"
            />
          </div>
        );

      case 'long-text':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              {block.label || 'Long Text'}
              {block.required && <span className="text-error ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={block.placeholder || 'Enter your detailed answer'}
              required={block.required}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 resize-none"
            />
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              {block.label || 'Multiple Choice'}
              {block.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(block.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-input hover:bg-surface cursor-pointer transition-smooth"
                >
                  <input
                    type="radio"
                    name={block.id}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                  />
                  <span className="text-sm text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkboxes':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              {block.label || 'Checkboxes'}
              {block.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(block.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-input hover:bg-surface cursor-pointer transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                  />
                  <span className="text-sm text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'file-upload':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              {block.label || 'File Upload'}
              {block.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id={`file-${block.id}`}
              />
              <label
                htmlFor={`file-${block.id}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-8 rounded-lg border-2 border-dashed border-input hover:border-primary hover:bg-surface cursor-pointer transition-smooth"
              >
                <Icon name="CloudUploadIcon" size={24} className="text-text-secondary" />
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">
                    {fileName || 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="rounded-lg overflow-hidden">
            <AppImage
              src={block.imageUrl || 'https://images.unsplash.com/photo-1557683316-973673baf926'}
              alt={block.imageAlt || 'Form image showing modern office workspace with laptop and coffee'}
              className="w-full h-64 object-cover"
            />
          </div>
        );

      case 'video':
        return (
          <div className="rounded-lg overflow-hidden bg-surface">
            <div className="aspect-video flex items-center justify-center">
              <Icon name="PlayIcon" size={48} className="text-primary" variant="solid" />
            </div>
          </div>
        );

      case 'divider':
        return <hr className="border-t border-border my-6" />;

      default:
        return null;
    }
  };

  return <div className="w-full">{renderBlock()}</div>;
};

export default FormBlock;