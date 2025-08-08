import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <section className="container">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <p className="text-gray-600 mt-2">The item you are looking for doesn’t exist.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="card p-6">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>
          {product.condition && (
            <p className="text-gray-500 text-sm mt-1">Condition: {product.condition}</p>
          )}
          <div className="mt-4 text-2xl font-extrabold">{formatCurrency(product.price)}</div>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              min="1"
              className="w-20 border border-gray-300 rounded-lg px-3 py-2"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
