'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: {
    id: string;
    name: string;
    logo: string;
    logoAlt: string;
  } | null;
  mode: 'connect' | 'manage';
}

const ConnectionModal = ({ isOpen, onClose, integration, mode }: ConnectionModalProps) => {
  const [step, setStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen || !integration || !isHydrated) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (step < 3) {
        setStep(step + 1);
      } else {
        onClose();
      }
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onClose();
    }, 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderConnectFlow = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-lg">
              <h3 className="text-sm font-medium text-text-primary mb-2">
                What you'll need:
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5" variant="solid" />
                  <span>Active {integration.name} account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5" variant="solid" />
                  <span>Admin or integration permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5" variant="solid" />
                  <span>API access enabled (if required)</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Icon name="RefreshIcon" size={20} className="animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <span>Continue to Authorization</span>
              )}
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="p-6 bg-surface rounded-lg text-center">
              <Icon name="ShieldCheckIcon" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Authorize FormCraft
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                You'll be redirected to {integration.name} to grant permissions. This is secure and you can revoke access anytime.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success text-xs font-medium rounded-full">
                <Icon name="LockClosedIcon" size={14} variant="solid" />
                Secure OAuth Connection
              </div>
            </div>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Icon name="RefreshIcon" size={20} className="animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <span>Authorize Access</span>
              )}
            </button>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="p-6 bg-success/5 border border-success/20 rounded-lg text-center">
              <Icon name="CheckCircleIcon" size={48} className="text-success mx-auto mb-4" variant="solid" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Successfully Connected!
              </h3>
              <p className="text-sm text-text-secondary">
                Your forms will now sync with {integration.name}. You can configure sync settings anytime.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth"
            >
              Done
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderManageFlow = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Connection Status</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              Active
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Last synced: 2 minutes ago
          </p>
        </div>

        <div className="p-4 bg-surface rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Sync Settings
          </h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-secondary">Auto-sync submissions</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-secondary">Include attachments</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-secondary">Send notifications</span>
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3 bg-surface text-text-primary rounded-lg font-medium hover:bg-border transition-smooth"
        >
          Close
        </button>
        <button
          onClick={handleDisconnect}
          disabled={isConnecting}
          className="flex-1 px-6 py-3 bg-error text-error-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <Icon name="RefreshIcon" size={20} className="animate-spin" />
              <span>Disconnecting...</span>
            </>
          ) : (
            <span>Disconnect</span>
          )}
        </button>
      </div>
    </div>
  );

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-lift w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <div className="flex-shrink-0 w-12 h-12 bg-surface rounded-lg flex items-center justify-center overflow-hidden">
            <AppImage
              src={integration.logo}
              alt={integration.logoAlt}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-text-primary">
              {mode === 'connect' ? 'Connect' : 'Manage'} {integration.name}
            </h2>
            {mode === 'connect' && (
              <p className="text-sm text-text-secondary">
                Step {step} of 3
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="XIcon" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'connect' ? renderConnectFlow() : renderManageFlow()}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConnectionModal;