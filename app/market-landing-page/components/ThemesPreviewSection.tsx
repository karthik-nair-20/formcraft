'use client';

import { useState } from 'react';

interface Theme {
  id: string;
  label: string;
  accent: string;
  bg: string;
  text: string;
}

const ThemesPreviewSection = () => {
  const [activeTheme, setActiveTheme] = useState<string>('clean');

  const themes: Theme[] = [
    { 
      id: 'clean', 
      label: 'Clean', 
      accent: '#2563EB', 
      bg: '#FFFFFF', 
      text: '#1E293B' 
    },
    { 
      id: 'playful', 
      label: 'Playful', 
      accent: '#F59E0B', 
      bg: '#FFFBEB', 
      text: '#78350F' 
    },
    { 
      id: 'dark', 
      label: 'Dark', 
      accent: '#10B981', 
      bg: '#1F2937', 
      text: '#F9FAFB' 
    },
    { 
      id: 'bold', 
      label: 'Bold', 
      accent: '#EF4444', 
      bg: '#FEF2F2', 
      text: '#7F1D1D' 
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Themes & customization
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from beautiful pre-made themes or create your own
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`relative group cursor-pointer transition-all ${
                activeTheme === theme.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              {/* Theme preview card */}
              <div 
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: theme.bg }}
              >
                <div className="p-6 space-y-3">
                  {/* Mock form elements */}
                  <div 
                    className="h-2 w-3/4 rounded"
                    style={{ backgroundColor: theme.accent, opacity: 0.3 }}
                  />
                  <div 
                    className="h-8 w-full rounded border"
                    style={{ 
                      borderColor: theme.accent, 
                      backgroundColor: `${theme.bg}` 
                    }}
                  />
                  <div 
                    className="h-2 w-1/2 rounded"
                    style={{ backgroundColor: theme.text, opacity: 0.2 }}
                  />
                  <div 
                    className="h-8 w-full rounded border"
                    style={{ 
                      borderColor: theme.accent, 
                      backgroundColor: `${theme.bg}` 
                    }}
                  />
                  <div 
                    className="h-10 w-full rounded mt-4"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
              </div>
              {/* Theme label */}
              <div className="mt-3 text-center">
                <span className="text-sm font-medium text-foreground">{theme.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesPreviewSection;