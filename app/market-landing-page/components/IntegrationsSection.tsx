'use client';

// import AppImage from '@/components/ui/AppImage';

const IntegrationsSection = () => {
  const integrations = [
  { name: 'Notion', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd4e1ff2-1764647362151.png", alt: 'Notion logo in black and white with red accent' },
  { name: 'Google Sheets', logo: "https://images.unsplash.com/photo-1663124178632-488f399d5763", alt: 'Google Sheets logo in green' },
  { name: 'Slack', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce0c9d1f-1764648808896.png", alt: 'Slack logo with colorful hash symbol' },
  { name: 'Airtable', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12b524e7e-1764647232586.png", alt: 'Airtable orange and yellow logo' },
  { name: 'Zapier', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18a7c9ad1-1764647229390.png", alt: 'Zapier orange lightning bolt logo' },
  { name: 'Make', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_135a673ce-1765363652518.png", alt: 'Make (Integromat) purple logo' },
  { name: 'Webhooks', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4344dad-1765304966737.png", alt: 'Webhook icon showing connected nodes' }];


  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-lg text-muted-foreground">
            Connect your forms to the tools you already use
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {integrations?.map((integration) =>
          <div
            key={integration?.name}
            className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">

              {/* <AppImage
              src={integration?.logo}
              alt={integration?.alt}
              className="w-12 h-12 object-contain" /> */}

              <span className="text-xs text-muted-foreground font-medium">
                {integration?.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default IntegrationsSection;