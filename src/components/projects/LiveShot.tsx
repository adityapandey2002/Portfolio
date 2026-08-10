'use client';

import { useState } from 'react';

const mshots = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=960`;

interface LiveShotProps {
  url: string;
  alt: string;
}

export function LiveShot({ url, alt }: LiveShotProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={mshots(url)}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top opacity-80 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
    />
  );
}
