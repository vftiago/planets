import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./arid-colors.frag";
import vertexShader from "./arid-colors.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetRiversProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  colors?: THREE.Vector4[];
  rotation?: number;
  seed: number;
  pixels?: number;
};

const PlanetAridColorsObject = ({
  meshProps,
  colors,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rotation = Math.random(),
  seed,
  pixels = 100.0,
}: PlanetRiversProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      light_origin: { value: lightPos },
      seed: { value: seed },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      colors: { value: colors },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colors, lightPos, seed, rotation, rotationSpeed, pixels]);

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

export default PlanetAridColorsObject;
