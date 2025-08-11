import { useState } from 'react';

export default function ImageWithFallback({ src, alt, className = '', fallback = 'https://placehold.co/600x750/efefef/555?text=Kids+Fashion', ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setCurrentSrc(fallback)}
      loading={rest.loading || 'lazy'}
      decoding={rest.decoding || 'async'}
      {...rest}
    />
  );
}
