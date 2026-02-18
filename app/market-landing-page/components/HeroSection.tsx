'use client';

// import Icon from '@/components/ui/AppIcon';


interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Subtle hand-drawn arrow doodle */}
      <svg 
        className="absolute top-32 right-12 w-32 h-24 text-primary opacity-25 hidden lg:block pointer-events-none" 
        viewBox="0 0 120 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M10 60 Q 40 20, 80 50 L 75 45 M 80 50 L 75 55" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Build forms that feel like magic ✨
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              The intuitive form builder that combines Notion-style editing with powerful customization. No code required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Start building
              </button>
              
              <button 
                className="px-8 py-4 text-foreground rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
              >
                View templates
              </button>
            </div>
          </div>

          {/* Right Column: Product Visual */}
          <div className="relative">
            {/* Main product mockup */}
            <div className="relative bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              {/* Mock browser chrome */}
              <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground font-medium">
                  FormCraft Builder
                </div>
              </div>

              {/* Builder workspace visual */}
              <div className="bg-background p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      {/* <Icon name="DocumentTextIcon" size={18} className="text-primary" /> */}
                    </div>
                    <span className="font-semibold text-foreground">Contact Form</span>
                  </div>
                  <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Publish
                  </button>
                </div>

                {/* Canvas with blocks */}
                <div className="space-y-3 min-h-[240px]">
                  {/* Block 1 - Text input */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-sm">
                      📝
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-24 bg-muted-foreground/20 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Block 2 - Email input */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-6 h-6 bg-success/10 rounded flex items-center justify-center text-sm">
                      ✉️
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-32 bg-muted-foreground/20 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Block 3 - Dropdown */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center text-sm">
                      📋
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-28 bg-muted-foreground/20 rounded animate-pulse" />
                    </div>
                  </div>

                  {/* Type "/" command hint */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <span className="px-2 py-1 bg-muted border border-border rounded font-mono text-xs">
                      /
                    </span>
                    <span>Type / to add a block</span>
                  </div>
                </div>

                {/* Sidebar indicator */}
                <div className="absolute right-0 top-20 bottom-20 w-1 bg-border" />
              </div>
            </div>

            {/* Decorative doodle squiggle */}
            <svg 
              className="absolute -bottom-6 -left-6 w-20 h-20 text-primary opacity-20" 
              viewBox="0 0 80 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="40" 
                cy="40" 
                r="35" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;