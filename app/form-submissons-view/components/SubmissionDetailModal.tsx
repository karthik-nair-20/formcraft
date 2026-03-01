'use client';

import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';

interface SubmissionDetail {
  id: string;
  timestamp: string;
  respondent: {
    name: string;
    email: string;
  };
  status: 'complete' | 'incomplete';
  fields: Record<string, string>;
  metadata: {
    ipAddress: string;
    userAgent: string;
    completionTime: string;
  };
}

interface SubmissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: SubmissionDetail | null;
}

const SubmissionDetailModal = ({
  isOpen,
  onClose,
  submission,
}: SubmissionDetailModalProps) => {
  if (!isOpen || !submission) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-lift w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="DocumentTextIcon" size={20} className="text-primary" variant="solid" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Submission Details
              </h2>
              <p className="text-sm text-text-secondary">
                {formatDate(submission.timestamp)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="XIcon" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Respondent Info */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
              Respondent Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Name</p>
                <p className="text-sm font-medium text-text-primary">
                  {submission.respondent.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Email</p>
                <p className="text-sm font-medium text-text-primary">
                  {submission.respondent.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Status</p>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'complete'
                      ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}
                >
                  <Icon
                    name={submission.status === 'complete' ? 'CheckCircleIcon' : 'ClockIcon'}
                    size={14}
                    variant="solid"
                  />
                  {submission.status === 'complete' ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Completion Time</p>
                <p className="text-sm font-medium text-text-primary">
                  {submission.metadata.completionTime}
                </p>
              </div>
            </div>
          </div>

          {/* Form Responses */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
              Form Responses
            </h3>
            <div className="space-y-4">
              {Object.entries(submission.fields).map(([field, value]) => (
                <div key={field} className="bg-surface rounded-lg p-4">
                  <p className="text-xs text-text-secondary mb-2 font-medium">
                    {field}
                  </p>
                  <p className="text-sm text-text-primary whitespace-pre-wrap">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
              Submission Metadata
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="GlobeAltIcon" size={18} className="text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">IP Address</p>
                  <p className="text-sm font-mono text-text-primary">
                    {submission.metadata.ipAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="DeviceMobileIcon" size={18} className="text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">User Agent</p>
                  <p className="text-sm font-mono text-text-primary break-all">
                    {submission.metadata.userAgent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface">
          <button className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-lg text-sm font-medium transition-smooth">
            <Icon name="TrashIcon" size={18} />
            <span>Delete</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-background border border-input rounded-lg text-sm font-medium text-text-primary hover:bg-surface transition-smooth">
              <Icon name="DownloadIcon" size={18} />
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

export default SubmissionDetailModal;