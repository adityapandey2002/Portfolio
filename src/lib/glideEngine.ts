/* Owns every scripted scroll on `/` and `/health`.
 *
 * The old controller called `window.scrollTo({ behavior: 'smooth' })` once per
 * gesture. Chromium sizes that animation from the square root of the distance,
 * so a 210px hop and an 1807px hop on the same page run at roughly 875px/s and
 * 2580px/s — a 3x swing the user experiences as "sometimes it creeps, sometimes
 * it rockets". Re-issuing it mid-flight cancels the running curve, and the four
 * independent time gates (COOLDOWN / REPEAT / GESTURE_END / a full-viewport
 * accumulator) meant a slow trackpad drag could produce no motion at all until
 * the finger lifted.
 *
 * This module replaces that with one rAF integrator:
 *
 *   - `mode: 'step'` — a wheel notch or a key press enqueues the next stop.
 *     No cooldown: one notch is one explicit intent.
 *   - `mode: 'track'` — a continuous (trackpad) stream is applied 1:1 on the
 *     next frame, so the page moves with the finger from the first delta.
 *     ~110ms after the last delta it settles onto a stop.
 *   - `mode: 'glide'` — a critically damped spring drives `pos` to `target`.
 *     Settle is a fixed multiple of `1 / OMEGA` regardless of distance, so
 *     every hop paces identically, and retargeting is velocity-continuous by
 *     construction: there is no browser curve to cancel, so intent is never
 *     dropped.
 *
 * Stop positions are plain data, scanned once and cached, never read inside a
 * wheel handler. The pinned WHO deck is not a special case: it contributes one
 * stop per card, so stepping through the deck is the same code path as stepping
 * through the rest of the page. */

const OMEGA = 24; // rad/s — settle is ~9/OMEGA for any distance
const VEL_MAX = 30000; // px/s, safety bound; a queued hop never reaches it
const NOISE = 8; // deltas below this are trackpad jitter
const MIN_NOTCH = 40; // integer deltas at or above this are a wheel notch
const QUIET = 110; // ms of silence that ends a continuous gesture
const EPS = 8; // px past a stop required before the next one counts
const QUEUE_SCREENS = 2; // how far ahead of the viewport a stop may be queued
const MAGNET_NEAR = 0.4; // viewport ratio: settle to the nearest stop
const MAGNET_FAR = 0.75; // viewport ratio: or reach forward to the next one
const STALE = 0.15; // s — a frame gap longer than this advances at most this much

type Mode = 'idle' | 'track' | 'glide';

const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
const vh = () => window.innerHeight;
const docMax = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
/* Everything above and below is document pixels — the unit `scrollTo`,
   `scrollY` and every `getBoundingClientRect()` here agree on. `offsetHeight`
   is not one: under `html { zoom }` it reports layout pixels (1125 for a
   900px band), so any measurement that comes back in it has to be scaled back
   before it can be compared with `window.innerHeight` or added to a position. */
const screenScale = () => {
  const z = parseFloat(getComputedStyle(document.documentElement).zoom);
  return Number.isFinite(z) && z > 0 ? z : 1;
};

let stops: number[] = [];

let mode: Mode = 'idle';
let pos = 0;
let vel = 0; // px/s
let target: number | null = null;
let pending = 0; // px of not-yet-applied trackpad delta
let lastDir: 1 | -1 = 1;
let lastFeed = -Infinity;
let lastMove = -Infinity;
let kind: 'step' | 'track' = 'step';
let raf = 0;
let lastT = 0;
let written = Number.NaN;
let quietTimer = 0;
let obs: ResizeObserver | null = null;

/* ── stop model ─────────────────────────────────────────────────────────── */

/* Positions the page may come to rest on, in document order: every full-page
   panel plus every chapter inside #pillars. Chapters are content-sized, and
   so is the Experience panel (`.snap-section--tall`) — a fixed one-screen hop
   used to drop the viewport in the void between them, or clear an entire
   timeline in a single notch, leaving headings cut off at the top and every
   role in the middle unreachable by wheel. A chapter hosting the pinned WHO
   deck contributes one stop per card across its sticky travel, so arrival
   hands straight over to the deck and each notch advances exactly one card
   instead of freezing the document for six gestures and then jumping. */
function scan() {
  const nav =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
  const stickyTop = (nav - 6) * screenScale(); // matches PillarsOfWork's sticky offset
  const out: number[] = [];

  document.querySelectorAll<HTMLElement>('.snap-section').forEach((el) => {
    const start = top(el);
    out.push(start);
    /* A panel that sizes to its content (the Experience timeline) is read by
       scrolling through it, so it needs a stop inside — otherwise the next
       stop is the following panel's top and one notch clears the whole thing,
       leaving every role in the middle unreachable by wheel. Stops are spaced
       evenly so no segment exceeds one screen; a fixed-height panel never
       clears the threshold and keeps exactly the one stop it had before.
       The height has to be read in document pixels: `offsetHeight` under
       `html { zoom }` comes back in layout pixels and would clear the
       threshold on every panel, handing each one an extra stop at its
       midpoint — one screen, two notches. */
    const h = el.getBoundingClientRect().height;
    const vh = window.innerHeight;
    if (h > vh * 1.05) {
      const n = Math.max(1, Math.ceil(h / vh) - 1);
      for (let i = 1; i <= n; i += 1) out.push(start + (i * h) / (n + 1));
    }
  });
  document.querySelectorAll<HTMLElement>('#pillars [data-chapter]').forEach((el) => {
    const pin = el.querySelector<HTMLElement>('[data-chapter-pin]');
    if (!pin) {
      out.push(top(el));
      return;
    }
    const count = Math.max(2, parseInt(pin.dataset.chapterPinCount || '2', 10) || 2);
    const sticky = pin.firstElementChild as HTMLElement | null;
    const start = top(pin) - stickyTop;
    /* Rect heights, not `offsetHeight` — `start` above is a document position,
       and the layout-pixel travel `offsetHeight` yields would place the last
       card a quarter of the deck past where it actually pins. */
    const travel = sticky
      ? pin.getBoundingClientRect().height - sticky.getBoundingClientRect().height
      : 0;
    if (travel > 40) {
      for (let i = 0; i < count; i += 1) out.push(start + (i * travel) / (count - 1));
    } else {
      out.push(start);
    }
  });

  out.sort((a, b) => a - b);
  stops = out.filter((v, i) => i === 0 || v - out[i - 1] > 1);
}

function nextStop(base: number, dir: 1 | -1): number | null {
  if (dir === 1) {
    for (const t of stops) if (t > base + EPS) return t;
    const max = docMax(); // past the last panel: reveal the footer
    return base < max - 1 ? max : null;
  }
  for (let i = stops.length - 1; i >= 0; i -= 1) if (stops[i] < base - EPS) return stops[i];
  return null;
}

function nearestStop(y: number): number | null {
  let best: number | null = null;
  for (const t of stops) {
    if (best === null || Math.abs(t - y) < Math.abs(best - y)) best = t;
  }
  return best;
}

/* ── transport ──────────────────────────────────────────────────────────── */

function write(y: number) {
  pos = y;
  const r = Math.round(y);
  if (r !== written) {
    written = r;
    window.scrollTo(0, r);
  }
}

function stopRaf() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}

/* Begin a run: stamp the clock here, at input time, so the first dt covers
   only the wait for the next frame. `frame` must never re-stamp it — reading
   performance.now() at the *end* of a frame would fold the frame's own work
   into the clock and run the spring up to 1.5x slower than wall time, which is
   what made every hop feel like it crawled to a halt. */
function startRaf() {
  if (raf) return;
  lastT = performance.now();
  raf = requestAnimationFrame(frame);
}

/* Keep an already-running run going, leaving lastT alone. */
function cont() {
  if (!raf) raf = requestAnimationFrame(frame);
}

function finish(t: number) {
  write(t);
  vel = 0;
  target = null;
  mode = 'idle';
  stopRaf();
}

function frame(now: number) {
  raf = 0;
  const raw = (now - lastT) / 1000;
  lastT = now;
  /* Cap the step rather than zero it. A frame that took 200ms really did take
     200ms: throwing that time away (the old behaviour) made the settle crawl
     whenever the page got heavy — one slow frame at omega 24 stretched a 380ms
     hop past 1.4s. Clipping at STALE still bounds how far a throttled
     background tab can move in a single frame, so a hidden glide catches up
     over a frame or two instead of teleporting, and never loses time. */
  const dt = Math.min(Math.max(0.001, raw), STALE);

  if (mode === 'track') {
    if (pending !== 0) {
      const prev = pos;
      pos = Math.min(Math.max(0, pos + pending), docMax());
      pending = 0;
      vel = Math.max(-VEL_MAX, Math.min(VEL_MAX, (pos - prev) / dt));
      lastMove = now;
      write(pos);
    }
    // Settle a beat after the last delta: short enough not to read as a pause,
    // long enough that a slowly moving finger is never fought over.
    if (now - lastMove >= QUIET) {
      const carried = Math.abs(vel) > 400 ? vel : 0;
      vel = 0;
      settle(carried);
      return;
    }
    cont();
    return;
  }

  const t = target;
  if (t === null) {
    mode = 'idle';
    vel = 0;
    stopRaf();
    return;
  }

  /* Exact closed-form step of the critically damped spring
     e(t) = (e + (e' + w*e) t) e^(-wt),  e = target - pos, e' = -vel.
     Forward Euler needs w*dt < 1 to stay stable — a 45ms frame already breaks
     that at w = 24 — and it sheds time on every slow frame, which is what made
     the settle stretch from 500ms to 750ms as the page got heavier. This form
     is stable at any dt, so duration is a property of omega alone. */
  const e = t - pos;
  const b = -vel + OMEGA * e;
  const decay = Math.exp(-OMEGA * dt);
  const swung = e + b * dt;
  const e1 = swung * decay;
  const ed1 = (b - OMEGA * swung) * decay;
  // Crossed the target, or close enough to land: no sub-pixel crawl, no tail.
  if (e * e1 <= 0 || Math.abs(e1) < 1) {
    finish(t);
    return;
  }
  vel = Math.max(-VEL_MAX, Math.min(VEL_MAX, -ed1));
  write(t - e1);
  cont();
}

