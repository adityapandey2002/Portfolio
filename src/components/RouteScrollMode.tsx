'use client';

import { useEffect } from 'react';

export function RouteScrollMode() {
  useEffect(() => {
    document.documentElement.dataset.scroll = 'health';
    return () => {
      delete document.documentElement.dataset.scroll;
    };
  }, []);

  return null;
}