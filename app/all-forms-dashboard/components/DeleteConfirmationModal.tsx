'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formTitle: string;
  isMultiple?: boolean;
  count?: number;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  formTitle,
  isMultiple = false,
  count = 1,
}: DeleteConfirmationModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isOpen || !isHydrated) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-lift w-full max-w-md animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-full mb-4">
            <Icon name="ExclamationIcon" size={24} className="text-error" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {isMultiple ? `Delete ${count} forms?` : 'Delete form?'}
          </h3>
          <p className="text-text-secondary mb-6">
            {isMultiple
              ? `Are you sure you want to delete ${count} forms? This action cannot be undone and all submissions will be permanently lost.`
              : `Are you sure you want to delete "${formTitle}"? This action cannot be undone and all submissions will be permanently lost.`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-input text-text-primary rounded-lg font-medium hover:bg-surface transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-error text-error-foreground rounded-lg font-medium hover:opacity-90 transition-smooth"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteConfirmationModal;