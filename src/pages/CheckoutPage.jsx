export default function CheckoutPage() {
  return (
    <section className="container">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-gray-600 mt-2">
          This is a placeholder checkout page. In a real app, you would collect
          shipping, billing, and payment details here.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Full Name" />
          <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Email" />
          <input className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2" placeholder="Address" />
          <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="City" />
          <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Country" />
        </div>
        <button className="btn btn-primary mt-6">Place Order</button>
      </div>
    </section>
  );
}
