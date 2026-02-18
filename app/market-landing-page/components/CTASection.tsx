'use client';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Hand-drawn arrow pointing to button */}
      <svg 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-24 h-16 text-primary opacity-25 hidden lg:block" 
        viewBox="0 0 100 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M10 30 Q 35 10, 65 30 L 60 25 M 65 30 L 60 35" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>

      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Start building forms in minutes
        </h2>
        
        <button
          onClick={onGetStarted}
          className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          Get started free
        </button>
      </div>
    </section>
  );
};

export default CTASection;