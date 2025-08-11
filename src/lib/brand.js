export const BRAND = {
  name: "T-Tots Mtumba Collection",
  shortName: "T-Tots",
  tagline: "Adorable, sustainable kids' mtumba fashion.",
  description: "Discover high-quality secondhand children's fashion. Sustainable, affordable, and absolutely adorable for your little ones.",
  
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    }
  },
  
  spacing: {
    // Centered, readable width with consistent gutters
    container: 'container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8',
    section: 'py-12 md:py-16 lg:py-20',
    card: 'p-4 md:p-5',
    gap: 'gap-6 lg:gap-8'
  },
  
  social: {
    instagram: 'https://instagram.com/ttotsmtumba',
    facebook: 'https://facebook.com/ttotsmtumba',
    twitter: 'https://twitter.com/ttotsmtumba'
  }
};

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '🛍️' },
  { id: 'tops', name: 'Tops', icon: '👕' },
  { id: 'dresses', name: 'Dresses', icon: '👗' },
  { id: 'bottoms', name: 'Bottoms', icon: '👖' },
  { id: 'outerwear', name: 'Outerwear', icon: '🧥' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
  { id: 'accessories', name: 'Accessories', icon: '👜' }
];

export const AGE_RANGES = [
  { id: 'all', name: 'All Ages', range: '0-12' },
  { id: '0-2', name: '0-2 Years', range: '0-2' },
  { id: '3-5', name: '3-5 Years', range: '3-5' },
  { id: '6-8', name: '6-8 Years', range: '6-8' },
  { id: '9-12', name: '9-12 Years', range: '9-12' }
];

export const SORT_OPTIONS = [
  { id: 'newest', name: 'Newest First', value: 'newest' },
  { id: 'price-low', name: 'Price: Low to High', value: 'price-low' },
  { id: 'price-high', name: 'Price: High to Low', value: 'price-high' },
  { id: 'name', name: 'Name A-Z', value: 'name' }
];
