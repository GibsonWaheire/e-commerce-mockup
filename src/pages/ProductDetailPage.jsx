import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';
import Section from '../components/Section.jsx';
import { BRAND } from '../lib/brand';
import ImageWithFallback from '../components/ImageWithFallback.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const formatCurrency = (n) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(n);

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { showSuccess } = useToast();

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct);
    if (foundProduct) {
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      showSuccess(`${product.title} added to cart!`, 2000);
    }
  };

  if (!product) {
    return (
      <Section>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </Section>
    );
  }

  const finalPrice = product.salePrice || product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <Section>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/products" className="hover:text-pink-600">Products</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to={`/category/${product.category}`} className="hover:text-pink-600 capitalize">{product.category}</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900">{product.title}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <ImageWithFallback
              src={product.images[selectedImage] || product.thumbUrl}
              alt={`${product.title} for ages ${product.ageRange}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-pink-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
              <span className="text-gray-300">•</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.condition === 'New' ? 'bg-green-100 text-green-800' :
                product.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {product.condition}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(finalPrice)}
              </div>
              {hasSale && (
                <div className="text-xl text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </div>
              )}
              {hasSale && (
                <div className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                  Save {formatCurrency(product.price - product.salePrice)}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Size</span>
                <p className="font-medium">{product.size}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Age Range</span>
                <p className="font-medium">{product.ageRange}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Brand</span>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Material</span>
                <p className="font-medium capitalize">{product.material}</p>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Description</span>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Stock</span>
              <p className="font-medium">{product.stock} available</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-pink-300 hover:text-pink-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
              Save for Later
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Free Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7v10l8 4" />
              </svg>
              <span>Sustainable</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${BRAND.spacing.gap}`}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
