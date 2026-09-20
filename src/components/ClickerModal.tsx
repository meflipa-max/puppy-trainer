import React from 'react';
import { ClickerWidget } from './ClickerWidget';

interface ClickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClickerModal: React.FC<ClickerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="clicker-modal-overlay"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ClickerWidget onClose={onClose} isFloating={true} />
      </div>
    </div>
  );
};
