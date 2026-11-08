'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Database,
  FlaskConical,
  Github,
  PackageCheck,
  Search,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { projects } from '@/lib/data/projects';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATS = [
  { value: '≤2.5s', label: 'LCP target', foot: 'mobile · field' },
  { value: '<0.01', label: 'CLS target', foot: 'no layout shift' },
  { value: '60s', label: 'Response cache', foot: 'in-memory' },
  { value: '30d', label: 'Immutable cache', foot: 'static assets' },
  { value: '11', label: 'MySQL indexes', foot: 'query-tuned' },
  { value: '29/29', label: 'E2E tests', foot: 'Playwright' },
  { value: '30 min', label: 'Order auto-expiry', foot: 'abandoned carts' },
  { value: '3', label: 'User roles', foot: 'customer / admin / support' },
] as const;

const PILLARS = [
  {
    icon: Zap,
    title: 'Performance & Core Web Vitals',
    body: 'Server-side image preloading, Brotli compression, 30-day immutable asset caching and a 60s in-memory response cache — targeting <strong>LCP ≤2.5s</strong>, <strong>CLS &lt;0.01</strong> and near-zero blocking time on mobile.',
    tags: ['Brotli', 'Immutable cache', 'LCP', 'CLS'],
  },
  {
    icon: Search,
    title: 'Server-side SEO & structured data',
    body: 'Per-route meta tags and <strong>JSON-LD</strong> (Product, Offer, BreadcrumbList, BlogPosting, Organization / OnlineStore) with a dynamic sitemap and 301 redirects so every product and article stays crawlable.',
    tags: ['JSON-LD', 'Sitemap', '301s', 'Schema.org'],
  },
  {
    icon: CreditCard,
    title: 'Payments that cannot be faked',
    body: 'Razorpay orders with <strong>HMAC SHA-256</strong> signature verification, server-side amount re-validation against the database before capture, webhook reconciliation for async events and 30-minute auto-expiry of abandoned orders.',
    tags: ['Razorpay', 'HMAC SHA-256', 'Webhooks'],
  },
  {
    icon: PackageCheck,
    title: 'Order lifecycle & fulfilment',
    body: 'Pending → processing → shipped → delivered, with <strong>variant-aware stock</strong> deductions, courier tracking hand-off and branded transactional emails at every state change.',
    tags: ['Variant stock', 'Courier tracking', 'Nodemailer'],
  },
  {
    icon: ShieldCheck,
    title: 'Auth, roles & security',
    body: 'JWT in <strong>httpOnly cookies</strong>, bcrypt password hashing, rate-limited login, role-based access for customer / admin / support, helmet CSP for gateways and XSS-sanitized emails.',
    tags: ['JWT', 'RBAC', 'Helmet CSP', 'Rate limiting'],
  },
  {
    icon: Database,
    title: 'Data layer & bulk ops',
    body: 'Sequelize over MySQL with <strong>11 composite indexes</strong> tuned from query plans, plus Excel bulk catalog uploads so the catalogue scales without one-by-one entry.',
    tags: ['MySQL', 'Sequelize', '11 indexes', 'Multer · Cloudinary'],
  },
  {
    icon: FlaskConical,
    title: 'Automated E2E QA',
    body: 'A Playwright end-to-end suite of <strong>29 tests</strong> covering search, product pages, cart, checkout, profile and auth flows — 29/29 green before every release.',
    tags: ['Playwright', '29 tests', 'CI-ready'],
  },
  {
    icon: Server,
    title: 'Deployment & infra',
    body: 'Hostinger VPS running Node under <strong>PM2 cluster mode</strong>, Dockerized services, Cloudinary media delivery and environment-separated configuration.',
    tags: ['PM2 cluster', 'Docker', 'Cloudinary', 'Hostinger'],
  },
] as const;

const FLOW = [
  { title: 'Browser', foot: 'React 18 · Redux Toolkit' },
  { title: 'Edge cache', foot: 'Brotli · 30d immutable' },
  { title: 'Node API', foot: 'Express · 60s cache' },
  { title: 'Services', foot: 'Razorpay · Courier · SMTP' },
  { title: 'MySQL', foot: 'Sequelize · 11 indexes' },
] as const;

