import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';

const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function CartPage() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="container grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {items.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary mt-4 inline-block">Browse products</Link>
          </div>
        ) : (
          items.map(i => <CartItem key={i.product.id} item={i} />)
        )}
      </div>

      <aside className="card p-6 h-fit sticky top-24">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">{formatCurrency(totals.subtotal)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Taxes and shipping calculated at checkout.</p>

        <div className="mt-6 grid gap-3">
          <button
            className="btn btn-primary w-full"
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
          <button className="btn btn-outline w-full" onClick={clearCart}>
            Clear Cart
          </button>
          <Link to="/products" className="text-center text-sm text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </aside>
    </section>
  );
}
