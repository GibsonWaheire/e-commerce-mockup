import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import CartItem from './CartItem.jsx';
import { Link } from 'react-router-dom';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function CartPopup({ isOpen, onClose }) {
  const { items, totals, clearCart } = useCart();
  const cartRef = useRef(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClearCart = async () => {
    setIsClearing(true);
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    clearCart();
    setIsClearing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      cartRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-popup-title"
    >
      <div
        ref={cartRef}
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out mt-16"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        {/* Header with enhanced info */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center justify-between mb-2">
            <h2 id="cart-popup-title" className="text-xl font-bold text-gray-900">
              Your Cart
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Cart Summary Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                {totals.count} {totals.count === 1 ? 'item' : 'items'}
              </span>
              {items.length > 0 && (
                <span className="text-gray-500">
                  • {items.length} {items.length === 1 ? 'product' : 'products'}
                </span>
              )}
            </div>
            {items.length > 0 && (
              <span className="font-medium text-gray-900">
                {formatCurrency(totals.subtotal)}
              </span>
            )}
          </div>
        </div>

        {/* Cart Items with enhanced empty state */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Start shopping to discover adorable, sustainable kids fashion for your little ones.
              </p>
              <div className="space-y-3">
                <Link 
                  to="/" 
                  onClick={handleClose}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  🏠 Back to Home
                </Link>
                <Link
                  to="/products"
                  onClick={handleClose}
                  className="block w-full px-6 py-3 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 font-medium"
                >
                  🛍️ Browse Products
                </Link>
              </div>
              
              {/* Quick category suggestions */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Popular categories:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['dresses', 'tops', 'shoes', 'outerwear'].map(category => (
                    <Link
                      key={category}
                      to={`/category/${category}`}
                      onClick={handleClose}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-pink-100 hover:text-pink-700 transition-colors"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Items list with count indicator */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.product.id} className="relative">
                    <CartItem item={item} />
                    {index < items.length - 1 && (
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Enhanced navigation section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <Link
                    to="/"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors border border-pink-200 hover:border-pink-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                  <Link
                    to="/products"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse All Products
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Enhanced Summary Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="space-y-4">
              {/* Subtotal with enhanced styling */}
              <div className="flex items-center justify-between text-lg font-semibold bg-gray-50 p-3 rounded-lg">
                <span>Subtotal</span>
                <span className="text-pink-600">{formatCurrency(totals.subtotal)}</span>
              </div>
              
              {/* Enhanced Shipping Info */}
              <div className="text-sm text-gray-600 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-green-800">Free shipping on orders over KSh 5,000</span>
                </div>
                
                {/* Progress bar for free shipping */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Current order</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totals.subtotal / 5000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {totals.subtotal >= 5000 
                      ? "🎉 You've qualified for free shipping!" 
                      : `Add ${formatCurrency(5000 - totals.subtotal)} more for free shipping`
                    }
                  </div>
                </div>
              </div>

              {/* Action Buttons with enhanced styling */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  🛒 Proceed to Checkout
                </Link>
                <button
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className={`block w-full text-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border ${
                    isClearing
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300'
                  }`}
                >
                  {isClearing ? 'Clearing...' : '🗑️ Clear Cart'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7v10l8 4" />
                  </svg>
                  <span>Quality</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
