import { useCart } from '../context/CartContext.jsx';
const fmt = n => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function MiniCart({ open, onClose }) {
  const { items, increaseQty, decreaseQty, removeItem, totals, clear } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`} style={{ transitionDuration: '300ms' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart ({totals.count})</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100" aria-label="Close mini cart">✕</button>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-3">
              <img src={product.thumbUrl || product.imageUrl} alt={product.name} className="w-16 h-16 rounded object-cover" loading="lazy" decoding="async" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="p-2 rounded hover:bg-gray-100" aria-label="Remove">✕</button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1">
                    <button onClick={() => decreaseQty(product.id)} className="px-2 border rounded">-</button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button onClick={() => increaseQty(product.id)} className="px-2 border rounded">+</button>
                  </div>
                  <div className="font-semibold">{fmt((product.priceUsd ?? 0) * quantity)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{fmt(totals.subtotal)}</span>
          </div>
          <div className="flex gap-3">
            <a href="/checkout" className="flex-1 text-center btn btn-primary">Checkout</a>
            <button onClick={clear} className="btn btn-outline">Clear</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
