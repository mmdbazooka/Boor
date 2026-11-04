'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export function Dialog({
  children,
  title,
  closeLabel,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="dialog-inner">
        <div className="dialog-header">
          <span className="eyebrow">{title}</span>
          <button onClick={onClose} className="icon-button" aria-label={closeLabel} autoFocus>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
