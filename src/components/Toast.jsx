import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const TOAST_TYPES = {
  success: { icon: CheckCircle, bgColor: 'bg-green-50', textColor: 'text-green-800', borderColor: 'border-green-200', iconColor: 'text-green-500' },
  error: { icon: XCircle, bgColor: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-200', iconColor: 'text-red-500' },
  warning: { icon: AlertCircle, bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', borderColor: 'border-yellow-200', iconColor: 'text-yellow-500' },
  info: { icon: Info, bgColor: 'bg-blue-50', textColor: 'text-blue-800', borderColor: 'border-blue-200', iconColor: 'text-blue-500' }
};

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const toastConfig = TOAST_TYPES[type] || TOAST_TYPES.success;
  const Icon = toastConfig.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`${toastConfig.bgColor} ${toastConfig.borderColor} ${toastConfig.textColor} border rounded-lg shadow-lg p-4 min-w-80 max-w-md`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 ${toastConfig.iconColor} mt-0.5 flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast Container to manage multiple toasts
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
