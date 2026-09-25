'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type CmdFn = (args: string[]) => void;

export function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ html: string; input?: boolean }[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const startedRef = useRef(false);

  const print = (html: string, input = false) => setLines((prev) => [...prev, { html, input }]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setLines([
      { html: '<span class="t-cmt"># Welcome to Aditya\'s portfolio shell</span>' },
      { html: '<span class="t-cmt"># Type "help" to see available commands.</span>' },
      { html: '' },
    ]);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const commands: Record<string, CmdFn> = {
    help: () => {
      print('<span class="t-cmt">Available commands:</span>');
      for (const [name, desc] of Object.entries({
        help: 'show this list',
        about: 'who is Aditya',
        projects: 'open projects showcase',
        skills: 'list skills',
        experience: 'show experience',
        resume: 'download resume',
        ask: 'ask the AI anything about me',
        contact: 'contact info',
        hire: 'get in touch',
        theme: 'look & feel locked per route',
        health: 'open the health dashboard',
        whoami: 'who are you',
        coffee: '☕',
        ls: 'list sections',
        date: 'current date',
        sudo: 'try it',
        clear: 'clear screen',
      })) {
        print(`  <span class="t-fn">${name}</span>${' '.repeat(Math.max(1, 12 - name.length))}<span class="t-cmt">${desc}</span>`);
      }
    },
    about: () =>
      print('<span class="t-out">Aditya Pandey · Gandhi Fellow · Data Analyst · Full-Stack · Bihar, India.</span>'),
    projects: () => {
      print('<span class="t-cmt">Opening the work showcase…</span>');
      router.push('/work');
    },
    ask: () => {
      print('<span class="t-cmt">Opening the AI…</span>');
      router.push('/ask');
    },
    skills: () => print('<span class="t-out">Python · SQL · Pandas · MERN · ODK · Nginx · PM2 · Git · AI Tools</span>'),
    experience: () => {
      print('  · Gandhi Fellow · Piramal Foundation <span class="t-cmt">(Jul 2025 – Present)</span>');
      print('  · BiharKaSwaad · Full-Stack Dev <span class="t-cmt">(Jul 2025 – Present)</span>');
      print('  · Prodigy InfoTech · Intern <span class="t-cmt">(Jun – Jul 2025)</span>');
    },
    resume: () => {
      print('<span class="t-str">⚠ No PDF hosted yet — ping me on email and I\'ll send one.</span>');
    },
    contact: () => print('<span class="t-out">adityapandey.adu@gmail.com  ·  +91 8601862114</span>'),
    hire: () => {
      print('<span class="t-str">✓ Opening contact form…</span>');
      router.push('/#contact');
    },
    theme: () => {
      print('<span class="t-out">→ Look & feel is locked per route — no manual switching.</span>');
      print('<span class="t-cmt">  Type "health" to open the clinical health dashboard.</span>');
    },
    health: () => {
      print('<span class="t-cmt">Opening the health dashboard…</span>');
      router.push('/health');
    },
    whoami: () => print('<span class="t-out">guest@portfolio · welcome.</span>'),
    coffee: () => print('<span class="t-str">☕ Brewing a fresh cup… here you go.</span>'),
    clear: () => {
      setLines([]);
    },
    ls: () => ['about', 'experience', 'skills', 'projects', 'education', 'ai', 'contact'].forEach((s) => print(`  ${s}`)),
    date: () => print(new Date().toString()),
    sudo: () => print('<span class="t-str">Nice try. Permission denied: nice-guys-finish-last.</span>'),
    echo: (args) => print(args.join(' ')),
  };

  const run = (raw: string) => {
    const [name, ...rest] = raw.trim().split(/\s+/);
    const cmd = (name || '').toLowerCase();
    setHistory((h) => [...h, raw]);
    print(raw, true);
    if (!cmd) return;
    if (commands[cmd]) commands[cmd](rest);
    else print(`<span class="t-str">command not found: ${cmd}</span>  <span class="t-cmt">(try 'help')</span>`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = inputRef.current!.value;
      inputRef.current!.value = '';
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const last = history[history.length - 1];
      if (last) inputRef.current!.value = last;
    }
  };

  return (
    <div className="terminal-window overflow-hidden rounded-md border" data-no-burst>
      <div className="flex items-center gap-1.5 border-b border-black/40 bg-[#0f0d09] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="ml-2.5 font-mono text-[11.5px] text-[#e8e0c8]">aditya@portfolio:~$</span>
        <span className="ml-auto hidden font-mono text-[10.5px] text-[#6b6350] sm:block">try: help · projects · hire · ask</span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="terminal-body max-h-[min(320px,38vh)] min-h-[clamp(200px,26vh,280px)] cursor-text px-5 py-4 font-mono text-[12.5px] leading-7 text-[#e8e0c8]"
      >
        {lines.map((l, i) =>
          l.input ? (
            <div key={i} className="term-line">
              <span className="t-prompt">aditya@portfolio:~$</span> <span className="t-input">{l.html}</span>
            </div>
          ) : (
            <div key={i} className="term-line" dangerouslySetInnerHTML={{ __html: l.html }} />
          ),
        )}
        <div className="term-prompt-line flex items-center gap-2">
          <span className="t-prompt shrink-0">aditya@portfolio:~$</span>
          <input
            ref={inputRef}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent font-mono text-[12.5px] text-ink caret-primary outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
