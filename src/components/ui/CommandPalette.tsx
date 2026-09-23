'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, ExternalLink, Github, HeartPulse, Home, Linkedin, Mail, Search, Send, Sparkles,
} from 'lucide-react';
import { profile } from '@/lib/data/profile';

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} });

export function usePalette() {
  return useContext(PaletteContext);
}

type Item = {
  section: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  kbd?: string;
  action: () => void;
};

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setQuery('');
    setIdx(0);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 40);
  }, [isOpen]);

  const items: Item[] = [
    { section: 'Navigate', name: 'Home', desc: 'The cinematic landing', icon: Home, kbd: '1', action: () => router.push('/') },
    { section: 'Navigate', name: 'Work', desc: 'Projects showcase', icon: Box, kbd: '2', action: () => router.push('/work') },
    { section: 'Navigate', name: 'Ask AI', desc: 'Chat with Aditya — RAG', icon: Sparkles, kbd: '3', action: () => router.push('/ask') },
    { section: 'Navigate', name: 'Health dashboard', desc: 'Fellowship vitals · live field data', icon: HeartPulse, kbd: '4', action: () => router.push('/health') },
    { section: 'Navigate', name: 'Contact', desc: 'Get in touch', icon: Mail, kbd: 'C', action: () => router.push('/#contact') },
    { section: 'Actions', name: 'Send an email', desc: 'Open your mail client', icon: Send, action: () => (window.location.href = `mailto:${profile.emails.personal}?subject=Portfolio inquiry`) },
    { section: 'Actions', name: 'View BiharKaSwaad', desc: 'Open the live e-commerce site', icon: ExternalLink, action: () => window.open(profile.liveSite, '_blank') },
    { section: 'Actions', name: 'GitHub', desc: profile.github, icon: Github, action: () => window.open(profile.github, '_blank') },
    { section: 'Actions', name: 'LinkedIn', desc: profile.linkedin, icon: Linkedin, action: () => window.open(profile.linkedin, '_blank') },
  ];

  const filtered = query.trim()
    ? items.filter((i) => (i.name + ' ' + i.desc).toLowerCase().includes(query.toLowerCase()))
    : items;

  useEffect(() => setIdx(0), [query]);

  const run = (item: Item) => {
    close();
    item.action();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[idx]) run(filtered[idx]);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector('.active')?.scrollIntoView({ block: 'nearest' });
  }, [idx]);

  return (
    <PaletteContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[250] flex items-end justify-center bg-bg/60 p-4 backdrop-blur-md md:items-start md:pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="w-[min(640px,94vw)] overflow-hidden rounded-t-2xl border border-[var(--line)] bg-bg-2 shadow-2xl md:w-[min(640px,94vw)] md:rounded-2xl"
              style={{ paddingBottom: 'var(--safe-bottom)' }}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="mx-auto mt-2.5 mb-1 block h-1 w-10 rounded-full bg-[var(--line)] md:hidden" aria-hidden />
              <div className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4">
                <Search size={16} className="shrink-0 text-ink-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-4"
                />
                <span className="rounded border border-[var(--line)] bg-bg px-1.5 py-0.5 font-mono text-[11px] text-ink-3">ESC</span>
              </div>
              <div ref={listRef} className="max-h-[360px] overflow-y-auto p-2">
                {filtered.length === 0 && <div className="px-4 py-10 text-center text-[13px] text-ink-3">No matches. Try a different keyword.</div>}
                {filtered.map((item, i) => {
                  const showSection = i === 0 || filtered[i - 1].section !== item.section;
                  const Icon = item.icon;
                  return (
                    <div key={item.name}>
                      {showSection && (
                        <div className="px-3 pb-1 pt-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-4">{item.section}</div>
                      )}
                      <button
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${i === idx ? 'active bg-[var(--line-2)]' : ''}`}
                        onMouseEnter={() => setIdx(i)}
                        onClick={() => run(item)}
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg text-primary">
                          <Icon size={15} />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-ink">{item.name}</span>
                          <span className="block text-xs text-ink-3">{item.desc}</span>
                        </span>
                        {item.kbd && <span className="font-mono text-[11px] text-ink-3">{item.kbd}</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-[var(--line)] px-5 py-2.5 font-mono text-[10.5px] text-ink-4">
                ↑↓ navigate · Enter select · ⌘K toggle
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}
