import products from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';
import { useState, useMemo } from 'react';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], []);
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCat = cat === 'All' || p.category === cat;
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  return (
    <section className="container">
      <div className="card p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <input
          className="w-full md:max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map(c => (
            <button
              key={c}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                cat === c
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}
      </div>
    </section>
  );
}
