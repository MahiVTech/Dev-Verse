import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <div className="flex gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            danger ? 'bg-red-500/10 text-red-400' : 'bg-cyan-glow/10 text-cyan-glow'
          }`}
        >
          <AlertTriangle size={18} />
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{message}</p>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onCancel} className="btn-ghost !px-4 !py-2 text-sm">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`!px-4 !py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
            danger
              ? 'bg-red-500/90 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(248,113,113,0.35)]'
              : 'btn-primary'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
