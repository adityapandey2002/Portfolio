'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './useToaster';

const WORDS: Record<string, string> = {
  aditya: '💚 Aditya Pandey detected. Hire this man.',
  data: '📊 Data is the new oil. Aditya is the refinery.',
  bihar: '🗺️ Muzaffarpur · 26.12° N · 85.36° E. Always.',
  asha: '👩‍⚕️ 700+ ASHA workers trained. Real impact.',
  hire: '🎉 Smart move. Press ⌘K → "Send me an email"',
  mavis: '👋 Mavis in the house. The model behind this site.',
  piramal: '🌱 Gandhi Fellow. Nation Builder. Piramal Foundation.',
  pyaar: '❤️ Insta-idha pyaar. Bihar ka swaad hi alag hai.',
};

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
];

/**
 * Typed-word easter eggs + Konami code.
 * Runs only on the home page (infinite mode), disabled in inputs.
 */
export function useEasterEggs({ infinite = false }: { infinite?: boolean }) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let typed = '';
    let timer: ReturnType<typeof setTimeout> | undefined;
    let konami = 0;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) return; // handled by palette

      // Konami
      if (e.key === KONAMI[konami]) {
        konami++;
        if (konami === KONAMI.length) {
          konami = 0;
          toast('🕹️ KONAMI! +30 aura', 'accent');
        }
      } else if (e.key === KONAMI[0]) {
        konami = 1;
      } else {
        konami = 0;
      }

      if (e.key === 'h' || e.key === 'H') {
        router.push('/health');
        return;
      }
      if (e.key === '1') router.push('/');
      if (e.key === '2') router.push('/work');
      if (e.key === '3') router.push('/ask');

      if (e.key.length === 1 && e.key.match(/[a-z0-9]/i)) {
        typed += e.key.toLowerCase();
        if (WORDS[typed]) {
          toast(WORDS[typed], 'primary');
          typed = '';
        }
        if (typed.length > 12) typed = typed.slice(-12);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          typed = '';
        }, 1600);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toast, router]);
}
