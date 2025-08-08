export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="p-4">{children}</div>
        <div className="p-4 border-t border-gray-100 text-right">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
