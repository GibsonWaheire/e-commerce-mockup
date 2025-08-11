import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';
import categories from '../data/categories.json';
import ProductCard from '../components/ProductCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Section from '../components/Section.jsx';
import { BRAND } from '../lib/brand';
import { useDebounce } from '../hooks/useDebounce.js';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const [filters, setFilters] = useState({
    age: searchParams.get('age') || 'all',
    sort: searchParams.get('sort') || 'newest'
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  const category = categories.find(cat => cat.slug === slug);
  const categoryProducts = products.filter(product => product.category === slug);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.ageRange.toLowerCase().includes(query)
      );
    }

    // Age filter
    if (filters.age !== 'all') {
      filtered = filtered.filter(product => product.ageRange === filters.age);
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
  }, [categoryProducts, debouncedSearchQuery, filters]);

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
    if (currentFilters.sort !== 'newest') newParams.set('sort', currentFilters.sort);
    setSearchParams(newParams);
  };

  if (!category) {
    return (
      <Section>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Category Header */}
      <Section className="bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium">
              {category.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{category.count} items available</span>
              <span>•</span>
              <span>Quality assured</span>
              <span>•</span>
              <span>Free returns</span>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src={category.image}
              alt={`${category.name} category`}
              className="w-full h-auto rounded-2xl shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </Section>

      {/* Products Section */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {category.name} ({filteredProducts.length} items)
          </h2>
          <Link
            to="/products"
            className="text-pink-600 hover:text-pink-700 font-medium hover:underline"
          >
            View All Products →
          </Link>
        </div>

        <FilterBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          activeFilters={filters}
          searchQuery={searchQuery}
          resultsCount={filteredProducts.length}
          hideCategoryFilter={true}
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
                setFilters({ age: 'all', sort: 'newest' });
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
