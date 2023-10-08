import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./cloud.frag";
import vertexShader from "./cloud.vert";
import { TERRAN_CLOUD_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type CloudLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors?: THREE.Color[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
  cloudCover?: number;
  stretch?: number;
  lightBorder?: [number, number];
};

const CloudLayer = ({
  meshProps,
  colors,
  seed,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rotation,
  cloudCover = 0.546,
  stretch = 2.5,
  lightBorder = [0.4, 0.5],
}: CloudLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : TERRAN_CLOUD_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      light_origin: { value: lightPos },
      pixels: { value: 100.0 },
      seed: { value: seed },
      time_speed: { value: rotationSpeed },
      base_color: { value: new THREE.Vector4(...colorPalette[0], 1) },
      outline_color: { value: new THREE.Vector4(...colorPalette[1], 1) },
      shadow_base_color: { value: new THREE.Vector4(...colorPalette[2], 1) },
      shadow_outline_color: { value: new THREE.Vector4(...colorPalette[3], 1) },
      cloud_cover: { value: cloudCover },
      light_border_1: { value: lightBorder[0] },
      light_border_2: { value: lightBorder[1] },
      rotation: { value: rotation },
      stretch: { value: stretch },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, cloudCover, lightPos, lightBorder, seed, rotation, rotationSpeed, stretch]);

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

export default CloudLayer;
