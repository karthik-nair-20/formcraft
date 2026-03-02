'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BuilderToolbar from '@/components/common/BuilderToolbar';
import FormBlock from './FormBlock';
import SlashCommandPalette from './SlashCommandPalette';
import CustomizationSidebar from './CustomizationSidebar';
import EmptyCanvasState from './EmptyCanvasState';
import PageControl from './PageControl';
import BrandingControls from './BrandingControls';
import FormCover from './FormCover';
import FormLogo from './FormLogo';
import MediaPickerDialog from './MediaPickerDialog';

interface Block {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface PageBrandingSettings {
  hasLogo: boolean;
  logoUrl?: string;
  logoSize: 'small' | 'medium' | 'large';
  logoShape: 'square' | 'circle';
  hasCover: boolean;
  coverUrl?: string;
  coverHeight: 'short' | 'medium' | 'tall';
  coverStyle: 'solid' | 'gradient' | 'image';
  coverColor?: string;
}

interface CustomizationSettings {
  // Theme & Brand - GLOBAL SETTINGS
  themePreset: 'Custom' | 'Minimal' | 'Modern' | 'Dark' | 'Elegant';
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  accentColor: string;
  
  // Layout - GLOBAL SETTINGS
  pageWidth: string;
  baseFontSize: string;
  logoWidth: string;
  logoHeight: string;
  logoCornerRadius: string;
  
  // Inputs - GLOBAL SETTINGS
  inputWidth: 'full' | 'half' | 'third' | 'quarter';
  inputHeight: string;
  inputBackgroundColor: string;
  inputPlaceholderColor: string;
  inputBorderColor: string;
  inputBorderWidth: string;
  inputBorderRadius: string;
  inputVerticalMargin: string;
  inputHorizontalPadding: string;
  
