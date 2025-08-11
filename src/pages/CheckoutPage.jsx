import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { BRAND } from '../lib/brand';
import Section from '../components/Section.jsx';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function CheckoutPage() {
  const { items, totals, clearCart, removeItem, updateItemQuantity } = useCart();
  const { showSuccess, showInfo } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: { firstName: '', lastName: '', email: '', phone: '' },
    shipping: { address: '', city: '', postalCode: '', country: 'Kenya' },
    payment: { cardNumber: '', expiry: '', cvv: '', cardholderName: '' }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you'd send this to your backend
    console.log('Order submitted:', { formData, items, totals });
    
    // Clear cart and redirect to success page
    clearCart();
    navigate('/order-success');
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: '👤' },
    { id: 2, title: 'Shipping', icon: '🚚' },
    { id: 3, title: 'Payment', icon: '💳' },
    { id: 4, title: 'Review', icon: '✅' }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 300, time: '3-5 business days' },
    { id: 'express', name: 'Express Delivery', price: 600, time: '1-2 business days' },
    { id: 'free', name: 'Free Shipping', price: 0, time: '5-7 business days', minOrder: 5000 }
  ];

  const totalShipping = selectedShipping === 'free' ? 0 : 
    shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
  const finalTotal = totals.subtotal + totalShipping;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className={`${BRAND.spacing.container} py-4`}>
          <div className="flex items-center justify-end">
            <div className="text-sm text-gray-600">
              Secure Checkout • SSL Encrypted
            </div>
          </div>
        </div>
      </div>

      <div className={`${BRAND.spacing.container} py-8`}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
              </div>
              
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id 
                        ? 'bg-pink-500 border-pink-500 text-white' 
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-pink-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue to Shipping →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                
                {/* Shipping Address */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={formData.shipping.address}
                      onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.shipping.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Nairobi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.shipping.postalCode}
                        onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="00100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        value={formData.shipping.country}
                        onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Shipping Method</label>
                  {shippingOptions.map((option) => (
                    <label key={option.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-pink-300 transition-colors">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-500">{option.time}</div>
                            {option.minOrder && (
                              <div className="text-xs text-pink-600">Min. order: {formatCurrency(option.minOrder)}</div>
                            )}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {option.price === 0 ? 'FREE' : formatCurrency(option.price)}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.shipping.address || !formData.shipping.city}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-pink-300 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedPayment === 'card'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <span className="font-medium text-gray-900">Credit/Debit Card</span>
                        <div className="flex gap-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Visa</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Mastercard</span>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-pink-300 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="mpesa"
                        checked={selectedPayment === 'mpesa'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <span className="font-medium text-gray-900">M-Pesa</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Mobile Money</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {selectedPayment === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.payment.expiry}
                          onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={formData.payment.cardholderName}
                          onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="As it appears on card"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    disabled={selectedPayment === 'card' && (!formData.payment.cardNumber || !formData.payment.expiry || !formData.payment.cvv)}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Order Review */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Review</h2>
                
                {/* Order Summary */}
                <div className="space-y-4 mb-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                    <div className="text-sm text-gray-600">
                      {formData.personalInfo.firstName} {formData.personalInfo.lastName}<br />
                      {formData.personalInfo.email}<br />
                      {formData.personalInfo.phone}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-600">
                      {formData.shipping.address}<br />
                      {formData.shipping.city}, {formData.shipping.postalCode}<br />
                      {formData.shipping.country}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <div className="text-sm text-gray-600">
                      {selectedPayment === 'card' ? 'Credit/Debit Card' : 'M-Pesa'}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary & Ads */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Items with full editing capabilities */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.product.thumbUrl}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        {/* Condition Badge */}
                        <div className="absolute -top-2 -left-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.product.condition === 'New' ? 'bg-green-100 text-green-800' :
                            item.product.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.product.condition}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 truncate">{item.product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                                {item.product.category}
                              </span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{item.product.size}</span>
                            </div>
                            
                            {/* Price Display */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(item.product.salePrice || item.product.price)}
                              </span>
                              {item.product.salePrice && item.product.salePrice < item.product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatCurrency(item.product.price)}
                                </span>
                              )}
                              {item.product.salePrice && item.product.salePrice < item.product.price && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                  SAVE {formatCurrency(item.product.price - item.product.salePrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors text-gray-400"
                              aria-label="Save for later"
                              title="Save for later"
                              onClick={() => {
                                // In a real app, this would move the item to a wishlist
                                alert('Item saved for later! (Wishlist functionality would be implemented here)');
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-400"
                              aria-label="Remove item"
                              title="Remove item"
                              onClick={() => {
                                if (window.confirm('Remove this item from cart?')) {
                                  removeItem(item.product.id);
                                  showInfo(`${item.product.title} removed from cart`);
                                }
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="inline-flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
                              <button
                                className="w-7 h-7 rounded-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => {
                                  updateItemQuantity(item.product.id, item.quantity - 1);
                                  showInfo(`Quantity updated to ${item.quantity - 1}`);
                                }}
                                aria-label="Decrease quantity"
                                disabled={item.quantity <= 1}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                className="w-7 h-7 rounded-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
                                onClick={() => {
                                  updateItemQuantity(item.product.id, item.quantity + 1);
                                  showInfo(`Quantity updated to ${item.quantity + 1}`);
                                }}
                                aria-label="Increase quantity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Total Price */}
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Total</div>
                            <div className="font-bold text-lg text-gray-900">
                              {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                            </div>
                          </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.product.stock > 3 ? 'bg-green-500' : 
                            item.product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-xs text-gray-500">
                            {item.product.stock > 3 ? 'In Stock' : 
                             item.product.stock > 0 ? `Only ${item.product.stock} left` : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{totalShipping === 0 ? 'FREE' : formatCurrency(totalShipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-pink-600">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Cart Actions */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your entire cart?')) {
                      clearCart();
                      showInfo('Cart cleared successfully');
                    }
                  }}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                >
                  🗑️ Clear Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
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

              {/* Continue Shopping Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Need more items?</h3>
                <div className="space-y-2">
                  <Link
                    to="/products"
                    className="block w-full text-center px-4 py-2 text-sm text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors border border-pink-200 hover:border-pink-300"
                  >
                    🛍️ Browse All Products
                  </Link>
                  <Link
                    to="/category/new-arrivals"
                    className="block w-full text-center px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    🆕 New Arrivals
                  </Link>
                  <Link
                    to="/category/clearance"
                    className="block w-full text-center px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    🏷️ Clearance Sale
                  </Link>
                </div>
              </div>
            </div>

            {/* Promotional Ad */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
              <div className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-semibold text-gray-900 mb-2">Special Offer!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get 10% off your next order when you sign up for our newsletter
                </p>
                <button className="w-full px-4 py-2 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors">
                  Subscribe & Save
                </button>
              </div>
            </div>

            {/* Trust Ad */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-semibold text-gray-900 mb-2">Why Choose Us?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quality Assured Items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sustainable Fashion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support Ad */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our customer support team is here to help you with any questions
                </p>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                    Live Chat
                  </button>
                  <button className="w-full px-4 py-2 border border-blue-300 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Related Products Ad */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">You Might Also Like</h3>
              <div className="space-y-3">
                {items.slice(0, 2).map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.thumbUrl}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.title}</h4>
                      <p className="text-xs text-gray-500">{formatCurrency(item.product.salePrice || item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/products"
                className="block w-full text-center mt-4 px-4 py-2 text-pink-600 text-sm font-medium hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors"
              >
                Browse More Products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
