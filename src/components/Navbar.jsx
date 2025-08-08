import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { totals } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold text-xl">
          <span className="bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
            ShopLite
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-blue-600 transition ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-blue-600 transition ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            Products
          </NavLink>
        </div>

        <Link
          to="/cart"
          aria-label="Cart"
          className="relative p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ShoppingCart className="h-6 w-6" />
          {totals.count > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs px-1">
              {totals.count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
