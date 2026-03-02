'use client';

import Icon from '@/components/ui/AppIcon';

interface FormCoverProps {
  coverStyle: 'solid' | 'gradient' | 'image';
  coverHeight: 'short' | 'medium' | 'tall';
  accentColor: string;
  onRemove: () => void;
  onOpenMediaPicker: () => void;
}

const FormCover = ({ coverStyle, coverHeight, accentColor, onRemove, onOpenMediaPicker }: FormCoverProps) => {
  const heightClasses = {
    short: 'h-32',
    medium: 'h-48',
    tall: 'h-64',
  };

  const getCoverBackground = () => {
    switch (coverStyle) {
      case 'solid':
        return { backgroundColor: `${accentColor}15` };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}05 100%)`,
        };
      case 'image':
        return {
          background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}10 50%, ${accentColor}20 100%)`,
        };
      default:
        return { backgroundColor: `${accentColor}15` };
    }
  };

  return (
    <div className="relative -mx-6 mb-8 group">
      <div
        onClick={onOpenMediaPicker}
        className={`${heightClasses[coverHeight]} w-full rounded-lg transition-smooth cursor-pointer hover:opacity-90`}
        style={getCoverBackground()}
      />
      
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8 bg-background/80 backdrop-blur-sm rounded-lg text-text-secondary hover:text-text-primary transition-smooth"
        title="Remove cover"
      >
        <Icon name="XIcon" size={16} />
      </button>
    </div>
  );
};

export default FormCover;