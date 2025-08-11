import { Link } from 'react-router-dom';
import { BRAND } from '../lib/brand';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12">
      <div className={`${BRAND.spacing.container} max-w-2xl mx-auto`}>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed! 🎉</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order! We've received your payment and will start processing your items right away.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-xs font-bold">1</span>
                </div>
                <span>We'll send you an order confirmation email with all the details</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-xs font-bold">2</span>
                </div>
                <span>Our team will carefully pack and ship your items within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-xs font-bold">3</span>
                </div>
                <span>You'll receive tracking information once your order ships</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-semibold"
            >
              🏠 Continue Shopping
            </Link>
            <Link
              to="/products"
              className="block w-full px-6 py-3 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 font-medium"
            >
              🛍️ Browse More Products
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Have questions about your order? We're here to help!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                📧 Email Support
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                💬 Live Chat
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                📱 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
