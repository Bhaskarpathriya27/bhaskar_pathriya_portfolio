import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Services = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "none",
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"What I do"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className=" flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {service.title}
              </h2>
              <p className="text-base md:text-2xl text-white/60 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Items */}
            <div className="mt-4 flex flex-col gap-10 border-l border-white/15 pl-6 relative">
              <div className="absolute left-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-transparent" />

              {service.items.map((item, itemIndex) => (
                <div
                  key={`item-${index}-${itemIndex}`}
                  className="relative group transition-transform duration-300 hover:translate-x-1"
                >
                  {/* Dot accent */}
                  <div className="absolute -left-[18px] top-2 w-3 h-3 rounded-full bg-gradient-to-r from-[#8C8C73] to-white shadow-[0_0_10px_#8C8C73]" />

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-white/90 flex items-center gap-2">
                    <span className="text-sm text-white/40 tracking-wider">
                      0{itemIndex + 1}
                    </span>
                    {item.title}
                  </h3>

                  {/* Tag grid */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.description &&
                      item.description
                        .replace(/[()]/g, "")
                        .split(",")
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full border border-white/15 text-xs md:text-sm text-white/70 
                                 bg-gradient-to-br from-white/[0.05] to-transparent 
                                 hover:from-[#8C8C73]/30 hover:text-white transition-all duration-200
                                 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
