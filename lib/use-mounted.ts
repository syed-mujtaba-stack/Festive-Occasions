"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * useMounted — returns true only on the client after hydration.
 * Safe to use in Client Components as a replacement for the
 * useEffect/setState(true) pattern that triggers lint errors.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

