"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageLoader({ onComplete }) {
  const creamRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      onComplete: () => {
        if (onComplete) onComplete();
        document.body.style.backgroundColor = "#e7e8e2";
      },
    });

    // Start loader - cream color slides up and fills viewport
    tl.set(creamRef.current, {
      scaleY: 0,
      clipPath: "ellipse(70% 70% at 50% 70%)", // 🏳️‍🌈 Much wider and taller, center at bottom
    }).to(creamRef.current, {
      duration: 1,
      scaleY: 1.2,
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black pointer-events-none">
      <div
        ref={creamRef}
        className="absolute left-[-10vw] right-[-10vw] top-0 bottom-0 z-10"
        style={{
          backgroundColor: "#e7e8e2", // Cream color
          transformOrigin: "bottom center",
          borderRadius: "0", // Optional: remove rounding
        }}
      />
    </div>
  );
}
