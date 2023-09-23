import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./river.frag";
import vertexShader from "./river.vert";
import { BASE_RIVER_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type RiverLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  rivers?: number;
  colors?: THREE.Color[];
  rotation?: number;
  seed: number;
};

const RiverLayer = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rivers = 0.6,
  colors,
  rotation = Math.random(),
  seed,
}: RiverLayerProps) => {
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
      color1: { value: new THREE.Vector4(...colorPalette[0], 1) },
      color2: { value: new THREE.Vector4(...colorPalette[1], 1) },
      color3: { value: new THREE.Vector4(...colorPalette[2], 1) },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, lightPos, seed, rotation, rivers, rotationSpeed]);

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

export default RiverLayer;
