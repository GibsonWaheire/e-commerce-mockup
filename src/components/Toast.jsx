import { useEffect } from 'react';

export default function Toast({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 2000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-lg bg-green-600 text-white px-4 py-3 shadow-lg">
        {children}
      </div>
    </div>
  );
}