/* ── intent ─────────────────────────────────────────────────────────────── */

function magnet(carried: number) {
  if (!stops.length) return;
  const range = vh();
  const near = nearestStop(pos);
  let t: number | null = null;
  if (near !== null && Math.abs(near - pos) <= MAGNET_NEAR * range) t = near;
  if (t === null) {
    const ahead = nextStop(pos, lastDir);
    if (ahead !== null && Math.abs(ahead - pos) <= MAGNET_FAR * range) t = ahead;
  }
  if (t === null) return; // too far from anything: leave it where it lies
  target = Math.min(Math.max(0, t), docMax());
  const dist = Math.abs(target - pos);
  if (dist < 1) {
    finish(target);
    return;
  }
  // Carry the flick, but only as much as the remaining distance can absorb:
  // a full trackpad velocity aimed at a stop 90px away would sail past it and
  // bounce back. Cap at what a spring braking at omega^2 * dist can still stop.
  const want = Math.sign(target - pos);
  const along = Math.sign(carried) === want ? Math.abs(carried) : 0;
  vel = Math.min(along, OMEGA * dist) * want;
  mode = 'glide';
  startRaf();
}

function settle(carried: number) {
  mode = 'idle';
  magnet(carried);
}

function clearQuiet() {
  if (quietTimer) {
    clearTimeout(quietTimer);
    quietTimer = 0;
  }
}

function step(dir: 1 | -1) {
  if (!stops.length) return false;
  // Chain from the stop already queued so a held wheel glides panel to panel.
  // With a spring for a transport this is safe: retargeting is continuous, so
  // the queue drains onto a real stop instead of hopping over one.
  const base = mode === 'glide' && target !== null ? target : pos;
  const t = nextStop(base, dir);
  if (t === null) return false;
  if (Math.abs(t - pos) > QUEUE_SCREENS * vh()) return false; // let it catch up
  lastDir = dir;
  clearQuiet();
  target = Math.min(Math.max(0, t), docMax());
  mode = 'glide';
  startRaf();
  return true;
}

/* ── public surface ─────────────────────────────────────────────────────── */

export const glide = {
  /* Replaces the cached stop list. Cheap enough to call on mount, on route
     change and on a debounced resize — never from an input handler. */
  rescan() {
    scan();
    if (!obs && typeof ResizeObserver !== 'undefined') {
      // Content that grows or shrinks (live data, accordion copy) moves every
      // chapter top, so the cache has to follow the body rather than a timer.
      let timer = 0;
      obs = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = window.setTimeout(() => scan(), 200);
      });
      obs.observe(document.body);
    }
  },

  active: () => stops.length > 0,

  /* One normalised wheel delta. Classification happens once per gesture: an
     integer delta is a notch (step), anything else is a trackpad stream. */
  feed(delta: number) {
    const now = performance.now();
    if (now - lastFeed > QUIET) {
      kind = Number.isInteger(delta) && Math.abs(delta) >= MIN_NOTCH ? 'step' : 'track';
      if (kind === 'step') lastDir = delta > 0 ? 1 : -1;
    }
    lastFeed = now;

    if (kind === 'step') {
      if (mode === 'track') {
        pending = 0;
        mode = 'idle';
      }
      step(delta > 0 ? 1 : -1);
      return;
    }

    lastDir = delta > 0 ? 1 : -1;
    if (mode !== 'track') {
      mode = 'track';
      target = null;
      vel = 0;
      written = Math.round(window.scrollY);
    }
    pending += delta;
    lastMove = now;
    startRaf();
  },

  /* Discrete intent: a key press, or a notch when the caller already knows. */
  step(dir: 1 | -1) {
    if (mode === 'track') {
      pending = 0;
      mode = 'idle';
    }
    clearQuiet();
    return step(dir);
  },

  release() {
    clearQuiet();
    if (mode === 'track') settle(0);
  },

  goTo(y: number) {
    clearQuiet();
    target = Math.min(Math.max(0, y), docMax());
    if (Math.abs(target - pos) < 1) {
      finish(target);
      return;
    }
    vel = 0;
    mode = 'glide';
    startRaf();
  },

  cancel() {
    clearQuiet();
    stopRaf();
    mode = 'idle';
    target = null;
    pending = 0;
    vel = 0;
  },

  /* Adopt an outside scroll (scrollbar drag, find-in-page, an anchor jump) as
     the new truth instead of fighting it — this is what used to leave the
     controller with a stale target it could never step away from. */
  adopt(y: number) {
    if (mode === 'idle') {
      pos = y;
      written = Math.round(y);
      return;
    }
    if (Math.abs(y - written) > 2) {
      glide.cancel();
      pos = y;
      written = Math.round(y);
    }
  },
};

export function normalizeWheel(e: WheelEvent) {
  return e.deltaMode === 1
    ? e.deltaY * 16
    : e.deltaMode === 2
      ? e.deltaY * window.innerHeight
      : e.deltaY;
}

export const WHEEL_NOISE = NOISE;
