'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Bot, RotateCcw, Send, Sparkles, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePreloader } from './Preloader';

const SUGGESTIONS = [
  'What has Aditya been working on recently?',
  'Tell me about his field work in Bihar.',
  'What can he build for me?',
  'How do I contact him?',
];

const WELCOME =
  'Hi, I\'m the portfolio assistant — I answer in plain language about Aditya\'s experience, projects and skills. Try a simple question below, or click a suggestion.';

function Rich({ text }: { text: string }) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const parts = escaped.split(/(\*\*[^*]+\*\*|`[^`]+`|\n+)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith('`') && p.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-bg-3 px-1.5 py-0.5 font-mono text-[12px] text-primary">
              {p.slice(1, -1)}
            </code>
          );
        }
        if (/^\n+$/.test(p)) {
          return <span key={i} className="block h-2.5" />;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function AiAssistant() {
  const pathname = usePathname();
  const { done } = usePreloader();
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status, error, stop, append, setMessages } =
    useChat({ api: '/api/chat' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const onAsk = pathname === '/ask';

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status, open]);

  const streaming = status === 'submitted' || status === 'streaming';

  const messageText = (m: (typeof messages)[number]): string => {
    if (m.content && typeof m.content === 'string') return m.content;
    const parts = m.parts ?? [];
    return parts
      .filter((p) => p.type === 'text')
      .map((p) => ('text' in p ? p.text : ''))
      .join(' ');
  };

  if (onAsk) return null;

  return (
    <>
      {/* Launcher toggle */}
      <motion.button
        type="button"
        aria-label={open ? 'Close the assistant' : 'Open the assistant'}
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 z-[400] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-primary/40 bg-bg-2 text-primary shadow-[0_16px_40px_-12px_var(--primary-glow)] transition-transform hover:scale-105 md:right-6"
        style={{
          bottom: 'calc(var(--safe-bottom) + 84px)',
        }}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={done && !open ? { opacity: 1, y: 0, scale: 1 } : open ? { opacity: 1, y: 0, scale: 0.92 } : { opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'bot'}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {open ? <X size={20} /> : <Bot size={22} />}
          </motion.span>
        </AnimatePresence>
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="blip absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full border border-bg bg-primary" />
        </span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[400] flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
            style={{
              width: 'min(400px, calc(100vw - 32px))',
              top: 0,
              bottom: 0,
              right: 16,
              paddingTop: 'var(--safe-top)',
              paddingBottom: 'var(--safe-bottom)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.94, pointerEvents: 'none' }}
            animate={{ opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }}
            exit={{ opacity: 0, y: 24, scale: 0.94, pointerEvents: 'none' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Sparkles size={15} />
                </span>
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink">Ask about Aditya</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-4">plain questions · plain answers</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-ink-3 hover:text-ink"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* body */}
            <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <div className="flex gap-2.5">
                <span className="msg-avatar shrink-0 bg-primary/15 text-primary">
                  <Bot size={15} />
                </span>
                <div className="chat-bubble text-[13px] leading-relaxed text-ink-2 opacity-80">
                  <Rich text={WELCOME} />
                </div>
              </div>

              {messages.map((m) => {
                const isUser = m.role === 'user';
                const text = messageText(m);
                if (!text && !streaming) return null;
                return (
                  <div key={m.id} className={cn('flex gap-2.5', isUser && 'flex-row-reverse')}>
                    <span className={cn('msg-avatar shrink-0', isUser ? 'bg-accent/15 text-accent' : 'bg-primary/15 text-primary')}>
                      {isUser ? 'You' : <Bot size={15} />}
                    </span>
                    <div className={cn('chat-bubble whitespace-pre-wrap text-[13px] leading-relaxed text-ink-2', isUser ? 'bg-bg-3' : 'bg-bg-2')}>
                      <Rich text={text} />
                    </div>
                  </div>
                );
              })}

              {streaming && (
                <div className="flex gap-2.5">
                  <span className="msg-avatar bg-primary/15 text-primary">
                    <Bot size={15} />
                  </span>
                  <div className="flex items-center gap-1.5 px-1 py-2">
                    <span className="typing-dot" />
                    <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                    <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-rose/40 bg-rose/5 px-3 py-2 font-mono text-[11px] text-rose">
                  {error.message || 'Something went wrong.'}
                </div>
              )}
            </div>

            {/* suggestions */}
            {messages.length === 0 && (
              <div className="flex gap-1.5 overflow-x-auto border-t border-[var(--line)] px-3 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => append({ role: 'user', content: s })}
                    className="shrink-0 rounded-full border border-[var(--line)] bg-bg-2/70 px-3 py-1.5 text-[11.5px] text-ink-2 transition-colors hover:border-primary/50 hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 border-t border-[var(--line)] bg-bg-2/80 p-3"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a simple question…"
                className="min-w-0 flex-1 border border-[var(--line-2)] bg-bg-3 px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-ink-4 focus:border-primary/50"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={stop}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-ink-3 hover:text-ink"
                  aria-label="Stop"
                >
                  <Square size={14} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="btn-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-0 disabled:opacity-40"
                  aria-label="Send"
                >
                  {input.trim() ? <ArrowUp size={16} /> : <Send size={16} />}
                </button>
              )}
            </form>

            <div className="flex items-center justify-between px-4 pb-2.5 pt-1">
              <p className="font-mono text-[9px] text-ink-4">pgvector + Groq · grounded in the knowledge base</p>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-ink-3 hover:text-ink"
                >
                  <RotateCcw size={11} /> Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}