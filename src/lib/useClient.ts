"use client";
import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export type DeviceTier = "low" | "mid" | "high";

/** Scene quality budget. Starts at "low" so the first paint never commits
 *  a weak device to an expensive scene. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("low");
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;

    if (coarse || narrow || mem <= 2 || cores <= 2) setTier("low");
    else if (mem >= 8 && cores >= 8) setTier("high");
    else setTier("mid");
  }, []);
  return tier;
}

export function useWebGLSupported() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setOk(!!gl);
      if (gl && "getExtension" in gl) gl.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

/** Viewport visibility — used to stop the render loop for offscreen canvases. */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/** Pointer position normalised to -1..1 within an element, eased toward the
 *  target so motion never snaps. Returns a ref object, not state — reading it
 *  in an animation frame avoids a re-render per mouse move. */
export function usePointerNormalised<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T | null>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (disabled) {
      pointer.current = { x: 0, y: 0, tx: 0, ty: 0 };
      return;
    }
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      pointer.current.tx = 0;
      pointer.current.ty = 0;
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled]);

  return { ref, pointer };
}
