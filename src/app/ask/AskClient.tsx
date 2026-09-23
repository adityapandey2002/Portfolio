'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { ArrowUp, Bot, RotateCcw, Sparkles, Square, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
  'What did Aditya build in Bihar?',
  'What is he working on right now?',
  'Tell me about the M-ASHA training.',
  'How did he deploy BiharKaSwaad?',
];

const WELCOME =
  'Hi, I\'m the portfolio assistant — a RAG chat over Aditya\'s actual experience, projects and skills. Ask me anything.';

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

export function AskClient() {
  const { messages, input, handleInputChange, handleSubmit, status, error, stop, append, setMessages } = useChat({
    api: '/api/chat',
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  const streaming = status === 'submitted' || status === 'streaming';

  const messageText = (m: (typeof messages)[number]): string => {
    if (m.content && typeof m.content === 'string') return m.content;
    const parts = m.parts ?? [];
    return parts
      .filter((p) => p.type === 'text')
      .map((p) => 'text' in p ? p.text : '')
      .join(' ');
  };

  const onCopy = (text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <section className="relative flex min-h-dvh flex-col pt-28">
      <div className="mx-auto flex w-full max-w-[900px] flex-1 flex-col px-5 pb-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">{'/* ASK */'}</span>
          <h1 className="mt-3 font-serif text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-tight">
            Ask Aditya&apos;s <span className="text-gradient">RAG brain</span>
          </h1>
          <p className="section-sub mt-3 max-w-[560px]">
            Answers are grounded in the knowledge base — resume, projects, field work — and streamed word by word via Groq. Try one below.
          </p>
        </motion.div>

        <div ref={scrollRef} className="chat-scroll mt-8 flex-1 space-y-5 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-3"
            >
              <span className="msg-avatar bg-primary/15 text-primary">
                <Bot size={16} />
              </span>
              <div className="chat-bubble">
                <Rich text={WELCOME} />
              </div>
            </motion.div>
          )}

          {messages.map((m) => {
            const isUser = m.role === 'user';
            const text = messageText(m);
            if (!text && !streaming) return null;
            return (
              <div key={m.id} className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
                <span
                  className={cn(
                    'msg-avatar shrink-0',
                    isUser ? 'bg-accent/15 text-accent' : 'bg-primary/15 text-primary',
                  )}
                >
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </span>
                <div
                  className={cn(
                    'chat-bubble group relative whitespace-pre-wrap text-[14px] leading-relaxed text-ink-2',
                    isUser ? 'bg-bg-3' : 'bg-bg-2',
                    text === WELCOME && 'opacity-70',
                  )}
                >
                  <Rich text={text} />
                  {!isUser && !streaming && m.id === messages[messages.length - 1]?.id && (
                    <button
                      onClick={() => onCopy(text)}
                      className="absolute -right-2 -top-2 hidden h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-bg-2 text-[9px] text-ink-3 shadow group-hover:flex"
                      aria-label="Copy response"
                    >
                      {copied ? '✓' : '⧉'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {streaming && (
            <div className="flex gap-3">
              <span className="msg-avatar bg-primary/15 text-primary">
                <Bot size={16} />
              </span>
              <div className="flex items-center gap-2 px-1 py-2">
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-[var(--rose)]/40 bg-rose/5 px-4 py-3 font-mono text-[12px] text-rose">
              {error.message || 'Something went wrong.'}
            </div>
          )}
        </div>

        <div className="mt-6">
          {messages.length === 0 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 md:flex-wrap">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => append({ role: 'user', content: s })}
                  className="shrink-0 rounded-full border border-[var(--line)] bg-bg-2/70 px-4 py-2 text-left text-[12.5px] text-ink-2 transition-colors hover:border-primary/50 hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="sticky bottom-[calc(var(--nav-h)+var(--safe-bottom)+12px)] z-10 flex items-end gap-2 rounded-2xl border border-[var(--line)] bg-bg-2/80 p-2 backdrop-blur focus-within:border-primary/50 md:static"
          >
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  (e.target as HTMLFormElement).form?.requestSubmit();
                }
              }}
              rows={1}
              placeholder="Ask about his work, skills, projects…"
              className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-4"
            />
            {streaming ? (
              <button
                type="button"
                onClick={stop}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] text-ink-3 hover:text-ink"
                aria-label="Stop generating"
              >
                <Square size={15} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl p-0 disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp size={17} />
              </button>
            )}
          </form>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-[10px] text-ink-4">
              pgvector + Groq 70B · grounded in the knowledge base · no training on your input
            </p>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-ink-3 hover:text-ink"
              >
                <RotateCcw size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
