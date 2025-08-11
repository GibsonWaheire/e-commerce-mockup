import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function CartItem({ item }) {
  const { removeItem, updateItemQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
      <img
        src={product.thumbUrl}
        alt={product.title}
        className="w-20 h-20 object-cover rounded-lg"
        loading="lazy"
        decoding="async"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{product.title}</h4>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
            <p className="text-sm text-gray-500">{product.size} • {product.condition}</p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Remove item"
            onClick={() => removeItem(product.id)}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <button
              className="p-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => updateItemQuantity(product.id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              className="p-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => updateItemQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="font-semibold text-gray-900">
            {formatCurrency((product.salePrice || product.price) * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
