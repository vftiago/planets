import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./terran.frag";
import vertexShader from "./terran.vert";
import { BASE_TERRAN_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type TerranLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  pixels?: number;
  rivers?: number;
  colors?: THREE.Color[];
  rotation?: number;
  seed: number;
};

const TerranLayer = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rivers = 0.368,
  pixels = 100.0,
  colors,
  rotation,
  seed,
}: TerranLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_TERRAN_COLORS), [colors]);

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
      pixels: { value: pixels },
      col1: { value: new THREE.Vector4(...colorPalette[0], 1) },
      col2: { value: new THREE.Vector4(...colorPalette[1], 1) },
      col3: { value: new THREE.Vector4(...colorPalette[2], 1) },
      col4: { value: new THREE.Vector4(...colorPalette[3], 1) },
      river_col: { value: new THREE.Vector4(...colorPalette[4], 1) },
      river_col_dark: { value: new THREE.Vector4(...colorPalette[5], 1) },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, lightPos, seed, rotation, rivers, rotationSpeed, pixels]);

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

export default TerranLayer;
