'use client';

const SocialProofSection = () => {
  const testimonials = [
    {
      quote: "This form builder changed how we collect customer feedback. Simple, fast, and beautiful.",
      author: "Sarah M.",
    },
    {
      quote: "Finally, a form tool that doesn't feel like it's from 2010. The Notion-style editor is brilliant.",
      author: "Alex K.",
    },
    {
      quote: "We switched from Typeform and never looked back. Better features, cleaner design, easier to use.",
      author: "Jamie R.",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative doodle star */}
      <svg 
        className="absolute top-10 right-20 w-8 h-8 text-accent opacity-30 hidden lg:block" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 20.5 L12 16 L6.5 20.5 L8.5 13.5 L3 9 L10 9 Z" />
      </svg>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by teams everywhere
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-sm transition-shadow"
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                {testimonial?.quote}
              </p>
              <p className="text-sm font-medium text-foreground">
                {testimonial?.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;