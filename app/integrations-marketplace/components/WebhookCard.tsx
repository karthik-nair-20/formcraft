import Icon from '@/components/ui/AppIcon';

interface WebhookCardProps {
  onConfigure: () => void;
}

const WebhookCard = ({ onConfigure }: WebhookCardProps) => {
  return (
    <div className="bg-card border border-border/50 border-dashed rounded-2xl p-6 hover:shadow-subtle hover:border-primary/30 transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <Icon name="CodeIcon" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Custom Webhooks
        </h3>
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          Send form data to any endpoint with custom webhooks
        </p>
        <button
          onClick={onConfigure}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-smooth shadow-subtle"
        >
          Configure Webhook
        </button>
      </div>
    </div>
  );
};

export default WebhookCard;