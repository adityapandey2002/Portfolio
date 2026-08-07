'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

interface Toast {
  id: number;
  text: string;
  tone: 'primary' | 'accent' | 'rose';
}

interface ToasterValue {
  toast: (text: string, tone?: Toast['tone']) => void;
}

const ToasterContext = createContext<ToasterValue>({ toast: () => {} });

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((text: string, tone: Toast['tone'] = 'primary') => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, text, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToasterContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed left-1/2 top-20 z-[400] flex w-full max-w-[min(92vw,560px)] -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast show"
            style={{ borderColor: t.tone === 'primary' ? 'var(--primary)' : t.tone === 'accent' ? 'var(--accent)' : 'var(--rose)', color: t.tone === 'primary' ? 'var(--primary)' : t.tone === 'accent' ? 'var(--accent)' : 'var(--rose)' }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToast() {
  return useContext(ToasterContext);
}
