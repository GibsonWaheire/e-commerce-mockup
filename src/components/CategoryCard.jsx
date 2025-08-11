import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback.jsx';

export default function CategoryCard({ category }) {
  const { slug, name, image, description, count } = category;

  return (
    <Link
      to={`/category/${slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={image}
          alt={`${name} category`}
          className="h-full w-full object-cover group-hover:scale-[1.02] duration-300 will-change-transform"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{count} items</span>
          <span className="text-pink-600 text-sm font-medium group-hover:text-pink-700 transition-colors">
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  );
}
