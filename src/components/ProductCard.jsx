import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card overflow-hidden flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        {product.condition && (
          <p className="text-xs text-gray-500 mt-1">Condition: {product.condition}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
