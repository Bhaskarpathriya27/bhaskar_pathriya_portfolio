import React, { useRef } from "react";
import { useGSAP, gsap, SplitText } from "../lib/gsap";
import { GiSpottedArrowhead } from "react-icons/gi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";

const HeaderSection = () => {
  const sectionRef = useRef(null);
  const titleTextRef = useRef(null);
  const imgMaskRef = useRef(null);
  const para = useRef(null);
  const contact = useRef(null);
  const available = useRef(null);
  const resumeRef = useRef(null);

  useGSAP(
    () => {
      document.fonts?.ready.then(() => {
        // safety filter: remove nulls
        const targets = [
          imgMaskRef.current,
          para.current,
          contact.current,
          available.current,
          resumeRef.current,
        ].filter(Boolean);

        if (!titleTextRef.current) return; // title missing → exit

        const split = SplitText.create(titleTextRef.current, { type: "chars" });

        gsap.set(split.chars, {
          clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
          willChange: "clip-path",
          y: 110,
        });

        if (targets.length)
          gsap.set(targets, {
            clipPath: "inset(100% 0% 0% 0%)",
            willChange: "clip-path",
          });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 1.2, delay: 1.2 },
        });

        tl.to(
          split.chars,
          { clipPath: "inset(0% 0% 0% 0%)", stagger: 0.04, y: 0 },
          0
        )
          .to(imgMaskRef.current, { clipPath: "inset(0% 0% 0% 0%)" }, 0.25)
          .to(para.current, { clipPath: "inset(0% 0% 0% 0%)" }, 0.45)
          .to(contact.current, { clipPath: "inset(0% 0% 0% 0%)" }, 0.55)
          .to(available.current, { clipPath: "inset(0% 0% 0% 0%)" }, 0.65)
          .to(resumeRef.current, { clipPath: "inset(0% 0% 0% 0%)" }, 0.7);
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative w-full text-[#262522]">
      {/* NAME — stays centered behind */}
      <div
        ref={titleTextRef}
        className="absolute top-[15vh] left-1/2 text-center -translate-x-1/2  md:text-center text-left z-0 w-full px-4"
      >
        <h1
          className="
      font-normal leading-[0.9]
      tracking-tight text-[#0f0f0f]
      text-[18vw] sm:text-[12vw] md:text-[10vw]
    "
        >
          <span className="block sm:inline">BHASKAR</span>{" "}
          <span className="block sm:inline">PATHRIYA</span>
        </h1>
      </div>

      {/* FOREGROUND CONTENT */}
      <div
        className="
    relative mx-auto
    px-4 sm:px-6 lg:px-10
    pt-[34vh] sm:pt-[34vh] md:pt-[46vh]
    grid grid-cols-1 lg:grid-cols-12
    gap-8 sm:gap-12 lg:gap-16
    items-start lg:items-center
    justify-between
  "
      >
        {/* LEFT SIDE */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6">
          <div className="text-3xl sm:text-4xl text-[#0f0f0f]">
            <GiSpottedArrowhead />
          </div>

          <p
            ref={para}
            className="
        text-base sm:text-lg md:text-xl
        leading-relaxed tracking-wide text-[#0f0f0f]/90
        max-w-[48ch]
      "
          >
            Open to job opportunities worldwide. Passionate about building
            polished, intuitive, and thoughtful digital experiences that leave a
            mark.
          </p>

          <a
            ref={contact}
            href="#contact"
            className="
        relative group flex items-center justify-center
        w-full sm:w-fit
        px-6 py-3 sm:px-8 sm:py-4
        rounded-full bg-[#0f0f0f] text-[#e7e8e2]
        font-semibold tracking-wider
        text-base sm:text-lg
        overflow-hidden
        transition-transform duration-300 hover:-translate-y-1
      "
          >
            <span className="relative z-10">
              CONTACT <span className="inline-block">↗</span>
            </span>
            <span
              className="
          absolute inset-0 bg-[#8c8c73]
          scale-y-0 origin-bottom
          transition-transform duration-500 group-hover:scale-y-100
        "
            />
          </a>
        </div>

        {/* RIGHT SIDE — Available + Resume */}
        <div
          ref={available}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div className="relative flex flex-col items-center lg:items-end text-[#0f0f0f] w-full max-w-[28rem]">
            {/* thin decorative line top (desktop only) */}
            <div className="hidden lg:block w-24 h-px bg-[#0f0f0f]/20 mb-4" />

            {/* Label */}
            <span className="uppercase text-[0.68rem] sm:text-xs tracking-[0.25em] opacity-70 mb-2 sm:mb-3">
              Available for work
            </span>

            {/* Dynamic date */}
            <h3
              className="
    font-semibold leading-none tracking-tight
    text-[18vw] sm:text-[12vw] lg:text-[3.6vw]
    mb-2
  "
            >
              {new Date().getDate()}{" "}
              {new Date()
                .toLocaleString("en-US", { month: "short" })
                .toUpperCase()}
            </h3>

            {/* tagline */}
            <p
              className="
          text-sm sm:text-[0.95rem] text-[#0f0f0f]/70
          max-w-[26ch] text-center lg:text-right leading-relaxed
        "
            >
              Designing experiences that shape tomorrow’s web.
            </p>

            {/* Resume actions */}
            <div
              ref={resumeRef}
              className="mt-5 sm:mt-6 w-full lg:text-right text-center"
              style={{ willChange: "clip-path" }}
            >
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#0f0f0f]/60 mb-2">
                Resume
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                {/* Download (primary pill) */}
                <a
                  href="/resume/BHASKAR_FULL_STACK_DEVELOPER.pdf"
                  download
                  className="
              group relative inline-flex items-center justify-center gap-2
              rounded-full px-5 py-3
              bg-[#0f0f0f] text-[#e7e8e2] font-semibold
              transition-transform duration-300 hover:-translate-y-[2px]
              overflow-hidden
              w-full sm:w-auto
            "
                  aria-label="Download Resume as PDF"
                >
                  <FiDownload className="text-base sm:text-lg" />
                  <span className="relative z-10">Download CV</span>
                  <span
                    className="
                pointer-events-none absolute inset-0 translate-x-[-120%]
                bg-white/20 skew-x-[-20deg] w-1/3
                group-hover:translate-x-[200%]
                transition-transform duration-700
              "
                  />
                </a>

                {/* View Online (ghost) */}
                <a
                  href="/resume/BHASKAR_FULL_STACK_DEVELOPER.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
              inline-flex items-center justify-center gap-2
              rounded-full px-5 py-3
              border border-[#0f0f0f]/25 text-[#0f0f0f]
              hover:border-[#0f0f0f] transition-colors
              w-full sm:w-auto
            "
                  aria-label="View Resume in a new tab"
                >
                  <HiOutlineExternalLink className="text-base sm:text-lg" />
                  <span>View Online</span>
                </a>
              </div>
            </div>

            {/* Animated accent line */}
            <div className="relative mt-5 h-[2px] w-16 overflow-hidden rounded-full bg-[#0f0f0f]/10">
              <span className="absolute inset-y-0 left-0 w-1/2 bg-[#0f0f0f]/70 animate-slide" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
