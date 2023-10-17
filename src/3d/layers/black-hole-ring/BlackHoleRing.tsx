import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./black-hole-ring.frag";
import vertexShader from "./base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type BlackHoleRingLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  pixels?: number;
  colorScheme: THREE.Color[];
  size?: number;
  radius?: number;
  rotation?: number;
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  diskWidth?: number;
  ringPerspective?: number;
  octaves?: number;
  seed: number;
};

const BlackHoleRingLayer = ({
  pixels = 300,
  meshProps,
  rotation = 0.776,
  lightPos = new THREE.Vector2(0.607, 0.444),
  rotationSpeed = 0.2,
  colorScheme,
  size = 6.598,
  diskWidth = 0.065,
  ringPerspective = 14.0,
  radius = 0.247,
  octaves = 3,
  seed,
}: BlackHoleRingLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      rotation: { value: rotation },
      light_origin: { value: lightPos },
      time_speed: { value: rotationSpeed },
      should_dither: { value: true },
      colorScheme: { value: colorScheme },
      disk_width: { value: diskWidth },
      ring_perspective: { value: ringPerspective },
      size: { value: size },
      radius: { value: radius },
      time: { value: 0.0 },
      OCTAVES: { value: octaves },
      seed: { value: seed },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorScheme, size, radius, pixels, rotation, seed, ringPerspective, rotationSpeed, octaves, lightPos, diskWidth]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[2.0, 2.0]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default BlackHoleRingLayer;
