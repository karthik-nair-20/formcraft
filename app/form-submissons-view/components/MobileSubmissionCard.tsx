import Icon from '@/components/ui/AppIcon';

interface Submission {
  id: string;
  timestamp: string;
  respondent: {
    name: string;
    email: string;
  };
  status: 'complete' | 'incomplete';
  fields: Record<string, string>;
}

interface MobileSubmissionCardProps {
  submission: Submission;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onViewDetails: () => void;
}

const MobileSubmissionCard = ({
  submission,
  isSelected,
  onSelect,
  onViewDetails,
}: MobileSubmissionCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              {submission.respondent.name}
            </p>
            <p className="text-xs text-text-secondary">
              {submission.respondent.email}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            submission.status === 'complete'
              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}
        >
          <Icon
            name={submission.status === 'complete' ? 'CheckCircleIcon' : 'ClockIcon'}
            size={12}
            variant="solid"
          />
          {submission.status === 'complete' ? 'Complete' : 'Incomplete'}
        </span>
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <Icon name="ClockIcon" size={14} />
        <span>{formatDate(submission.timestamp)}</span>
      </div>

      {/* Preview Fields */}
      <div className="space-y-2 pt-2 border-t border-border">
        {Object.entries(submission.fields)
          .slice(0, 2)
          .map(([field, value]) => (
            <div key={field}>
              <p className="text-xs text-text-secondary mb-0.5">{field}</p>
              <p className="text-sm text-text-primary truncate">{value}</p>
            </div>
          ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onViewDetails}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth"
        >
          <Icon name="EyeIcon" size={16} />
          <span>View Details</span>
        </button>
        <button className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth">
          <Icon name="DotsVerticalIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default MobileSubmissionCard;