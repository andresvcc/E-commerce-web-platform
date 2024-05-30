/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Sizes } from './table.types';

export const useScreenSize = (): string => {
  const [size, setSize] = useState<string>('');

  const sizes: Sizes = {
    xs: { max: 319 },
    sm: { min: 320, max: 767 },
    md: { min: 768, max: 1023 },
    lg: { min: 1024, max: 1439 },
    xl: { min: 1440 },
  };

  useEffect(() => {
    const updateSize = () => {
      Object.entries(sizes).forEach(([key, size]) => {
        const mediaQuery = `(min-width: ${size.min || 0}px) and (max-width: ${size.max || Infinity}px)`;

        if (window.matchMedia(mediaQuery).matches) {
          setSize(key);
        }
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};
