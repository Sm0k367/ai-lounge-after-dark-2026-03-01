import { useEffect, useState } from 'react';

interface MediaLoaderOptions {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

export const useMediaLoader = (
  url: string | null,
  options: MediaLoaderOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!url) {
      setIsLoaded(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeout = options.timeout || 30000;
    let timeoutId: NodeJS.Timeout;

    const loadMedia = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Failed to load media: ${response.statusText}`);
        }

        setIsLoaded(true);
        options.onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    timeoutId = setTimeout(() => {
      if (isLoading) {
        const error = new Error('Media load timeout');
        setError(error);
        options.onError?.(error);
        setIsLoading(false);
      }
    }, timeout);

    loadMedia();

    return () => clearTimeout(timeoutId);
  }, [url, options]);

  return { isLoading, error, isLoaded };
};

// Lazy load images
export const useLazyImage = (src: string | null) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(new Error('Failed to load image'));
      setIsLoading(false);
    };

    img.src = src;
  }, [src]);

  return { imageSrc, isLoading, error };
};

// Preload multiple media files
export const useMediaPreload = (urls: string[]) => {
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Map<string, Error>>(new Map());

  useEffect(() => {
    if (urls.length === 0) return;

    setIsLoading(true);
    const newErrors = new Map<string, Error>();
    let loadedCount = 0;

    urls.forEach((url) => {
      if (loadedUrls.has(url)) {
        loadedCount++;
        return;
      }

      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadedUrls((prev) => new Set([...prev, url]));
        if (loadedCount === urls.length) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        newErrors.set(url, new Error(`Failed to load: ${url}`));
        loadedCount++;
        if (loadedCount === urls.length) {
          setIsLoading(false);
          setErrors(newErrors);
        }
      };

      img.src = url;
    });
  }, [urls, loadedUrls]);

  return {
    loadedUrls,
    isLoading,
    errors,
    progress: (loadedUrls.size / urls.length) * 100,
  };
};
