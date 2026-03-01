'use client';


import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface IntegrationCardProps {
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
  onConnect: (id: string) => void;
  onManage: (id: string) => void;
}

const IntegrationCard = ({
  id,
  name,
  description,
  logo,
  logoAlt,
  category,
  isConnected,
  isFeatured,
  usageCount,
  lastSync,
  hasError,
  onConnect,
  onManage,
}: IntegrationCardProps) => {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lift hover:border-border transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-surface">
            <AppImage
              src={logo}
              alt={logoAlt}
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
            <p className="text-xs text-text-secondary">{category}</p>
          </div>
        </div>
        {isFeatured && (
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg">
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Stats */}
      {usageCount && (
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Icon name="UsersIcon" size={16} />
            <span>{usageCount.toLocaleString()} users</span>
          </div>
        </div>
      )}

      {/* Connection Status */}
      {isConnected && (
        <div className="mb-4">
          <div className={`flex items-center gap-2 p-3 rounded-xl ${hasError ? 'bg-error/5' : 'bg-success/5'}`}>
            <Icon
              name={hasError ? 'ExclamationIcon' : 'CheckCircleIcon'}
              size={16}
              className={hasError ? 'text-error' : 'text-success'}
            />
            <span className={`text-sm font-medium ${hasError ? 'text-error' : 'text-success'}`}>
              {hasError ? 'Connection Error' : 'Connected'}
            </span>
            {lastSync && !hasError && (
              <span className="text-xs text-text-secondary ml-auto">
                {lastSync}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() => isConnected ? onManage(id) : onConnect(id)}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth
          ${
            isConnected
              ? 'border border-border text-text-primary hover:bg-surface' :'bg-primary text-primary-foreground hover:opacity-90 shadow-subtle'
          }
        `}
      >
        {isConnected ? 'Manage' : 'Connect'}
      </button>
    </div>
  );
};

export default IntegrationCard;