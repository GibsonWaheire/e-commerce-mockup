import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-gray-900">ShopLite</h3>
          <p className="text-sm text-gray-600 mt-2">
            Clean, modern storefront built with React & Tailwind.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Quick Links</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Follow Us</h4>
          <div className="flex gap-4 mt-3">
            <a href="#" className="p-2 rounded-lg hover:bg-gray-100" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-lg hover:bg-gray-100" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-lg hover:bg-gray-100" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopLite. All rights reserved.
      </div>
    </footer>
  );
}
