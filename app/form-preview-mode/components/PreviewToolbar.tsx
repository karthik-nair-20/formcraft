'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PreviewToolbarProps {
  onBackToBuilder: () => void;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onThemeToggle: () => void;
  currentDevice: 'desktop' | 'tablet' | 'mobile';
  isDarkMode: boolean;
}

const PreviewToolbar = ({
  onBackToBuilder,
  onDeviceChange,
  onThemeToggle,
  currentDevice,
  isDarkMode,
}: PreviewToolbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const devices = [
    { id: 'desktop' as const, icon: 'DesktopComputerIcon', label: 'Desktop', width: '1440px' },
    { id: 'tablet' as const, icon: 'DeviceTabletIcon', label: 'Tablet', width: '768px' },
    { id: 'mobile' as const, icon: 'DeviceMobileIcon', label: 'Mobile', width: '375px' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-2xl shadow-lift px-4 py-3 flex items-center gap-3">
        {/* Back to Builder */}
        <button
          onClick={onBackToBuilder}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-surface transition-smooth"
          title="Back to builder"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          <span className="hidden sm:inline">Back to Builder</span>
        </button>

        <div className="w-px h-6 bg-border" />

        {/* Device Toggles */}
        <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device.id)}
              className={`
                flex items-center justify-center w-9 h-9 rounded-lg transition-smooth
                ${
                  currentDevice === device.id
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                }
              `}
              title={`${device.label} (${device.width})`}
            >
              <Icon name={device.icon as any} size={18} variant={currentDevice === device.id ? 'solid' : 'outline'} />
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Icon name={isDarkMode ? 'SunIcon' : 'MoonIcon'} size={18} />
        </button>

        {/* More Options */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
          title="More options"
        >
          <Icon name="DotsVerticalIcon" size={18} />
        </button>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-lift p-2 min-w-[200px]">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-surface transition-smooth">
              <Icon name="ShareIcon" size={18} />
              <span>Share Preview</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-surface transition-smooth">
              <Icon name="CodeIcon" size={18} />
              <span>View Code</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-surface transition-smooth">
              <Icon name="DownloadIcon" size={18} />
              <span>Export Form</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewToolbar;