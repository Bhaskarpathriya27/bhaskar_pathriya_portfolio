"use client";
import { Suspense } from "react";
import HeaderSection from "../components/HeaderSection";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { PLANET_MEDIA_QUERY } from "../lib/planet";

const Hero = () => {
  const showPlanet = useMediaQuery({ query: PLANET_MEDIA_QUERY });
  return (
    <section
      id="home"
      className="flex flex-col justify-start min-h-screen bg-cream relative"
    >
      <HeaderSection />
      {showPlanet && (
        <figure
          className="absolute inset-0 z-50 mx-auto left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2"
          style={{ width: "50vw", height: "50vh" }}
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          >
            <ambientLight intensity={0.5} />
            {/* Without this boundary, R3F's Canvas re-throws the GLB suspension
                into the DOM tree, which freezes every React update on the page
                (including hiding the loader) until the model has downloaded. */}
            <Suspense fallback={null}>
              <Float speed={0.5}>
                <Planet />
              </Float>
            </Suspense>
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Canvas>
        </figure>
      )}
    </section>
  );
};

export default Hero;
