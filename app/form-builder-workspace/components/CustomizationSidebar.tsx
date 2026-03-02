'use client';


import Icon from '@/components/ui/AppIcon';

interface CustomizationSettings {
  // Theme & Brand
  themePreset: string;
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  accentColor: string;
  
  // Layout
  pageWidth: string;
  baseFontSize: string;
  hasLogo: boolean;
  logoWidth: string;
  logoHeight: string;
  logoCornerRadius: string;
  logoShape: 'square' | 'circle';
  hasCover: boolean;
  coverHeight: 'short' | 'medium' | 'tall';
  coverStyle: 'solid' | 'gradient' | 'image';
  
  // Inputs
  inputWidth: 'auto' | 'full';
  inputHeight: string;
  inputBackgroundColor: string;
  inputPlaceholderColor: string;
  inputBorderColor: string;
  inputBorderWidth: string;
  inputBorderRadius: string;
  inputVerticalMargin: string;
  inputHorizontalPadding: string;
  
  // Buttons
  buttonWidth: 'auto' | 'full';
  buttonHeight: string;
  buttonAlignment: 'left' | 'center' | 'right';
  buttonFontSize: string;
  buttonCornerRadius: string;
  buttonHasIcon: boolean;
}

interface CustomizationSidebarProps {
  settings: CustomizationSettings;
  onSettingsChange: (settings: CustomizationSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CustomizationSidebar = ({ settings, onSettingsChange, isOpen, onToggle }: CustomizationSidebarProps) => {
  const themePresets = ['Custom', 'Minimal', 'Playful', 'Professional', 'Bold'];
  const fontFamilies = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat'];

  const updateSetting = (key: keyof CustomizationSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-[110] flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lift hover:opacity-90 transition-smooth"
        aria-label="Toggle customization sidebar"
      >
        <Icon name={isOpen ? 'XIcon' : 'AdjustmentsIcon'} size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 right-0 h-full w-80 bg-surface border-l border-border z-[105]
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Customize</h2>
            <button
              onClick={onToggle}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-smooth"
            >
              <Icon name="XIcon" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Theme & Brand Section */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Theme & Brand</h3>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  Advanced / Pro
                </span>
              </div>

              {/* Theme Preset */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Theme Preset
                </label>
                <div className="relative">
                  <select
                    value={settings.themePreset}
                    onChange={(e) => updateSetting('themePreset', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-text-primary appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {themePresets.map((preset) => (
                      <option key={preset} value={preset}>
                        {preset}
                      </option>
                    ))}
                  </select>
                  <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </div>

              {/* Font Family */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Font
                </label>
                <div className="relative">
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSetting('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-text-primary appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                  <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </div>

              {/* Colors Row */}
              <div className="space-y-3">
                {/* Background Color */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                      className="w-10 h-10 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.textColor}
                      onChange={(e) => updateSetting('textColor', e.target.value)}
                      className="w-10 h-10 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.textColor}
                      onChange={(e) => updateSetting('textColor', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Button Background Color */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Button Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.buttonBackgroundColor}
                      onChange={(e) => updateSetting('buttonBackgroundColor', e.target.value)}
                      className="w-10 h-10 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.buttonBackgroundColor}
                      onChange={(e) => updateSetting('buttonBackgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="#2563EB"
                    />
                  </div>
                </div>

                {/* Button Text Color */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Button Text
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.buttonTextColor}
                      onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                      className="w-10 h-10 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.buttonTextColor}
                      onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => updateSetting('accentColor', e.target.value)}
                      className="w-10 h-10 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) => updateSetting('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="#2563EB"
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-1">For links, focus and primary actions</p>
                </div>
              </div>
            </div>

            {/* Layout Section */}
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Layout</h3>

              {/* Page Width */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Page Width
                </label>
                <input
                  type="text"
                  value={settings.pageWidth}
                  onChange={(e) => updateSetting('pageWidth', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="700px"
                />
              </div>

              {/* Base Font Size */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Base Font Size
                </label>
                <input
                  type="text"
                  value={settings.baseFontSize}
                  onChange={(e) => updateSetting('baseFontSize', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="16px"
                />
              </div>

              {/* Logo Controls */}
              {settings.hasLogo && (
                <div className="mb-4 p-3 bg-background rounded-lg border border-border">
                  <h4 className="text-xs font-medium text-text-primary mb-3">Logo</h4>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-text-secondary mb-1">Width</label>
                        <input
                          type="text"
                          value={settings.logoWidth}
                          onChange={(e) => updateSetting('logoWidth', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                          placeholder="48px"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-secondary mb-1">Height</label>
                        <input
                          type="text"
                          value={settings.logoHeight}
                          onChange={(e) => updateSetting('logoHeight', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                          placeholder="48px"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Corner Radius</label>
                      <input
                        type="text"
                        value={settings.logoCornerRadius}
                        onChange={(e) => updateSetting('logoCornerRadius', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="8px"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cover Controls */}
              {settings.hasCover && (
                <div className="p-3 bg-background rounded-lg border border-border">
                  <h4 className="text-xs font-medium text-text-primary mb-3">Cover</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-2">Height</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['short', 'medium', 'tall'] as const).map((height) => (
                          <button
                            key={height}
                            onClick={() => updateSetting('coverHeight', height)}
                            className={`
                              px-2 py-1.5 rounded text-xs font-medium transition-smooth capitalize
                              ${settings.coverHeight === height 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-surface text-text-secondary hover:bg-background border border-border'}
                            `}
                          >
                            {height}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inputs Section */}
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Inputs</h3>

              {/* Input Width & Height */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Width</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateSetting('inputWidth', 'auto')}
                      className={`
                        flex-1 px-2 py-1.5 rounded text-xs font-medium transition-smooth
                        ${settings.inputWidth === 'auto' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-surface border border-border'}
                      `}
                    >
                      Auto
                    </button>
                    <button
                      onClick={() => updateSetting('inputWidth', 'full')}
                      className={`
                        flex-1 px-2 py-1.5 rounded text-xs font-medium transition-smooth
                        ${settings.inputWidth === 'full' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-surface border border-border'}
                      `}
                    >
                      Full
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Height</label>
                  <input
                    type="text"
                    value={settings.inputHeight}
                    onChange={(e) => updateSetting('inputHeight', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="40px"
                  />
                </div>
              </div>

              {/* Input Colors */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.inputBackgroundColor}
                      onChange={(e) => updateSetting('inputBackgroundColor', e.target.value)}
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.inputBackgroundColor}
                      onChange={(e) => updateSetting('inputBackgroundColor', e.target.value)}
                      className="flex-1 px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Placeholder Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.inputPlaceholderColor}
                      onChange={(e) => updateSetting('inputPlaceholderColor', e.target.value)}
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.inputPlaceholderColor}
                      onChange={(e) => updateSetting('inputPlaceholderColor', e.target.value)}
                      className="flex-1 px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="#9CA3AF"
                    />
                  </div>
                </div>
              </div>

              {/* Border Controls */}
              <div className="p-3 bg-background rounded-lg border border-border mb-4">
                <h4 className="text-xs font-medium text-text-primary mb-3">Border</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-2">Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.inputBorderColor}
                        onChange={(e) => updateSetting('inputBorderColor', e.target.value)}
                        className="w-8 h-8 rounded border border-border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.inputBorderColor}
                        onChange={(e) => updateSetting('inputBorderColor', e.target.value)}
                        className="flex-1 px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="#E5E7EB"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Width</label>
                      <input
                        type="text"
                        value={settings.inputBorderWidth}
                        onChange={(e) => updateSetting('inputBorderWidth', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="1px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Radius</label>
                      <input
                        type="text"
                        value={settings.inputBorderRadius}
                        onChange={(e) => updateSetting('inputBorderRadius', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="8px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing Controls */}
              <div className="p-3 bg-background rounded-lg border border-border">
                <h4 className="text-xs font-medium text-text-primary mb-3">Spacing</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Vertical Margin</label>
                    <input
                      type="text"
                      value={settings.inputVerticalMargin}
                      onChange={(e) => updateSetting('inputVerticalMargin', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="16px"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Horizontal Padding</label>
                    <input
                      type="text"
                      value={settings.inputHorizontalPadding}
                      onChange={(e) => updateSetting('inputHorizontalPadding', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="12px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Buttons</h3>

              {/* Button Width & Height */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Width</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateSetting('buttonWidth', 'auto')}
                      className={`
                        flex-1 px-2 py-1.5 rounded text-xs font-medium transition-smooth
                        ${settings.buttonWidth === 'auto' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-surface border border-border'}
                      `}
                    >
                      Auto
                    </button>
                    <button
                      onClick={() => updateSetting('buttonWidth', 'full')}
                      className={`
                        flex-1 px-2 py-1.5 rounded text-xs font-medium transition-smooth
                        ${settings.buttonWidth === 'full' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-surface border border-border'}
                      `}
                    >
                      Full
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Height</label>
                  <input
                    type="text"
                    value={settings.buttonHeight}
                    onChange={(e) => updateSetting('buttonHeight', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="44px"
                  />
                </div>
              </div>

              {/* Button Alignment */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-text-secondary mb-2">Alignment</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => updateSetting('buttonAlignment', align)}
                      className={`
                        px-2 py-1.5 rounded text-xs font-medium transition-smooth capitalize
                        ${settings.buttonAlignment === align 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background text-text-secondary hover:bg-surface border border-border'}
                      `}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Font Size & Corner Radius */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Font Size</label>
                  <input
                    type="text"
                    value={settings.buttonFontSize}
                    onChange={(e) => updateSetting('buttonFontSize', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="14px"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">Corner Radius</label>
                  <input
                    type="text"
                    value={settings.buttonCornerRadius}
                    onChange={(e) => updateSetting('buttonCornerRadius', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="8px"
                  />
                </div>
              </div>

              {/* Button Icon Toggle */}
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Icon name="SparklesIcon" size={16} className="text-text-secondary" />
                  <span className="text-xs font-medium text-text-primary">Include Icon</span>
                </div>
                <button
                  onClick={() => updateSetting('buttonHasIcon', !settings.buttonHasIcon)}
                  className={`
                    relative w-11 h-6 rounded-full transition-smooth
                    ${settings.buttonHasIcon ? 'bg-primary' : 'bg-border'}
                  `}
                >
                  <div
                    className={`
                      absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform
                      ${settings.buttonHasIcon ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default CustomizationSidebar;