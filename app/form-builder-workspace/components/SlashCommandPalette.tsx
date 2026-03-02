'use client';

import { useState, useEffect, useRef } from 'react';
import BlockTypeButton from './BlockTypeButton';

interface BlockType {
  id: string;
  icon: string;
  label: string;
  description: string;
  type: string;
}

interface SlashCommandPaletteProps {
  position: { x: number; y: number };
  onSelect: (type: string) => void;
  onClose: () => void;
}

const SlashCommandPalette = ({ position, onSelect, onClose }: SlashCommandPaletteProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const paletteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const blockTypes: BlockType[] = [
    { id: '1', icon: '📝', label: 'Short Text', description: 'Single line text input', type: 'short-text' },
    { id: '2', icon: '📄', label: 'Long Text', description: 'Multi-line text area', type: 'long-text' },
    { id: '3', icon: '🔘', label: 'Multiple Choice', description: 'Radio button options', type: 'multiple-choice' },
    { id: '4', icon: '☑️', label: 'Checkboxes', description: 'Multiple selections', type: 'checkboxes' },
    { id: '5', icon: '📎', label: 'File Upload', description: 'Upload documents or images', type: 'file-upload' },
    { id: '6', icon: '🔤', label: 'Heading', description: 'Section title', type: 'heading' },
    { id: '7', icon: '📋', label: 'Paragraph', description: 'Descriptive text block', type: 'paragraph' },
    { id: '8', icon: '➖', label: 'Divider', description: 'Visual separator', type: 'divider' },
  ];

  const filteredBlocks = blockTypes.filter(
    (block) =>
      block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredBlocks.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredBlocks.length) % filteredBlocks.length);
      } else if (e.key === 'Enter' && filteredBlocks.length > 0) {
        e.preventDefault();
        onSelect(filteredBlocks[selectedIndex].type);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredBlocks, selectedIndex, onClose, onSelect]);

  return (
    <div
      ref={paletteRef}
      className="fixed z-[150] w-80 bg-card border border-border rounded-lg shadow-lift"
      style={{ top: position.y, left: position.x }}
    >
      <div className="p-3 border-b border-border">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedIndex(0);
          }}
          placeholder="Search blocks..."
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-smooth"
        />
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((block, index) => (
            <div
              key={block.id}
              className={`rounded-lg ${index === selectedIndex ? 'bg-surface' : ''}`}
            >
              <BlockTypeButton
                icon={block.icon}
                label={block.label}
                description={block.description}
                onClick={() => onSelect(block.type)}
              />
            </div>
          ))
        ) : (
          <div className="px-3 py-8 text-center">
            <p className="text-sm text-text-secondary">No blocks found</p>
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-border bg-surface rounded-b-lg">
        <p className="text-xs text-text-secondary">
          ↑↓ to navigate • Enter to select • Esc to close
        </p>
      </div>
    </div>
  );
};

export default SlashCommandPalette;