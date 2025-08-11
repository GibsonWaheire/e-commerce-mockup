import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';

export default function NotFound() {
  return (
    <Section>
      <div className="text-center py-20">
        <div className="text-8xl">🧭</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for doesn’t exist.</p>
        <Link to="/products" className="btn btn-primary mt-6 inline-block">Back to Shop</Link>
      </div>
    </Section>
  );
}
