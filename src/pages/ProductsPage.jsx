import products from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';
import { useState, useMemo, useEffect } from 'react';
import { BRAND, CATEGORIES, AGE_RANGES, SORT_OPTIONS } from '../lib/brand';
import FilterBar from '../components/FilterBar.jsx';
import Section from '../components/Section.jsx';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce.js';

export default function ProductsPage() {
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
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Shop All Products
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our complete collection of sustainable kids fashion
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
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-10">
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
    </Section>
  );
}
