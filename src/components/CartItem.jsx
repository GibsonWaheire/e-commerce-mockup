import { X, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function CartItem({ item }) {
  const { removeItem, updateItemQuantity } = useCart();
  const { product, quantity } = item;

  const finalPrice = product.salePrice || product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.thumbUrl}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-lg"
            loading="lazy"
            decoding="async"
          />
          {/* Condition Badge */}
          <div className="absolute -top-2 -left-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.condition === 'New' ? 'bg-green-100 text-green-800' :
              product.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {product.condition}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-900 truncate">{product.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{product.size}</span>
              </div>
              
              {/* Price Display */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(finalPrice)}
                </span>
                {hasSale && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
                {hasSale && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    SAVE {formatCurrency(product.price - product.salePrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              <button
                className="p-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
                aria-label="Save for later"
                title="Save for later"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label="Remove item"
                title="Remove item"
                onClick={() => removeItem(product.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Quantity:</span>
              <div className="inline-flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                <button
                  className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  onClick={() => updateItemQuantity(product.id, quantity - 1)}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  onClick={() => updateItemQuantity(product.id, quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Total Price */}
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-bold text-lg text-gray-900">
                {formatCurrency(finalPrice * quantity)}
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              product.stock > 3 ? 'bg-green-500' : 
              product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {product.stock > 3 ? 'In Stock' : 
               product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
