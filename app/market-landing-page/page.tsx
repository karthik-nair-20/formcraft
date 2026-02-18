import type { Metadata } from 'next';
import MarketingLandingInteractive from './components/MarketingLandingInteractive';

export const metadata: Metadata = {
  title: 'FormCraft - Create Beautiful Forms Effortlessly',
  description: 'The intuitive form builder that combines Notion-style editing with powerful customization. Build professional forms in minutes without coding.',
};

export default function MarketingLandingPage() {
  return <MarketingLandingInteractive />;
}