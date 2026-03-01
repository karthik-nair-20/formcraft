'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import IntegrationCard from './IntegrationCard';
import WebhookCard from './WebhookCard';
import SearchAndFilter from './SearchAndFilter';
import ConnectionModal from './ConnectionModal';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoAlt: string;
  category: string;
  isConnected: boolean;
  isFeatured?: boolean;
  usageCount?: number;
  lastSync?: string;
  hasError?: boolean;
}

const IntegrationsMarketplaceInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    integration: Integration | null;
    mode: 'connect' | 'manage';
  }>({
    isOpen: false,
    integration: null,
    mode: 'connect'
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const integrations: Integration[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Automatically create database entries from form submissions with custom property mapping',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd4e1ff2-1764647362151.png",
    logoAlt: 'Notion logo with black and white design on gradient background',
    category: 'Productivity',
    isConnected: true,
    isFeatured: true,
    usageCount: 12500,
    lastSync: '2m ago',
    hasError: false
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Send form responses directly to spreadsheets with real-time synchronization',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdb1acd7-1764748487531.png",
    logoAlt: 'Google Sheets logo with green spreadsheet icon',
    category: 'Spreadsheets',
    isConnected: true,
    isFeatured: true,
    usageCount: 18200,
    lastSync: '5m ago',
    hasError: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get instant notifications in your channels when forms are submitted',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7a04095-1764648544504.png",
    logoAlt: 'Slack logo with colorful hashtag symbol on white background',
    category: 'Communication',
    isConnected: false,
    isFeatured: true,
    usageCount: 15800
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Create and update records in your bases with flexible field mapping',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12b524e7e-1764647232586.png",
    logoAlt: 'Airtable logo with colorful database icon',
    category: 'Database',
    isConnected: true,
    isFeatured: false,
    usageCount: 8900,
    lastSync: '1h ago',
    hasError: true
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 5000+ apps with automated workflows and multi-step zaps',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18a7c9ad1-1764647229390.png",
    logoAlt: 'Zapier logo with orange lightning bolt icon',
    category: 'Automation',
    isConnected: false,
    isFeatured: true,
    usageCount: 22100
  },
  {
    id: 'make',
    name: 'Make',
    description: 'Build complex automation scenarios with visual workflow builder',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7df3118-1765319820660.png",
    logoAlt: 'Make logo with purple hexagon design',
    category: 'Automation',
    isConnected: false,
    isFeatured: false,
    usageCount: 6700
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Add form respondents to email lists and trigger marketing campaigns',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_140ff6bc9-1764818295096.png",
    logoAlt: 'Mailchimp logo with yellow monkey mascot icon',
    category: 'Marketing',
    isConnected: false,
    isFeatured: false,
    usageCount: 9400
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Create contacts and deals in your CRM from form submissions',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1077411-1764675923255.png",
    logoAlt: 'HubSpot logo with orange sprocket icon',
    category: 'CRM',
    isConnected: false,
    isFeatured: false,
    usageCount: 11200
  }];


  const categories = Array.from(new Set(integrations.map((i) => i.category))).sort();

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' ||
    selectedStatus === 'connected' && integration.isConnected ||
    selectedStatus === 'available' && !integration.isConnected;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleConnect = (id: string) => {
    const integration = integrations.find((i) => i.id === id);
    if (integration) {
      setModalState({
        isOpen: true,
        integration,
        mode: 'connect'
      });
    }
  };

  const handleManage = (id: string) => {
    const integration = integrations.find((i) => i.id === id);
    if (integration) {
      setModalState({
        isOpen: true,
        integration,
        mode: 'manage'
      });
    }
  };

  const handleConfigureWebhook = () => {

    // Webhook configuration logic
  };
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      integration: null,
      mode: 'connect'
    });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-surface rounded w-1/3" />
              <div className="h-12 bg-surface rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) =>
                <div key={i} className="h-64 bg-surface rounded-xl" />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>);

  }

  const connectedCount = integrations.filter((i) => i.isConnected).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-text-primary">
                Integrations Marketplace
              </h1>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {connectedCount} Connected
              </span>
            </div>
            <p className="text-text-secondary">
              Connect your forms with the tools you already use. Automate workflows and sync data seamlessly.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <SearchAndFilter
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onStatusChange={setSelectedStatus}
              categories={categories}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus} />

          </div>

          {/* Results Count */}
          {searchQuery &&
          <div className="mb-6">
              <p className="text-sm text-text-secondary">
                Found {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            </div>
          }

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredIntegrations.map((integration) =>
            <IntegrationCard
              key={integration.id}
              {...integration}
              onConnect={handleConnect}
              onManage={handleManage} />

            )}
            
            {/* Webhook Card */}
            {(selectedCategory === 'all' || selectedCategory === 'Developer Tools') && (
            selectedStatus === 'all' || selectedStatus === 'available') &&
            <WebhookCard onConfigure={handleConfigureWebhook} />
            }
          </div>

          {/* Empty State */}
          {filteredIntegrations.length === 0 &&
          <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface rounded-full mb-4">
                <svg
                className="w-8 h-8 text-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">

                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No integrations found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">

                Clear Filters
              </button>
            </div>
          }
        </div>
      </main>

      {/* Connection Modal */}
      <ConnectionModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        integration={modalState.integration}
        mode={modalState.mode} />

    </div>);

};

export default IntegrationsMarketplaceInteractive;