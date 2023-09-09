import React, { useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-base.frag";
import vertexShader from "./planet-base.vert";
import { BASE_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetBaseProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors?: THREE.Vector4[];
};

const PlanetBaseObject = ({ meshProps, colors }: PlanetBaseProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_COLORS), [colors]);

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: 100.0 },
      color1: { value: colorPalette[0] },
      color2: { value: colorPalette[1] },
      color3: { value: colorPalette[2] },
      lightIntensity: { value: 0.1 },
      light_origin: { value: new THREE.Vector2(0.39, 0.7) },
      time_speed: { value: 0.1 },
      rotation: { value: 0.0 },
      seed: { value: Math.random() > 0.5 ? Math.random() * 10 : Math.random() * 100 },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time = uniforms.time || { value: 0 };

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps} ref={ref}>
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

export default PlanetBaseObject;
