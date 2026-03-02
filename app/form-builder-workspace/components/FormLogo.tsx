'use client';

import Icon from '@/components/ui/AppIcon';

interface FormLogoProps {
  logoSize: 'small' | 'medium' | 'large';
  logoShape: 'square' | 'circle';
  accentColor: string;
  onRemove: () => void;
  onOpenMediaPicker: () => void;
}

const FormLogo = ({ logoSize, logoShape, accentColor, onRemove, onOpenMediaPicker }: FormLogoProps) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };

  const shapeClass = logoShape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div className="relative mb-6 group inline-block">
      <div
        onClick={onOpenMediaPicker}
        className={`${sizeClasses[logoSize]} ${shapeClass} flex items-center justify-center text-white transition-smooth cursor-pointer hover:opacity-90`}
        style={{ backgroundColor: accentColor }}
      >
        <Icon name="ImageIcon" size={logoSize === 'small' ? 20 : logoSize === 'medium' ? 24 : 32} />
      </div>
      
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 flex items-center justify-center w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-text-primary transition-smooth border border-border"
        title="Remove logo"
      >
        <Icon name="XIcon" size={12} />
      </button>
    </div>
  );
};

export default FormLogo;