import { useState } from 'react';
import { CATEGORIES, AGE_RANGES, SORT_OPTIONS } from '../lib/brand';

export default function FilterBar({ onFilterChange, onSortChange, onSearchChange, activeFilters, searchQuery, resultsCount, hideCategoryFilter = false }) {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handleSortChange = (value) => {
    onSortChange(value);
  };

  const handleSearchChange = (value) => {
    onSearchChange(value);
  };

  const clearFilters = () => {
    onFilterChange('age', 'all');
    if (!hideCategoryFilter) {
      onFilterChange('category', 'all');
    }
    onSortChange('newest');
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">Search Products</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, category, or age range..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">Showing {resultsCount} items</div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Age Range Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Age Range</label>
            <div className="flex flex-wrap gap-2">
              {AGE_RANGES.map((age) => (
                <button
                  key={age.id}
                  onClick={() => handleFilterChange('age', age.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilters.age === age.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {age.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          {!hideCategoryFilter && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={activeFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort Controls */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <select
              value={activeFilters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(activeFilters.age !== 'all' || (!hideCategoryFilter && activeFilters.category !== 'all') || activeFilters.sort !== 'newest' || searchQuery) && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
