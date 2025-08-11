import { useState, useMemo, Suspense, lazy } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import products from '../data/products.json';
import categories from '../data/categories.json';
import ProductCard from '../components/ProductCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Section from '../components/Section.jsx';
import { BRAND, AGE_RANGES, CATEGORIES, SORT_OPTIONS } from '../lib/brand';
import { useDebounce } from '../hooks/useDebounce.js';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

const Testimonials = lazy(() => import('../components/Testimonials.jsx'));

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    age: searchParams.get('age') || 'all',
    category: searchParams.get('category') || 'all',
    sort: searchParams.get('sort') || 'newest'
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.ageRange.toLowerCase().includes(query)
      );
    }

    // Age filter
    if (filters.age !== 'all') {
      filtered = filtered.filter(product => product.ageRange === filters.age);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Sort
    switch (filters.sort) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
      default:
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [debouncedSearchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      updateSearchParams(newFilters, searchQuery);
      return newFilters;
    });
  };

  const handleSortChange = (value) => {
    setFilters(prev => {
      const newFilters = { ...prev, sort: value };
      updateSearchParams(newFilters, searchQuery);
      return newFilters;
    });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    updateSearchParams(filters, value);
  };

  const updateSearchParams = (currentFilters, currentSearchQuery) => {
    const newParams = new URLSearchParams();
    if (currentSearchQuery) newParams.set('q', currentSearchQuery);
    if (currentFilters.age !== 'all') newParams.set('age', currentFilters.age);
    if (currentFilters.category !== 'all') newParams.set('category', currentFilters.category);
    if (currentFilters.sort !== 'newest') newParams.set('sort', currentFilters.sort);
    setSearchParams(newParams);
  };

  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Adorable, Sustainable
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Kids Fashion
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover high-quality secondhand children's fashion. Sustainable, affordable, and absolutely adorable for your little ones.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                Shop Kids Fashion
              </Link>
              <Link
                to="#featured"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-pink-300 hover:text-pink-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                View Featured
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sustainable</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&h=600&fit=crop&crop=center"
                alt="Kids Mtumba Fashion"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="eager"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                  New Stock Weekly
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Categories Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect outfit for your little one from our carefully curated categories
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${BRAND.spacing.gap}`}>
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      {/* Featured Products */}
      <Section id="featured" className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked items for your little fashionista
          </p>
        </div>

        <FilterBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          activeFilters={filters}
          searchQuery={searchQuery}
          resultsCount={filteredProducts.length}
        />

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${BRAND.spacing.gap}`}>
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="transform hover:-translate-y-2 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to see more products</p>
            <button
              onClick={() => {
                setFilters({ age: 'all', category: 'all', sort: 'newest' });
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Kids Mtumba?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sustainable fashion that's good for your wallet and the planet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">Reduce waste and give clothes a second life</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable</h3>
            <p className="text-gray-600">Quality fashion at fraction of retail prices</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600">Every item carefully inspected and graded</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unique Style</h3>
            <p className="text-gray-600">One-of-a-kind pieces you won't find elsewhere</p>
          </div>
        </div>
      </Section>

      {/* Testimonials Section (Lazy Loaded) */}
      <Suspense fallback={<div className="text-center py-16">Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>
    </>
  );
}

