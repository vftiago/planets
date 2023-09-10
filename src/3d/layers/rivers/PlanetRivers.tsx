import React, { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-rivers.frag";
import vertexShader from "./planet-rivers.vert";
import { BASE_RIVER_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetRiversProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  rivers?: number;
  colors?: THREE.Vector4[];
  rotation?: number;
  seed: number;
};

const PlanetRiversObject = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rivers = 0.6,
  colors,
  rotation = Math.random(),
  seed,
}: PlanetRiversProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_RIVER_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      light_origin: { value: lightPos },
      seed: { value: seed },
      time_speed: { value: rotationSpeed },
      river_cutoff: { value: rivers },
      rotation: { value: rotation },
      color1: { value: colorPalette[0] },
      color2: { value: colorPalette[1] },
      color3: { value: colorPalette[2] },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, lightPos, seed, rotation, rivers, rotationSpeed]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time = uniforms.time || { value: 0 };

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

export default PlanetRiversObject;
