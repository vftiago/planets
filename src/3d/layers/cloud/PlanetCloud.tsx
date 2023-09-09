import React, { useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./cloud-base.frag";
import vertexShader from "./cloud-base.vert";
import { BASE_CLOUD_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetBaseProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors?: THREE.Vector4[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
  cloudCover?: number;
  stretch?: number;
};

const PlanetCloudObject = ({
  meshProps,
  colors,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rotation = 0.0,
  cloudCover = 0.546,
  stretch = 2.5,
}: PlanetBaseProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_CLOUD_COLORS), [colors]);

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      light_origin: { value: lightPos },
      pixels: { value: 100.0 },
      seed: { value: Math.random() > 0.5 ? Math.random() * 10 : Math.random() * 100 },
      time_speed: { value: rotationSpeed },
      base_color: { value: colorPalette[0] },
      outline_color: { value: colorPalette[1] },
      shadow_base_color: { value: colorPalette[2] },
      shadow_outline_color: { value: colorPalette[3] },
      cloud_cover: { value: cloudCover },
      rotation: { value: rotation },
      stretch: { value: stretch },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, cloudCover, lightPos, rotation, rotationSpeed, stretch]);

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

export default PlanetCloudObject;
