import React, { useState, useCallback, useEffect } from 'react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

// Resolve asset paths respecting Vite's base URL. This prevents broken
// references when the app is served from a subdirectory.
const resolveAsset = (path: string | undefined) => {
  if (!path) return undefined;
  if (/^(https?:|data:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith(base)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/anime/static/buildy-static.png',
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...rest
}) => {
  const resolvedSrc = resolveAsset(src as string | undefined);
  const resolvedFallback = resolveAsset(fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(resolvedSrc);
  const [hasFailed, setHasFailed] = useState(false);

  // Debug logging for image loading
  useEffect(() => {
    if (resolvedSrc) {
      console.log('SafeImage attempting to load:', resolvedSrc);
    }
    setCurrentSrc(resolvedSrc);
    setHasFailed(false);
  }, [resolvedSrc]);

  const handleError = useCallback<React.ReactEventHandler<HTMLImageElement>>(
    (e) => {
      if (!hasFailed) {
        setHasFailed(true);
        setCurrentSrc(resolvedFallback);
        console.error('SafeImage failed to load:', src, '→ falling back to:', resolvedFallback);
      }
      onError?.(e);
    },
    [resolvedFallback, hasFailed, onError, src]
  );

  return (
    <img
      src={currentSrc}
      alt={alt || 'Image'}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...rest}
    />
  );
};

export default SafeImage;
