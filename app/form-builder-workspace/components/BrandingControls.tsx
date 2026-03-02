'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BrandingControlsProps {
  hasLogo: boolean;
  hasCover: boolean;
  onAddLogo: () => void;
  onAddCover: () => void;
  onRemoveLogo: () => void;
  onRemoveCover: () => void;
}

const BrandingControls = ({ 
  hasLogo, 
  hasCover, 
  onAddLogo, 
  onAddCover,
  onRemoveLogo,
  onRemoveCover
}: BrandingControlsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show buttons when the region is in viewport
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly delay visibility for better UX
      }
    );

    if (controlsRef.current) {
      observer.observe(controlsRef.current);
    }

    return () => {
      if (controlsRef.current) {
        observer.unobserve(controlsRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={controlsRef}
      className="flex items-center gap-4 mb-10 min-h-[48px]"
    >
      {/* Logo Controls */}
      <div className="flex items-center gap-2">
        {!hasLogo ? (
          <button
            onClick={onAddLogo}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-surface/50 transition-all duration-300 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Icon name="PhotographIcon" size={18} className="group-hover:scale-110 transition-transform" />
            <span>Add logo</span>
          </button>
        ) : (
          <button
            onClick={onRemoveLogo}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-red-500 rounded-md hover:bg-red-50 transition-all duration-300 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Icon name="TrashIcon" size={18} className="group-hover:scale-110 transition-transform" />
            <span>Remove logo</span>
          </button>
        )}
      </div>
      
      {/* Cover Controls */}
      <div className="flex items-center gap-2">
        {!hasCover ? (
          <button
            onClick={onAddCover}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-surface/50 transition-all duration-300 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Icon name="ColorSwatchIcon" size={18} className="group-hover:scale-110 transition-transform" />
            <span>Add cover</span>
          </button>
        ) : (
          <button
            onClick={onRemoveCover}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-red-500 rounded-md hover:bg-red-50 transition-all duration-300 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Icon name="TrashIcon" size={18} className="group-hover:scale-110 transition-transform" />
            <span>Remove cover</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BrandingControls;