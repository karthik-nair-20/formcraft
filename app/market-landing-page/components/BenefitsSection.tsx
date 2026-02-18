'use client';

const BenefitsSection = () => {
  const benefits = [
    {
      emoji: '⚡',
      title: 'Lightning Fast',
      description: 'Build complex forms in minutes with our intuitive block-based interface.',
    },
    {
      emoji: '🎨',
      title: 'Fully Customizable',
      description: 'Match your brand perfectly with themes, colors, and custom styling.',
    },
    {
      emoji: '🔗',
      title: 'Powerful Integrations',
      description: 'Connect seamlessly with Notion, Google Sheets, Slack, and more.',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="text-center space-y-3"
            >
              <div className="text-4xl mb-2">{benefit?.emoji}</div>
              <h3 className="text-lg font-semibold text-foreground">{benefit?.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;