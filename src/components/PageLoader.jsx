"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { planetReady, shouldShowPlanet } from "../lib/planet";

// Shortest time the loader stays up, so a fast/cached visit doesn't flash it.
const MIN_DURATION = 1.2; // s
// Longest we hold anyone back on a slow connection. Whatever is still loading
// (e.g. the hero planet) appears on its own once it arrives.
const MAX_WAIT = 8; // s

const waitForFonts = () =>
  document.fonts
    ? document.fonts.load('400 1em "Amiamie"').then(() => document.fonts.ready)
    : Promise.resolve();

export default function PageLoader({ onComplete }) {
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const creamRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const fonts = waitForFonts();
    const tasks = [fonts];
    if (shouldShowPlanet()) tasks.push(planetReady);

    // A failed task shouldn't trap the visitor; count it as finished.
    let settled = 0;
    tasks.forEach((task) =>
      task.catch(() => {}).then(() => {
        settled += 1;
      })
    );

    // Hold the text back until the brand font is in, so it doesn't swap
    // visibly mid-count. Shown anyway after a moment if the font is slow.
    let textShown = false;
    const revealText = () => {
      if (textShown) return;
      textShown = true;
      gsap.to(contentRef.current, { opacity: 1, duration: 0.4 });
    };
    const revealFallback = gsap.delayedCall(0.6, revealText);
    fonts.catch(() => {}).then(revealText);

    const start = gsap.ticker.time;
    let shown = 0;
    let exitTl;

    const render = () => {
      counterRef.current.textContent = String(Math.round(shown)).padStart(3, "0");
      barRef.current.style.transform = `scaleX(${shown / 100})`;
    };

    const exit = () => {
      exitTl = gsap
        .timeline({ onComplete: () => onCompleteRef.current?.() })
        .to(contentRef.current, {
          yPercent: -15,
          opacity: 0,
          duration: 0.5,
          delay: 0.15,
          ease: "power2.in",
          overwrite: true,
        })
        .to(
          creamRef.current,
          { scaleY: 1.2, duration: 1, ease: "power3.inOut" },
          "-=0.2"
        );
    };

    const tick = () => {
      const elapsed = gsap.ticker.time - start;
      const finished =
        (settled === tasks.length && elapsed >= MIN_DURATION) ||
        elapsed >= MAX_WAIT;
      // Real progress from finished tasks, plus a slow creep so the counter
      // keeps moving while the bigger assets are still downloading.
      const creep = 90 * (1 - Math.exp(-elapsed / 2.5));
      const target = finished
        ? 100
        : Math.min(99, Math.max((settled / tasks.length) * 100, creep));

      shown += (target - shown) * (1 - Math.pow(0.9, gsap.ticker.deltaRatio()));
      if (finished && shown > 99.5) {
        shown = 100;
        render();
        gsap.ticker.remove(tick);
        exit();
        return;
      }
      render();
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      textShown = true; // ignore a late font resolve after unmount
      revealFallback.kill();
      exitTl?.kill();
    };
  }, []);

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] overflow-hidden bg-black text-cream"
    >
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 sm:p-10"
      >
        <div className="flex justify-between text-xs font-light tracking-[0.3em] uppercase sm:text-sm">
          <span>Bhaskar Pathriya</span>
          <span className="hidden sm:inline">Full Stack & AI Engineer</span>
        </div>

        <div>
          <div className="flex items-end justify-between gap-6">
            <span className="pb-[1.5vw] text-xs font-light tracking-[0.3em] uppercase text-cream/60 sm:text-sm">
              Loading
            </span>
            <p className="font-light leading-[0.8] tabular-nums text-[28vw] sm:text-[18vw] lg:text-[14vw]">
              <span ref={counterRef}>000</span>
            </p>
          </div>
          <div className="mt-6 h-px w-full bg-cream/20">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-cream"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      {/* Same colour as the page underneath, so the wipe hands off seamlessly */}
      <div
        ref={creamRef}
        className="absolute left-[-10vw] right-[-10vw] top-0 bottom-0 bg-cream"
        style={{
          transform: "scaleY(0)",
          transformOrigin: "bottom center",
          clipPath: "ellipse(70% 70% at 50% 70%)",
        }}
      />
    </div>
  );
}
