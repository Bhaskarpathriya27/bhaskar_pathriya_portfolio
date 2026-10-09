"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
import { Link } from "react-scroll";
import { onAppReady } from "../lib/appReady";

export default function Navbar() {
  const headerRef = useRef(null);

  useGSAP((context, contextSafe) => {
    const el = headerRef.current;

    // 1) Initial entrance (loader ke baad), just behind the hero name reveal
    const cancelIntro = onAppReady(contextSafe(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
      );
    }));

    // 2) Quick setters for buttery transitions
    const toY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power2.out" });
    const toOpacity = gsap.quickTo(el, "opacity", {
      duration: 0.35,
      ease: "power2.out",
    });

    // 3) Hide on any scroll > 0; show only at top (scroll === 0)
    ScrollTrigger.create({
      start: 0,
      end: 999999, // whole page
      onUpdate: (self) => {
        const sc = self.scroll();
        if (sc <= 1) {
          // At very top -> show
          toY(0);
          toOpacity(1);
          el.style.pointerEvents = "auto";
        } else {
          // Scrolled down -> hide
          toY(-40); // slide up a bit
          toOpacity(0); // fade out
          el.style.pointerEvents = "none";
        }
      },
    });

    return cancelIntro;
  }, []);

  return (
    <nav
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-8"
      style={{ opacity: 0 }} // (initial gsap anim will bring to 1)
    >
      <div>
        <p className="text-xl font-medium">Full Stack & AI Engineer</p>
      </div>
      <div className="md:flex gap-7 uppercase hidden">
        <NavLink>services</NavLink>
        <NavLink>about</NavLink>
        <NavLink>works</NavLink>
        <NavLink>contact</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ children }) {
  return (
    <Link
      smooth
      offset={0}
      duration={2000}
      to={`${children}`}
      href={`#${children}`}
      className="
        group relative inline-block h-6 leading-[1.5rem]
        overflow-hidden align-middle select-none cursor-pointer
      "
    >
      {/* Top label (slides up) */}
      <span
        className="
          block will-change-transform transition-transform duration-300
          translate-y-0 group-hover:-translate-y-full
        "
      >
        {children}
      </span>

      {/* Bottom label (slides in from below) */}
      <span
        className="
          block absolute inset-0 will-change-transform transition-transform duration-300
          translate-y-full group-hover:translate-y-0
        "
        aria-hidden="true"
      >
        {children}
      </span>
    </Link>
  );
}
