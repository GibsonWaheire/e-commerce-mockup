import { BRAND } from '../lib/brand';

export default function Section({ children, className = '' }) {
  return (
    <section className={`${BRAND.spacing.container} ${BRAND.spacing.section} ${className}`}>
      {children}
    </section>
  );
}
