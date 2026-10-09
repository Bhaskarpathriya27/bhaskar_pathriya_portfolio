import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { onAppReady } from "../lib/appReady";
import {
  PLANET_MODEL_URL,
  markPlanetReady,
  shouldShowPlanet,
} from "../lib/planet";

export function Planet(props) {
  const shapeContainer = useRef(null);
  const shperesContainer = useRef(null);
  const ringContainer = useRef(null);
  const { nodes, materials } = useGLTF(PLANET_MODEL_URL);

  useEffect(() => {
    markPlanetReady();
  }, []);

  useGSAP(() => {
    // Paused so the fly-in plays after the page loader, not behind it.
    const tl = gsap.timeline({ paused: true });
    tl.from(shapeContainer.current.position, {
      y: 5,
      duration: 3,
      ease: "circ.out",
    });
    tl.from(
      shperesContainer.current.rotation,
      {
        x: 0,
        y: Math.PI,
        z: -Math.PI,
        duration: 10,
        ease: "power1.inOut",
      },
      "-=25%"
    );
    tl.from(
      ringContainer.current.rotation,
      {
        x: 0.8,
        y: 0,
        z: 0,
        duration: 10,
        ease: "power1.inOut",
      },
      "<"
    );
    return onAppReady(() => tl.play());
  }, []);

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={shperesContainer}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere2.geometry}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      />
    </group>
  );
}

if (shouldShowPlanet()) useGLTF.preload(PLANET_MODEL_URL);
