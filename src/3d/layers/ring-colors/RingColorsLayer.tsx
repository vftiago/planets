import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./ring-colors.frag";
import vertexShader from "./ring-colors.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type RingColorsLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  pixels?: number;
  lightPos?: THREE.Vector2;
  colors?: THREE.Color[];
  darkColors?: THREE.Color[];
  rotationSpeed?: number;
  ringWidth?: number;
  ringPerspective?: number;
  scalePlanet?: number;
  rotation?: number;
};

const BASE_GAS_COLORS = [
  new THREE.Color(0.933333, 0.764706, 0.603922),
  new THREE.Color(0.85098, 0.627451, 0.4),
  new THREE.Color(0.560784, 0.337255, 0.231373),
];

const BASE_GAS_DARK_COLORS = [
  new THREE.Color(0.4, 0.223529, 0.192157),
  new THREE.Color(0.270588, 0.156863, 0.235294),
  new THREE.Color(0.133333, 0.12549, 0.203922),
];

const RingColorsLayer = ({
  meshProps,
  seed,
  colors,
  darkColors,
  pixels = 250.0,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.05,
  ringWidth = 0.143,
  ringPerspective = 6.0,
  scalePlanet = 4.0,
  rotation,
}: RingColorsLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      colorscheme: { value: colors ?? BASE_GAS_COLORS },
      dark_colorscheme: { value: darkColors ?? BASE_GAS_DARK_COLORS },
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
  }, [seed, colors, darkColors, lightPos, rotation, rotationSpeed, pixels, ringPerspective, ringWidth, scalePlanet]);

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

export default RingColorsLayer;
