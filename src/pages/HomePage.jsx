import { Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="container mt-6 md:mt-10">
        <div className="card overflow-hidden bg-gradient-to-br from-blue-50 to-white">
          <div className="p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Find Your Next Favorite Thing
              </h1>
              <p className="mt-4 text-gray-600">
                Clean, modern shopping experience built with React + Tailwind.
                Fully responsive and fast.
              </p>
              <div className="mt-6 flex gap-3">
                <Link to="/products" className="btn btn-primary">Shop Now</Link>
                <a href="#featured" className="btn btn-outline">Featured</a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/600x400/111827/ffffff?text=ShopLite+Hero"
                alt="Hero"
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-xl px-4 py-2 text-sm">
                Modern • Minimal • Fast
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="container mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
