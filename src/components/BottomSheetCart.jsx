import React, { useRef, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext.jsx';
import CartItem from './CartItem.jsx';
import { Link } from 'react-router-dom';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function BottomSheetCart({ isOpen, onClose }) {
  const { items, totals, clearCart } = useCart();
  const cartRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50">
          <h2 id="cart-popup-title" className="text-xl font-bold text-gray-900">
            Your Cart ({totals.count})
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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Link 
                to="/" 
                onClick={handleClose}
                className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map(item => <CartItem key={item.product.id} item={item} />)}
              </div>
              
              {/* Navigation Links */}
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={handleClose}
                    className="block w-full text-center px-4 py-2 text-sm text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    ← Back to Home
                  </Link>
                  <Link
                    to="/products"
                    onClick={handleClose}
                    className="block w-full text-center px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Summary Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              
              {/* Shipping Info */}
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Free shipping on orders over KSh 5,000</span>
                </div>
                <div className="text-xs text-gray-500">
                  {totals.subtotal >= 5000 
                    ? "You've qualified for free shipping!" 
                    : `Add ${formatCurrency(5000 - totals.subtotal)} more for free shipping`
                  }
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-center px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
