import type { Metadata } from 'next';
import IntegrationsMarketplaceInteractive from './components/IntegrationsMarketplaceInteractive';

export const metadata: Metadata = {
  title: 'Integrations Marketplace - FormCraft',
  description: 'Connect your forms with external productivity tools including Notion, Google Sheets, Slack, Airtable, Zapier, and more. Manage integrations and configure webhooks.',
};

export default function IntegrationsMarketplacePage() {
  return <IntegrationsMarketplaceInteractive />;
}