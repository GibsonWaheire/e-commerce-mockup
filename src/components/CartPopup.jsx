import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function CartPopup({ isOpen, onClose }) {
  const { items, totals, removeItem } = useCart();
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
      cartRef.current?.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // Show max 3 items for mini cart
  const displayItems = items.slice(0, 3);
  const hasMoreItems = items.length > 3;

  return (
    <>
      {/* Semi-transparent overlay that allows scrolling */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-25 pointer-events-none"
        onClick={handleClose}
      />
      
      {/* Mini Cart Popup - positioned on the right side */}
      <div
        ref={cartRef}
        className="fixed top-16 right-0 z-50 w-full max-w-sm bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Cart ({totals.count})
            </h2>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items - Simplified List */}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-gray-600 text-sm mb-4">Your cart is empty</p>
              <Link 
                to="/products" 
                onClick={handleClose}
                className="inline-block px-4 py-2 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {displayItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                  {/* Small Image */}
                  <img
                    src={item.product.thumbUrl}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Item Details - Simplified */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500 capitalize">
                      {item.product.category}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">
                        {item.quantity} × {formatCurrency(item.product.salePrice || item.product.price)}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors text-gray-400"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {/* View All Link if more than 3 items */}
              {hasMoreItems && (
                <div className="p-3 bg-gray-50">
                  <Link
                    to="/cart"
                    onClick={handleClose}
                    className="block text-center text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    View all {items.length} items →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Subtotal</span>
              <span className="font-semibold text-lg text-pink-600">
                {formatCurrency(totals.subtotal)}
              </span>
            </div>
            
            {/* Free Shipping Progress */}
            <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-800">Free shipping on orders over KSh 5,000</span>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Current</span>
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
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={handleClose}
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm"
              >
                Go to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={handleClose}
                className="block w-full text-center px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
