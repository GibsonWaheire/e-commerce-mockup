import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function CartItem({ item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const { product, quantity } = item;

  return (
    <div className="card p-4 flex gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Remove"
            onClick={() => removeFromCart(product.id)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <button
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => decreaseQty(product.id)}
              aria-label="Decrease"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => increaseQty(product.id)}
              aria-label="Increase"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="font-semibold">
            {formatCurrency(product.price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
