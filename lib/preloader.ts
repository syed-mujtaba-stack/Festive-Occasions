/**
 * Preloader coordination — a single module-level deferred promise that is
 * shared by the <Preloader /> overlay and the homepage hero timeline.
 *
 * - The hero's cinematic intro is paused until the loader's curtains begin
 *   to lift, so the reveal feels like one continuous moment.
 * - Every path (reduced motion, already-seen session, normal play) MUST
 *   resolve this — never leave the hero waiting forever.
 */
let resolveDone: (() => void) | null = null;
let settled = false;

export const preloaderDone: Promise<void> = new Promise((resolve) => {
  resolveDone = resolve;
});

/** Resolve the shared promise (idempotent — call from every path). */
export function finishPreloader() {
  if (settled || !resolveDone) return;
  settled = true;
  resolveDone();
}

/** True once the loader has released the page (hero may start). */
export function isPreloaderDone() {
  return settled;
}