export function BiharKaSwaadCase() {
  const project = projects.find((p) => p.id === 'biharkaswaad');
  const stack = project?.caseStudy.stack ?? '';

  return (
    <>
      {/* Hero */}
      <header className="mx-auto max-w-[1500px] px-5 pt-32 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{'/* CASE STUDY · FULL-STACK */'}</span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11.5px] font-semibold"
            style={{
              background: 'color-mix(in srgb, var(--primary) 12%, var(--bg-2) 85%)',
              color: 'var(--primary)',
              border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)',
            }}
          >
            <span className="blip h-1.5 w-1.5 rounded-full bg-primary" /> LIVE · PRODUCTION
          </span>
        </div>
        <h1 className="mt-3 max-w-[900px] font-serif text-[clamp(38px,5vw,64px)] leading-[1.05] tracking-tight">
          BiharKaSwaad — <span className="text-gradient">food from home, shipped like software</span>
        </h1>
        <p className="section-sub mt-3 max-w-[620px]">
          A production e-commerce platform for authentic Bihari food — catalog to courier, owned end-to-end.
          Real customers across India pay through it every day, so performance, SEO and payment integrity are not
          nice-to-haves.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project?.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-bg-2 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            Open live site <ArrowUpRight size={14} />
          </a>
          {project?.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-bg-2 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-ink"
            >
              <Github size={14} /> Source
            </a>
          )}
        </div>

        {/* Screenshots */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2">
              <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                <span className="ml-3 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-3">
                  biharkaswaad.in
                </span>
              </div>
              <img
                src="/work/biharkaswaad-desktop.png"
                alt="BiharKaSwaad storefront — desktop"
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="mx-auto h-full max-w-[280px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-bg-2 p-2.5">
              <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-[var(--line)]" aria-hidden />
              <img
                src="/work/biharkaswaad-mobile.png"
                alt="BiharKaSwaad storefront — mobile"
                loading="lazy"
                decoding="async"
                className="block w-full rounded-[1.5rem]"
              />
            </figure>
          </Reveal>
        </div>
      </header>

      {/* Stats band */}
      <section className="mx-auto mt-20 max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* BY THE NUMBERS */"
          title={
            <>
              Engineered to be <span className="text-gradient">measurable</span>
            </>
          }
          sub="Targets the platform is built and tuned against — Core Web Vitals, caching, query speed and test coverage."
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="group relative flex flex-col justify-between gap-6 p-6"
              style={{ background: 'var(--bg-2)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
            >
              <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-ink-3">{s.label}</span>
              <div>
                <div className="font-serif text-[clamp(30px,3vw,44px)] leading-none tracking-tight text-ink">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink-3">{s.foot}</div>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* What shipped */}
      <section className="mx-auto mt-24 max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* UNDER THE HOOD */"
          title={
            <>
              Eight systems <span className="text-gradient">behind the store</span>
            </>
          }
          sub="Every layer from the storefront to the payment webhook was designed, built and shipped solo."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              className="group flex flex-col rounded-2xl border border-[var(--line)] bg-bg-2/60 p-6 transition-colors duration-300 hover:border-primary/50"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <p.icon size={20} />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-ink-2" dangerouslySetInnerHTML={{ __html: p.body }} />
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--line-2)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Request flow */}
      <section className="mx-auto mt-24 max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* REQUEST PATH */"
          title={
            <>
              What happens when someone <span className="text-gradient">hits &ldquo;buy&rdquo;</span>
            </>
          }
          sub="From the browser to the database and back — caching and validation at every hop."
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {FLOW.map((f, i) => (
            <div key={f.title} className="flex flex-1 items-center gap-3">
              <motion.div
                className="flex-1 rounded-xl border border-[var(--line)] bg-bg-2 px-5 py-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1.5 text-[15px] font-semibold text-ink">{f.title}</div>
                <div className="mt-0.5 font-mono text-[11.5px] text-ink-3">{f.foot}</div>
              </motion.div>
              {i < FLOW.length - 1 && (
                <span className="hidden font-mono text-[15px] text-ink-4 lg:block" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stack + CTA */}
      <section className="mx-auto mt-24 max-w-[1500px] px-5 lg:px-10">
        <div className="rounded-2xl border border-[var(--line)] bg-bg-2/60 p-8 lg:p-10">
          <span className="eyebrow">{'/* STACK */'}</span>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stack.replace(/\.$/, '').split(' · ').map((t) => (
              <span
                key={t}
                className="rounded-sm border border-[var(--line)] bg-bg px-2.5 py-1.5 font-mono text-[12px] text-ink-2"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-dashed border-[var(--line-2)] pt-6">
            <a
              href={project?.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-bg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-ink"
            >
              Open live site <ArrowUpRight size={14} />
            </a>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-bg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-ink"
            >
              <ArrowDownLeft size={14} /> All work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
