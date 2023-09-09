import React, { useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-land.frag";
import vertexShader from "./planet-land.vert";
import { BASE_LAND_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetBaseProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors?: THREE.Vector4[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
};

const PlanetLandObject = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  lightIntensity = 0.1,
  colors,
  rotationSpeed = 0.1,
  rotation = 0.0,
  land = 0.6,
}: PlanetBaseProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_LAND_COLORS), [colors]);

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: 100.0 },
      land_cutoff: { value: land },
      col1: { value: colorPalette[0] },
      col2: { value: colorPalette[1] },
      col3: { value: colorPalette[2] },
      col4: { value: colorPalette[3] },
      lightIntensity: { value: lightIntensity },
      light_origin: { value: lightPos },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      seed: { value: Math.random() > 0.5 ? Math.random() * 10 : Math.random() * 100 },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, land, lightIntensity, lightPos, rotation, rotationSpeed]);

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

export default PlanetLandObject;