  // Buttons - GLOBAL SETTINGS
  buttonWidth: 'full' | 'half' | 'third' | 'quarter';
  buttonHeight: string;
  buttonAlignment: 'left' | 'center' | 'right';
  buttonFontSize: string;
  buttonCornerRadius: string;
  buttonHasIcon: boolean;
}

interface Page {
  id: string;
  label: string;
  blocks: Block[];
  branding: PageBrandingSettings;
}

const FormBuilderInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [pages, setPages] = useState<Page[]>([
    { 
      id: 'page-1', 
      label: 'Page 1', 
      blocks: [],
      branding: {
        hasLogo: false,
        logoSize: 'medium',
        logoShape: 'square',
        hasCover: false,
        coverHeight: 'medium',
        coverStyle: 'solid',
      }
    }
  ]);
  const [currentPageId, setCurrentPageId] = useState('page-1');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentPageBranding, setCurrentPageBranding] = useState<PageBrandingSettings>({
    hasLogo: false,
    logoSize: 'medium',
    logoShape: 'square',
    hasCover: false,
    coverHeight: 'medium',
    coverStyle: 'solid',
  });
  const [history, setHistory] = useState<Block[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showSlashCommand, setShowSlashCommand] = useState(false);
  const [slashCommandPosition, setSlashCommandPosition] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add media picker state
  const [mediaPickerState, setMediaPickerState] = useState<{
    isOpen: boolean;
    type: 'cover' | 'logo' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [customizationSettings, setCustomizationSettings] = useState({
    // Theme & Brand - GLOBAL
    themePreset: 'Custom',
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    buttonBackgroundColor: '#2563EB',
    buttonTextColor: '#FFFFFF',
    accentColor: '#2563EB',
    
    // Layout - GLOBAL
    pageWidth: '700px',
    baseFontSize: '16px',
    logoWidth: '48px',
    logoHeight: '48px',
    logoCornerRadius: '8px',
    
    // Inputs - GLOBAL
    inputWidth: 'full' as const,
    inputHeight: '40px',
    inputBackgroundColor: '#FFFFFF',
    inputPlaceholderColor: '#9CA3AF',
    inputBorderColor: '#E5E7EB',
    inputBorderWidth: '1px',
    inputBorderRadius: '8px',
    inputVerticalMargin: '16px',
    inputHorizontalPadding: '12px',
    
    // Buttons - GLOBAL
    buttonWidth: 'full' as const,
    buttonHeight: '44px',
    buttonAlignment: 'center' as const,
    buttonFontSize: '14px',
    buttonCornerRadius: '8px',
    buttonHasIcon: false,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !showSlashCommand) {
        e.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          setSlashCommandPosition({
            x: rect.left + 50,
            y: rect.top + 100,
          });
          setShowSlashCommand(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHydrated, showSlashCommand]);

  const addToHistory = (newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleAddBlock = (type: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      label: getDefaultLabel(type),
      placeholder: getDefaultPlaceholder(type),
      required: false,
      options: type === 'multiple-choice' || type === 'checkboxes' 
        ? ['Option 1', 'Option 2', 'Option 3'] 
        : undefined,
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    setShowSlashCommand(false);
  };

  const getDefaultLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'short-text': 'Short Answer',
      'long-text': 'Long Answer',
      'multiple-choice': 'Multiple Choice Question',
      'checkboxes': 'Checkbox Question',
      'file-upload': 'File Upload',
      'heading': 'Section Heading',
      'paragraph': 'Description',
      'divider': '',
    };
    return labels[type] || 'Untitled';
  };

  const getDefaultPlaceholder = (type: string): string => {
    const placeholders: Record<string, string> = {
      'short-text': 'Your answer',
      'long-text': 'Your detailed answer',
      'paragraph': 'Add your description here...',
    };
    return placeholders[type] || '';
  };

  const handleDuplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find((b) => b.id === id);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
      };
      const blockIndex = blocks.findIndex((b) => b.id === id);
      const newBlocks = [
        ...blocks.slice(0, blockIndex + 1),
        newBlock,
        ...blocks.slice(blockIndex + 1),
      ];
      setBlocks(newBlocks);
      addToHistory(newBlocks);
    }
  };

  const handleDeleteBlock = (id: string) => {
    const newBlocks = blocks.filter((b) => b.id !== id);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const handleUpdateBlock = (id: string, data: any) => {
    const newBlocks = blocks.map((b) => (b.id === id ? { ...b, ...data } : b));
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handlePreview = () => {
    router.push('/form-preview-mode');
  };

  const handleDragStart = (id: string) => {
    setDraggedBlockId(id);
  };

  const handleDragEnd = () => {
    setDraggedBlockId(null);
  };

  const getCanvasMaxWidth = () => {
    const widths: Record<string, string> = {
      narrow: 'max-w-2xl',
      medium: 'max-w-4xl',
      wide: 'max-w-6xl',
    };
    return widths[customizationSettings.layoutWidth] || 'max-w-4xl';
  };

  const handleAddPage = () => {
    const newPageNumber = pages.length + 1;
    const newPage: Page = {
      id: `page-${newPageNumber}`,
      label: `Page ${newPageNumber}`,
      blocks: [],
      branding: {
        hasLogo: false,
        logoSize: 'medium',
        logoShape: 'square',
        hasCover: false,
        coverHeight: 'medium',
        coverStyle: 'solid',
      }
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
    setBlocks([]);
    setCurrentPageBranding(newPage.branding);
    addToHistory([]);
  };

  const handlePageChange = (pageId: string) => {
    // Save current page blocks AND branding
    const updatedPages = pages.map(page =>
      page.id === currentPageId 
        ? { ...page, blocks, branding: currentPageBranding } 
        : page
    );
    setPages(updatedPages);

    // Switch to new page with its branding
    setCurrentPageId(pageId);
    const newPage = updatedPages.find(p => p.id === pageId);
    setBlocks(newPage?.blocks || []);
    setCurrentPageBranding(newPage?.branding || {
      hasLogo: false,
      logoSize: 'medium',
      logoShape: 'square',
      hasCover: false,
      coverHeight: 'medium',
      coverStyle: 'solid',
    });
    addToHistory(newPage?.blocks || []);
  };

  const handleAddLogo = () => {
    setCurrentPageBranding({ ...currentPageBranding, hasLogo: true });
  };

  const handleRemoveLogo = () => {
    setCurrentPageBranding({ ...currentPageBranding, hasLogo: false, logoUrl: undefined });
  };

  const handleAddCover = () => {
    setCurrentPageBranding({ ...currentPageBranding, hasCover: true });
  };

  const handleRemoveCover = () => {
    setCurrentPageBranding({ 
      ...currentPageBranding, 
      hasCover: false, 
      coverUrl: undefined,
      coverColor: undefined 
    });
  };

  const handleOpenCoverMediaPicker = () => {
    setMediaPickerState({ isOpen: true, type: 'cover' });
  };

  const handleOpenLogoMediaPicker = () => {
    setMediaPickerState({ isOpen: true, type: 'logo' });
  };

  const handleMediaPickerClose = () => {
    setMediaPickerState({ isOpen: false, type: null });
  };

  const handleMediaSelect = (mediaData: { type: 'upload' | 'link' | 'unsplash' | 'color'; value: string }) => {
    if (mediaPickerState.type === 'cover') {
      // Handle cover media selection for current page
      if (mediaData.type === 'color') {
        setCurrentPageBranding({
          ...currentPageBranding,
          coverStyle: 'solid',
          coverColor: mediaData.value,
          coverUrl: undefined,
        });
      } else {
        setCurrentPageBranding({
          ...currentPageBranding,
          coverStyle: 'image',
          coverUrl: mediaData.value,
          coverColor: undefined,
        });
      }
    } else if (mediaPickerState.type === 'logo') {
      // Handle logo media selection for current page
      setCurrentPageBranding({
        ...currentPageBranding,
        logoUrl: mediaData.value,
      });
    }
  };

  const handleMediaRemove = () => {
    if (mediaPickerState.type === 'cover') {
      handleRemoveCover();
    } else if (mediaPickerState.type === 'logo') {
      handleRemoveLogo();
    }
  };

  const handleOpenCustomize = () => {
    setIsSidebarOpen(true);
  };

  if (!isHydrated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading builder...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <BuilderToolbar
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onPreview={handlePreview}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Canvas with internal scrolling */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className={`mx-auto px-8 py-10 min-h-full ${getCanvasMaxWidth()}`} ref={canvasRef}>
            <PageControl
              pages={pages}
              currentPageId={currentPageId}
              onPageChange={handlePageChange}
              onAddPage={handleAddPage}
            />
            
            <BrandingControls
              hasLogo={currentPageBranding.hasLogo}
              hasCover={currentPageBranding.hasCover}
              onAddLogo={handleAddLogo}
              onAddCover={handleAddCover}
              onRemoveLogo={handleRemoveLogo}
              onRemoveCover={handleRemoveCover}
            />

            {currentPageBranding.hasCover && (
              <FormCover
                coverStyle={currentPageBranding.coverStyle}
                coverHeight={currentPageBranding.coverHeight}
                accentColor={currentPageBranding.coverColor || customizationSettings.accentColor}
                onRemove={handleRemoveCover}
                onOpenMediaPicker={handleOpenCoverMediaPicker}
              />
            )}

            {currentPageBranding.hasLogo && (
              <FormLogo
                logoSize={currentPageBranding.logoSize}
                logoShape={currentPageBranding.logoShape}
                accentColor={customizationSettings.accentColor}
                onRemove={handleRemoveLogo}
                onOpenMediaPicker={handleOpenLogoMediaPicker}
              />
            )}
            
            {blocks.length === 0 ? (
              <EmptyCanvasState onAddBlock={() => handleAddBlock('short-text')} />
            ) : (
              <div className="space-y-5">
                {blocks.map((block) => (
                  <FormBlock
                    key={block.id}
                    id={block.id}
                    type={block.type}
                    label={block.label}
                    placeholder={block.placeholder}
                    required={block.required}
                    options={block.options}
                    onDuplicate={handleDuplicateBlock}
                    onDelete={handleDeleteBlock}
                    onUpdate={handleUpdateBlock}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}

                {/* Add Block Button */}
                <button
                  onClick={() => {
                    const rect = canvasRef.current?.getBoundingClientRect();
                    if (rect) {
                      setSlashCommandPosition({
                        x: rect.left + 50,
                        y: window.scrollY + rect.top + rect.height - 100,
                      });
                      setShowSlashCommand(true);
                    }
                  }}
                  className="w-full px-4 py-4 border-2 border-dashed border-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-primary/30 hover:bg-surface/30 transition-smooth"
                >
                  Click to add block or press <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono ml-1">/ </kbd>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Customization Sidebar */}
        <CustomizationSidebar
          settings={customizationSettings}
          onSettingsChange={setCustomizationSettings}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Slash Command Palette */}
      {showSlashCommand && (
        <SlashCommandPalette
          position={slashCommandPosition}
          onSelect={handleAddBlock}
          onClose={() => setShowSlashCommand(false)}
        />
      )}

      {/* Media Picker Dialog */}
      <MediaPickerDialog
        isOpen={mediaPickerState.isOpen}
        type={mediaPickerState.type || 'cover'}
        onClose={handleMediaPickerClose}
        onSelect={handleMediaSelect}
        onRemove={handleMediaRemove}
      />
    </div>
  );
};

export default FormBuilderInteractive;