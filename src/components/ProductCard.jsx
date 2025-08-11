import { Link } from 'react-router-dom';
import { BRAND } from '../lib/brand';
import ImageWithFallback from './ImageWithFallback.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useState } from 'react';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function ProductCard({ product }) {
  const { id, slug, title, price, salePrice, category, thumbUrl, condition, ageRange, material } = product;
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const finalPrice = salePrice || price;
  const hasSale = salePrice && salePrice < price;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200">
      <Link to={`/products/${slug}`} className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-t-2xl relative">
          <ImageWithFallback
            src={thumbUrl}
            alt={`${title} for ages ${ageRange}`}
            className="h-full w-full object-cover group-hover:scale-[1.02] duration-300 will-change-transform"
            loading="lazy"
            decoding="async"
          />
          
          {/* Condition Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              condition === 'New' ? 'bg-green-100 text-green-800' :
              condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {condition}
            </span>
          </div>

          {/* Sale Badge */}
          {hasSale && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                SALE
              </span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-5">
          {/* Category */}
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            {category}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(finalPrice)}
            </span>
            {hasSale && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>{ageRange}</span>
            <span className="capitalize">{material}</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${
            isAdding
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700'
          }`}
        >
          {isAdding ? 'Added! ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
