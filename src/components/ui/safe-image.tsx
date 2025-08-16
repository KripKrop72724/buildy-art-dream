import React, { useState, useCallback } from 'react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/anime/static/buildy-static.png',
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src as string | undefined);
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = useCallback<React.ReactEventHandler<HTMLImageElement>>(
    (e) => {
      if (!hasFailed) {
        setHasFailed(true);
        setCurrentSrc(fallbackSrc);
        console.warn('SafeImage: falling back for', src);
      }
      onError?.(e);
    },
    [fallbackSrc, hasFailed, onError, src]
  );

  return (
    <img
      src={currentSrc}
      alt={alt || 'Image'}
      loading={loading}
      decoding={decoding as any}
      onError={handleError}
      {...rest}
    />
  );
};

export default SafeImage;
