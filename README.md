# T-Tots Mtumba Collection 🛍️

> **Adorable, sustainable kids' mtumba fashion**

A modern, responsive e-commerce platform built with React and Tailwind CSS, specializing in second-hand children's clothing. Built with accessibility, performance, and user experience in mind.

![T-Tots Mtumba Collection](https://img.shields.io/badge/T--Tots-Mtumba%20Collection-pink?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 **Core E-commerce**
- **Product Catalog**: Browse 12+ curated kids' clothing items
- **Smart Filtering**: Filter by age, category, condition, and price
- **Advanced Search**: Find products quickly with debounced search
- **Product Details**: Rich product pages with image galleries
- **Category Pages**: Dedicated pages for different clothing categories

### 🛒 **Shopping Experience**
- **Smart Cart System**: Persistent cart with localStorage
- **Mini Cart Popup**: Quick cart overview without leaving the page
- **Quantity Management**: Add, remove, and update item quantities
- **Free Shipping Progress**: Visual progress bar for KSh 5,000 threshold
- **Checkout Process**: Multi-step checkout with form validation

### 💬 **Customer Support**
- **Intelligent Live Chat**: AI-powered automated responses
- **WhatsApp Integration**: Direct WhatsApp messaging
- **Smart Q&A**: Automatic keyword detection and helpful responses
- **Product Guidance**: Size guides, material info, and condition details
- **Quick Actions**: One-click access to common support topics

### 🎨 **Design & UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with soft pastels
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Animations**: Smooth transitions and attention-grabbing effects
- **Toast Notifications**: Real-time feedback for user actions

### 🚀 **Performance & SEO**
- **Image Optimization**: Lazy loading and fallback handling
- **Route Splitting**: React.lazy for code splitting
- **SEO Ready**: Meta tags, Open Graph, and Twitter cards
- **Fast Loading**: Vite build tool for optimal performance
- **Mobile Optimized**: Touch-friendly interface and gestures

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.2.0** - Modern React with hooks and concurrent features
- **React Router DOM 6.8** - Client-side routing with future v7 flags
- **Context API** - Global state management for cart and notifications

### **Styling & UI**
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **Custom Components** - Reusable UI components with consistent design
- **Responsive Grid** - CSS Grid and Flexbox for layouts
- **Custom Animations** - Tailwind animations and CSS transitions

### **Build Tools**
- **Vite 5.4.0** - Fast build tool and development server
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code quality and consistency

### **Development Features**
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Ready** - Easy migration path to TypeScript
- **Modern ES6+** - Latest JavaScript features and syntax

## 📱 Screenshots

<details>
<summary>🖥️ Desktop Views</summary>

- **Homepage**: Hero section, categories, featured products
- **Product Grid**: Responsive product cards with filters
- **Product Detail**: Image gallery, descriptions, related items
- **Cart & Checkout**: Multi-step checkout process
- **Live Chat**: Intelligent customer support widget

</details>

<details>
<summary>📱 Mobile Views</summary>

- **Responsive Design**: Mobile-first approach
- **Touch Optimized**: Swipe gestures and touch-friendly buttons
- **Mobile Navigation**: Collapsible navbar and mobile menu
- **Adaptive Layouts**: Flexible grids and responsive images

</details>

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16.0 or higher
- npm 8.0 or higher
- Modern web browser

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/t-tots-mtumba.git
   cd t-tots-mtumba
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartPopup.jsx   # Mini cart popup
│   ├── ProductCard.jsx # Product display cards
│   ├── FilterBar.jsx   # Search and filter controls
│   ├── WhatsAppWidget.jsx # Live chat and support
│   └── ...
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── ProductsPage.jsx # Product catalog
│   ├── ProductDetailPage.jsx # Individual product view
│   ├── CheckoutPage.jsx # Checkout process
│   └── ...
├── context/            # React Context providers
│   ├── CartContext.jsx # Shopping cart state
│   └── ToastContext.jsx # Notification system
├── data/               # Static data and mockups
│   ├── products.json   # Product catalog
│   └── categories.json # Category definitions
├── lib/                # Utility functions and constants
│   └── brand.js        # Brand configuration
└── main.jsx           # Application entry point
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Pink (#EC4899) - Brand identity
- **Secondary**: Purple (#8B5CF6) - Accent colors
- **Success**: Green (#10B981) - Positive actions
- **Warning**: Yellow (#F59E0B) - Cautions
- **Error**: Red (#EF4444) - Errors and deletions
- **Neutral**: Gray scale (#F9FAFB to #111827)

### **Typography**
- **Headings**: Inter font family, various weights
- **Body Text**: System fonts for optimal readability
- **Sizes**: Responsive typography scale
- **Hierarchy**: Clear visual hierarchy with consistent spacing

### **Spacing System**
- **Container**: `max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8`
- **Sections**: `py-12 md:py-16 lg:py-20`
- **Cards**: `p-6` with consistent margins
- **Gaps**: `gap-4`, `gap-6`, `gap-8` for layouts

### **Component Patterns**
- **Rounded Corners**: `rounded-2xl` for modern look
- **Shadows**: `shadow-md` with `hover:shadow-lg`
- **Focus States**: `focus-visible:ring-2 focus-visible:ring-pink-500`
- **Transitions**: `transition-all duration-300` for smooth interactions

## 🔧 Configuration

### **Brand Settings** (`src/lib/brand.js`)
```javascript
export const BRAND = {
  name: "T-Tots Mtumba Collection",
  tagline: "Adorable, sustainable kids' mtumba fashion",
  spacing: {
    container: "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-12 md:py-16 lg:py-20"
  },
  categories: [...],
  ageRanges: [...]
}
```

### **Product Data Structure**
```javascript
{
  id: "unique-id",
  slug: "product-slug",
  title: "Product Name",
  price: 1500,
  salePrice: 1200,
  condition: "Like New",
  ageRange: "3-5 years",
  category: "tops",
  images: ["url1", "url2"],
  thumbUrl: "thumbnail-url",
  description: "Product description...",
  stock: 5
}
```

## 🌟 Key Features Deep Dive

### **1. Intelligent Live Chat**
The WhatsApp widget provides automated customer support with:
- **Keyword Detection**: Automatically identifies user intent
- **Contextual Responses**: Provides relevant information
- **Quick Actions**: One-click access to common topics
- **Product Navigation**: Direct links to relevant pages
- **Size Guides**: Complete measurement information
- **Material Details**: Fabric information and care instructions

### **2. Smart Cart System**
Advanced shopping cart with:
- **Local Storage**: Persistent cart across sessions
- **Real-time Updates**: Instant quantity and price updates
- **Free Shipping Progress**: Visual motivation for larger orders
- **Mini Cart**: Quick overview without page navigation
- **Item Management**: Easy add, remove, and quantity changes

### **3. Advanced Filtering**
Comprehensive product discovery:
- **Age-based Filtering**: Filter by child age ranges
- **Category Selection**: Browse by clothing type
- **Condition Filtering**: New, Like New, Good, Fair
- **Price Sorting**: Low to high, high to low, newest
- **Search Integration**: Debounced search with instant results

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: `< 640px` - Single column, touch-optimized
- **Tablet**: `640px - 1024px` - Two columns, adaptive layouts
- **Desktop**: `> 1024px` - Multi-column, full features
- **Large**: `> 1280px` - Maximum content width

### **Mobile Optimizations**
- **Touch Targets**: Minimum 44px touch areas
- **Swipe Gestures**: Product image galleries
- **Collapsible Menus**: Mobile-friendly navigation
- **Optimized Images**: Appropriate sizes for mobile devices

## ♿ Accessibility Features

### **ARIA Support**
- **Landmarks**: Semantic HTML structure
- **Labels**: Descriptive labels for interactive elements
- **Live Regions**: Dynamic content announcements
- **Focus Management**: Logical tab order and focus indicators

### **Keyboard Navigation**
- **Tab Order**: Logical navigation flow
- **Focus Indicators**: Visible focus states
- **Keyboard Shortcuts**: ESC to close modals
- **Skip Links**: Jump to main content

### **Screen Reader Support**
- **Alt Text**: Descriptive image descriptions
- **Semantic HTML**: Proper heading hierarchy
- **Form Labels**: Associated form controls
- **Status Messages**: Live updates for dynamic content

## 🚀 Performance Optimizations

### **Code Splitting**
- **Route-based**: Separate bundles for each page
- **Component Lazy Loading**: Load components on demand
- **Dynamic Imports**: React.lazy for better performance

### **Image Optimization**
- **Lazy Loading**: Images load as they come into view
- **Responsive Images**: Appropriate sizes for different devices
- **Fallback Handling**: Graceful degradation for failed images
- **Thumbnail System**: Fast-loading preview images

### **Bundle Optimization**
- **Tree Shaking**: Remove unused code
- **Minification**: Compressed production builds
- **Caching**: Efficient browser caching strategies

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Responsive design across all breakpoints
- [ ] Cart functionality (add, remove, update)
- [ ] Checkout process completion
- [ ] Live chat interactions
- [ ] Product filtering and search
- [ ] Navigation between pages
- [ ] Form validation and submission

### **Browser Compatibility**
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Chrome Mobile

## 📈 Future Enhancements

### **Planned Features**
- **User Authentication**: Sign up, login, user profiles
- **Wishlist System**: Save items for later
- **Order Tracking**: Real-time order status
- **Payment Integration**: M-Pesa, card payments
- **Admin Dashboard**: Product and order management
- **Analytics**: User behavior and sales tracking

### **Technical Improvements**
- **TypeScript Migration**: Type safety and better DX
- **Testing Framework**: Jest and React Testing Library
- **State Management**: Redux Toolkit or Zustand
- **API Integration**: Backend services and databases
- **PWA Features**: Offline support and app-like experience

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Standards**
- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Component Structure**: Follow established patterns
- **Documentation**: Update docs for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - Amazing framework and ecosystem
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Unsplash** - High-quality stock images
- **Lucide React** - Beautiful SVG icons

## 📞 Support

- **Live Chat**: Available on the website
- **WhatsApp**: +254 700 000 000
- **Email**: support@t-tots-mtumba.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/t-tots-mtumba/issues)

---

**Made with ❤️ for sustainable kids' fashion in Kenya**

*T-Tots Mtumba Collection - Making quality clothing accessible to every family*
