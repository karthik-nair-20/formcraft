'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MediaPickerDialogProps {
  isOpen: boolean;
  type: 'cover' | 'logo';
  onClose: () => void;
  onSelect: (mediaData: { type: 'upload' | 'link' | 'unsplash' | 'color'; value: string }) => void;
  onRemove: () => void;
}

const MediaPickerDialog = ({ isOpen, type, onClose, onSelect, onRemove }: MediaPickerDialogProps) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'link' | 'unsplash' | 'color'>('upload');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2563EB');

  const coverTabs = ['upload', 'link', 'unsplash', 'color'] as const;
  const logoTabs = ['upload', 'link'] as const;
  const tabs = type === 'cover' ? coverTabs : logoTabs;

  // Placeholder Unsplash images
  const unsplashImages = [
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
    'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400',
    'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400',
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400',
  ];

  // Color swatches
  const colorSwatches = [
    '#2563EB', '#DC2626', '#16A34A', '#D97706', '#9333EA',
    '#0891B2', '#DB2777', '#65A30D', '#CA8A04', '#7C3AED',
    '#0284C7', '#BE123C', '#15803D', '#B45309', '#6B21A8',
  ];

  const handleApplyLink = () => {
    if (linkUrl.trim()) {
      onSelect({ type: 'link', value: linkUrl });
      onClose();
    }
  };

  const handleSelectUnsplash = (imageUrl: string) => {
    onSelect({ type: 'unsplash', value: imageUrl });
    onClose();
  };

  const handleSelectColor = (color: string) => {
    onSelect({ type: 'color', value: color });
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-4">
              {/* Tabs */}
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                      activeTab === tab
                        ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-smooth"
            >
              <Icon name="TrashIcon" size={16} />
              Remove
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-lg hover:border-primary/30 transition-smooth cursor-pointer">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="UploadIcon" size={32} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-text-primary mb-1">
                      Click to choose a file or drag here
                    </p>
                    <p className="text-sm text-text-secondary">
                      {type === 'cover' ?'Recommended dimensions: minimum 1500px wide · Size limit: 10 MB' :'Recommended dimensions: 200×200 pixels · Size limit: 10 MB'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Link Tab */}
            {activeTab === 'link' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                    />
                    <button
                      onClick={handleApplyLink}
                      disabled={!linkUrl.trim()}
                      className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Unsplash Tab (Cover only) */}
            {activeTab === 'unsplash' && type === 'cover' && (
              <div>
                <div className="grid grid-cols-3 gap-3">
                  {unsplashImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectUnsplash(imageUrl)}
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-smooth group"
                    >
                      <img
                        src={imageUrl}
                        alt={`Unsplash ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-smooth" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Tab (Cover only) */}
            {activeTab === 'color' && type === 'cover' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Select a color
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {colorSwatches.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleSelectColor(color)}
                        className={`w-full aspect-square rounded-lg border-2 transition-smooth ${
                          selectedColor === color
                            ? 'border-primary ring-2 ring-primary/20' :'border-transparent hover:border-border'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Custom color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-16 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                    />
                    <button
                      onClick={() => handleSelectColor(selectedColor)}
                      className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPickerDialog;