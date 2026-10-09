import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis, { useLenis } from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import PageLoader from "./components/PageLoader"; // ⬅️ your GSAP loader
import { gsap, ScrollTrigger } from "./lib/gsap";
import { markAppReady } from "./lib/appReady";

// Always start at the top: the loader hands off to the hero intro, and a
// browser-restored mid-page scroll would play that intro off-screen.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

// Scroll feel. Lenis' defaults (lerp 0.1, wheelMultiplier 1) mean a quick
// laptop flick covers a couple of sections in one go and the scroll-driven
// animations flash past. A lower multiplier shortens each flick, a lower lerp
// lengthens the glide, so the page eases into every section instead.
const LENIS_OPTIONS = {
  lerp: 0.06,
  wheelMultiplier: 0.6,
  touchMultiplier: 1,
  autoRaf: false, // driven by GSAP's ticker (see ScrollSync)
};

// Drive Lenis from GSAP's ticker and feed its scroll position to ScrollTrigger,
// so scrubbed animations (marquee text, About, pinned sections) move in the
// same frame as the page instead of a frame behind it.
function ScrollSync() {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  return null;
}

// Lenis scrolls programmatically, so `overflow: hidden` alone doesn't stop
// wheel scrolling behind the loader — Lenis has to be paused too.
function ScrollLock({ locked }) {
  const lenis = useLenis();

  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    if (locked) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked, lenis]);

  return null;
}

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);

    // Let the revealed layout settle, re-measure scroll triggers, then start
    // the intro animations (hero, navbar, planet).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        markAppReady();
      });
    });

    // If the loader timed out before the fonts arrived, they will shift the
    // layout when they land — re-measure once more.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <ReactLenis
      root
      options={LENIS_OPTIONS}
      className="relative w-screen min-h-screen overflow-x-auto"
    >
      <ScrollSync />
      <ScrollLock locked={showLoader} />
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}

      <div
        className={`transition-opacity duration-700 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
