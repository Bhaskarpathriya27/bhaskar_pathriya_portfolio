/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import PageLoader from "./components/PageLoader"; // ⬅️ your GSAP loader

// (Optional) If you use GSAP ScrollTrigger anywhere:
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  // lock scroll while loader is visible
  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoader]);

  const handleLoaderComplete = () => {
    setShowLoader(false);

    // Let layout settle, then refresh scroll-based stuff
    // and tell anyone listening (LenisProvider, sections) that app is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          ScrollTrigger.refresh();
        } catch (_) {}
        window.dispatchEvent(new Event("app-ready"));
      });
    });
  };

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
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
