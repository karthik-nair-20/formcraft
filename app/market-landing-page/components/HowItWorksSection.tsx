'use client';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: 'Add blocks with /',
      description: 'Type "/" to open the command menu and choose from text, email, dropdown, and more.',
    },
    {
      number: 2,
      title: 'Customize & theme',
      description: 'Pick a theme or adjust colors, fonts, and spacing to match your brand.',
    },
    {
      number: 3,
      title: 'Share your form',
      description: 'Get a shareable link or embed code. Connect integrations to route submissions automatically.',
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background doodle */}
      <svg 
        className="absolute top-20 right-10 w-32 h-32 text-primary opacity-10 hidden lg:block" 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8,4" />
      </svg>
      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            From idea to live form in three simple steps
          </p>
        </div>

        <div className="space-y-12">
          {steps?.map((step, index) => (
            <div key={step?.number} className="flex gap-6 items-start">
              {/* Step number */}
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                {step?.number}
              </div>

              {/* Step content */}
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold text-foreground mb-2">{step?.title}</h3>
                <p className="text-muted-foreground">{step?.description}</p>
              </div>

              {/* Doodle arrow between steps */}
              {index < steps?.length - 1 && (
                <div className="hidden md:flex items-center pt-2">
                  <svg 
                    width="80" 
                    height="40" 
                    viewBox="0 0 80 40" 
                    fill="none" 
                    className="text-primary opacity-40"
                  >
                    <path 
                      d="M5 20 Q 25 5, 50 20 T 75 20 L 70 15 M 75 20 L 70 25" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;