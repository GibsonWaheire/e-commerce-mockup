import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const widgetRef = useRef(null);
  const notificationRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auto-show notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide notification after 8 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      setChatMessages([
        {
          id: 1,
          type: 'agent',
          message: "Hi there! 👋 Welcome to T-Tots Mtumba Collection. How can I help you today?",
          timestamp: new Date(),
          quickActions: ['Product Questions', 'Size Guide', 'Shipping Info', 'Returns', 'Browse Products']
        }
      ]);
    }
  }, [isOpen, chatMessages.length]);

  const handleWhatsAppClick = () => {
    // Open WhatsApp with pre-filled message
    const text = encodeURIComponent("Hi! I'm interested in your kids' mtumba collection. Can you help me?");
    window.open(`https://wa.me/254700000000?text=${text}`, '_blank');
  };

  const handleLiveChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowNotification(false);
  };

  const addMessage = (message, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleQuickAction = (action) => {
    addMessage(action, 'user');
    
    // Simulate typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      handleAutomatedResponse(action);
    }, 1000);
  };

  const handleAutomatedResponse = (action) => {
    let response = '';
    let quickActions = [];
    let navigation = null;

    switch (action.toLowerCase()) {
      case 'product questions':
        response = "Great! I can help you with product information. What would you like to know?";
        quickActions = ['Size Guide', 'Material Info', 'Condition Details', 'Price Questions', 'Browse Products'];
        break;
      
      case 'size guide':
        response = "📏 Here's our size guide for kids' clothing:\n\n• 0-3 months: 50-62 cm\n• 3-6 months: 62-68 cm\n• 6-12 months: 68-74 cm\n• 12-18 months: 74-80 cm\n• 18-24 months: 80-86 cm\n• 2-3 years: 86-92 cm\n• 3-4 years: 92-98 cm\n• 4-5 years: 98-104 cm\n\nWould you like me to show you products in a specific size?";
        quickActions = ['Show 0-3 months', 'Show 3-6 months', 'Show 6-12 months', 'Browse All Sizes'];
        break;
      
      case 'shipping info':
        response = "🚚 Shipping Information:\n\n• Standard Delivery: KSh 300 (3-5 business days)\n• Express Delivery: KSh 600 (1-2 business days)\n• FREE Shipping on orders over KSh 5,000\n\nWe ship to all major cities in Kenya. Would you like to see our shipping policy?";
        quickActions = ['Shipping Policy', 'Track Order', 'Delivery Areas', 'Back to Products'];
        break;
      
      case 'returns':
        response = "🔄 Returns & Exchange Policy:\n\n• 30-day return window\n• Free returns for defective items\n• Size exchanges available\n• Refunds processed within 5-7 days\n\nNeed help with a return? I can guide you through the process!";
        quickActions = ['Start Return', 'Exchange Item', 'Return Policy', 'Contact Support'];
        break;
      
      case 'browse products':
        response = "🛍️ Let me take you to our product collection! You can browse by category, age range, or view all products.";
        quickActions = ['View All Products', 'Shop by Category', 'New Arrivals', 'Clearance Sale'];
        navigation = '/products';
        break;
      
      case 'show 0-3 months':
      case 'show 3-6 months':
      case 'show 6-12 months':
        response = `Perfect! I'll show you products for ${action.toLowerCase()}. Here are some great options:`;
        quickActions = ['View More', 'Add to Cart', 'Size Guide', 'Back to Categories'];
        navigation = `/products?age=${action.toLowerCase().replace(' ', '-')}`;
        break;
      
      case 'material info':
        response = "🧵 Our clothing materials:\n\n• Cotton Blend: Soft, breathable, perfect for sensitive skin\n• Polyester: Durable, easy-care, great for active kids\n• Denim: Classic, long-lasting, perfect for everyday wear\n• Knit: Stretchy, comfortable, ideal for movement\n\nAll materials are carefully selected for comfort and durability!";
        quickActions = ['Browse Cotton Items', 'View Denim Collection', 'See All Materials', 'Back to Products'];
        break;
      
      case 'condition details':
        response = "⭐ Product Condition Grades:\n\n• New: Never worn, with tags\n• Like New: Minimal wear, excellent condition\n• Good: Light wear, still very wearable\n• Fair: Some wear, good for everyday use\n\nEvery item is carefully inspected and graded for quality!";
        quickActions = ['View New Items', 'Like New Collection', 'All Conditions', 'Quality Promise'];
        break;
      
      case 'price questions':
        response = "💰 Our Pricing:\n\n• New items: 40-60% off retail prices\n• Like New: 50-70% off retail prices\n• Good condition: 60-80% off retail prices\n• Clearance items: Up to 90% off!\n\nAll prices are in Kenyan Shillings (KES). Need help finding items in your budget?";
        quickActions = ['Under KSh 1,000', 'Under KSh 2,000', 'Clearance Items', 'Price Range Help'];
        break;
      
      default:
        response = "I'm here to help! Could you please be more specific about what you'd like to know? I can help with products, sizes, shipping, returns, and more.";
        quickActions = ['Product Questions', 'Size Guide', 'Shipping Info', 'Returns', 'Browse Products'];
    }

    // Add automated response
    const autoResponse = {
      id: Date.now(),
      type: 'agent',
      message: response,
      timestamp: new Date(),
      quickActions,
      navigation
    };

    setChatMessages(prev => [...prev, autoResponse]);

    // Navigate if specified
    if (navigation) {
      setTimeout(() => {
        window.open(navigation, '_blank');
      }, 1500);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    addMessage(message, 'user');
    setMessage('');

    // Simulate typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Check for keywords and provide relevant response
      const lowerMessage = message.toLowerCase();
      let response = '';
      let quickActions = [];

      if (lowerMessage.includes('size') || lowerMessage.includes('measurement')) {
        response = "I can help you with sizing! Let me show you our size guide and help you find the perfect fit.";
        quickActions = ['Size Guide', 'Show My Size', 'Measurements Help', 'Back to Products'];
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
        response = "Great question about pricing! Our items are 40-90% off retail prices, making sustainable fashion affordable. Let me show you some options in different price ranges.";
        quickActions = ['Under KSh 1,000', 'Under KSh 2,000', 'Clearance Items', 'Price Range Help'];
      } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
        response = "I can help with shipping information! We offer standard and express delivery options, with free shipping on orders over KSh 5,000.";
        quickActions = ['Shipping Info', 'Delivery Areas', 'Track Order', 'Shipping Policy'];
      } else if (lowerMessage.includes('return') || lowerMessage.includes('exchange') || lowerMessage.includes('refund')) {
        response = "I understand you have questions about returns! We have a 30-day return window and offer free exchanges for sizing issues.";
        quickActions = ['Returns Policy', 'Start Return', 'Exchange Process', 'Contact Support'];
      } else if (lowerMessage.includes('quality') || lowerMessage.includes('condition') || lowerMessage.includes('wear')) {
        response = "Quality is our priority! Every item is carefully inspected and graded. We only sell items that meet our quality standards.";
        quickActions = ['Quality Promise', 'Condition Guide', 'Inspection Process', 'View Products'];
      } else {
        response = "Thank you for your message! I'd be happy to help you find what you're looking for. Let me show you some options.";
        quickActions = ['Browse Products', 'Size Guide', 'Shipping Info', 'Contact Support'];
      }

      const autoResponse = {
        id: Date.now(),
        type: 'agent',
        message: response,
        timestamp: new Date(),
        quickActions
      };

      setChatMessages(prev => [...prev, autoResponse]);
    }, 1500);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setChatMessages([]);
    setCurrentStep('welcome');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification Bubble */}
        {showNotification && !isOpen && (
          <div
            ref={notificationRef}
            className="absolute bottom-16 right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-3 w-64 animate-bounce"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Need help? 💬
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  Chat with us on WhatsApp or use our live chat for instant support!
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={handleLiveChat}
                    className="px-3 py-1 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Live Chat
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={handleLiveChat}
          className="group relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
          aria-label="Chat with us"
        >
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
          
          {/* WhatsApp Icon */}
          <svg className="w-8 h-8 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          
          {/* Pulse Animation */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </button>
      </div>

      {/* Live Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Live Chat</div>
                  <div className="text-xs text-pink-100">We're online now!</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Minimize chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                {msg.type === 'agent' && (
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                <div className={`max-w-xs ${msg.type === 'user' ? 'order-1' : ''}`}>
                  <div className={`rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm whitespace-pre-line">{msg.message}</div>
                    <div className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-pink-100' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  {msg.quickActions && msg.type === 'agent' && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action)}
                          className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full hover:bg-pink-200 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            
            {/* WhatsApp CTA */}
            <div className="mt-3 text-center">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isMinimized && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleMinimize}
            className="w-16 h-16 bg-pink-500 hover:bg-pink-600 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2"
            aria-label="Expand chat"
          >
            <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
