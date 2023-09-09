import React, { useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-atmosphere.frag";
import vertexShader from "./planet-atmosphere.vert";
import { BASE_ATMOSPHERE_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetBaseProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors?: THREE.Vector4[];
};

const PlanetAtmosphereObject = ({ meshProps, colors }: PlanetBaseProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_ATMOSPHERE_COLORS), [colors]);

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      color1: { value: colorPalette[0] },
      color2: { value: colorPalette[1] },
      color3: { value: colorPalette[2] },
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
      <planeGeometry args={[1.02, 1.02]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default PlanetAtmosphereObject;
