import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./crater.frag";
import vertexShader from "../base.vert";
import { BASE_CRATER_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type CraterLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors?: THREE.Color[];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  rotation?: number;
};

const CraterLayer = ({
  meshProps,
  colors,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rotation,
  seed,
}: CraterLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_CRATER_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      color1: { value: new THREE.Vector4(...colorPalette[0], 1) },
      color2: { value: new THREE.Vector4(...colorPalette[1], 1) },
      light_origin: { value: lightPos },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      seed: { value: seed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, lightPos, rotationSpeed, rotation, seed]);

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

export default CraterLayer;
