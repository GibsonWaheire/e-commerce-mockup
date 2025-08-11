import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { BRAND } from '../lib/brand';
import CartPopup from './CartPopup.jsx';
import { useState } from 'react';

export default function Navbar() {
  const { items = [] } = useCart();
  const cartCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100 shadow-sm">
      <nav className={`${BRAND.spacing.container} flex h-16 items-center justify-between`}>
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-xl text-gray-900">{BRAND.shortName}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Shop
          </Link>
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-pink-600 transition-colors font-medium flex items-center gap-1">
              Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Invisible hover buffer */}
            <div className="absolute h-2 top-full w-full"></div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
              <Link to="/category/onesies" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Onesies & Bodysuits
              </Link>
              <Link to="/category/tops" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Tops & Tees
              </Link>
              <Link to="/category/bottoms" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Bottoms
              </Link>
              <Link to="/category/dresses" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Dresses
              </Link>
              <Link to="/category/outerwear" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Outerwear
              </Link>
              <Link to="/category/shoes" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Shoes
              </Link>
              <Link to="/category/new-arrivals" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                New Arrivals
              </Link>
              <Link to="/category/clearance" className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                Clearance
              </Link>
            </div>
          </div>
          
          <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button className="p-2 text-gray-600 hover:text-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            aria-label={`Cart with ${cartCount} items`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="p-2 text-gray-600 hover:text-pink-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-sm text-gray-600 hover:text-pink-600 transition-colors font-medium"
            >
              Sign in
            </button>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Right Side Cart Popup */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
