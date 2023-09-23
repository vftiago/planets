import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./land.frag";
import vertexShader from "./land.vert";
import { BASE_LAND_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type LandLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors?: THREE.Color[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
};

const LandLayer = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  lightIntensity = 0.1,
  colors,
  seed,
  rotationSpeed = 0.1,
  rotation,
  land = 0.5,
}: LandLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_LAND_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: 100.0 },
      land_cutoff: { value: land },
      col1: { value: new THREE.Vector4(...colorPalette[0], 1) },
      col2: { value: new THREE.Vector4(...colorPalette[1], 1) },
      col3: { value: new THREE.Vector4(...colorPalette[2], 1) },
      col4: { value: new THREE.Vector4(...colorPalette[3], 1) },
      lightIntensity: { value: lightIntensity },
      light_origin: { value: lightPos },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      seed: { value: seed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, land, lightIntensity, lightPos, seed, rotation, rotationSpeed]);

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

export default LandLayer;
