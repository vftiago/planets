import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./ring-texture.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";
import { useTexture } from "@react-three/drei";
import palette1 from "./gas_giant_colors.png";
import palette2 from "./gas_giant_dark_colors.png";

type RingTextureLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  pixels?: number;
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  ringWidth?: number;
  ringPerspective?: number;
  scalePlanet?: number;
  rotation?: number;
};

const RingTextureLayer = ({
  meshProps,
  seed,
  pixels = 250.0,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.05,
  ringWidth = 0.143,
  ringPerspective = 6.0,
  scalePlanet = 4.0,
  rotation,
}: RingTextureLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { colorSchemeTexture, darkColorSchemeTexture } = useTexture({
    colorSchemeTexture: palette1,
    darkColorSchemeTexture: palette2,
  });

  colorSchemeTexture.magFilter = THREE.NearestFilter;
  colorSchemeTexture.minFilter = THREE.NearestFilter;
  darkColorSchemeTexture.magFilter = THREE.NearestFilter;
  darkColorSchemeTexture.minFilter = THREE.NearestFilter;

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      colorscheme: { value: colorSchemeTexture },
      dark_colorscheme: { value: darkColorSchemeTexture },
      ring_width: { value: ringWidth },
      ring_perspective: { value: ringPerspective },
      scale_rel_to_planet: { value: scalePlanet },
      pixels: { value: pixels },
      light_origin: { value: lightPos },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      seed: { value: seed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [
    seed,
    lightPos,
    rotation,
    rotationSpeed,
    colorSchemeTexture,
    darkColorSchemeTexture,
    pixels,
    ringPerspective,
    ringWidth,
    scalePlanet,
  ]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default RingTextureLayer;
