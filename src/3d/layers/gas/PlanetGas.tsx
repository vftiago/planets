import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-gas.frag";
import vertexShader from "./planet-gas.vert";
import { GAS_BASE_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetGasProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors?: THREE.Color[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
  cloudCover?: number;
  cloudCurve?: number;
  stretch?: number;
};

const PlanetGasObject = ({
  meshProps,
  cloudCover = 0.0,
  cloudCurve = 0.0,
  seed,
  colors,
  rotation = 80.0,
  stretch = 1.0,
  rotationSpeed = 0.1,
  lightPos = new THREE.Vector2(0.39, 0.7),
}: PlanetGasProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : GAS_BASE_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      base_color: { value: new THREE.Vector4(...colorPalette[0], 1) },
      outline_color: { value: new THREE.Vector4(...colorPalette[1], 1) },
      shadow_base_color: { value: new THREE.Vector4(...colorPalette[2], 1) },
      shadow_outline_color: { value: new THREE.Vector4(...colorPalette[3], 1) },
      cloud_cover: { value: cloudCover },
      stretch: { value: stretch },
      cloud_curve: { value: cloudCurve },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      light_origin: { value: lightPos },
      seed: { value: seed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, seed, lightPos, rotation, rotationSpeed, stretch, cloudCover, cloudCurve]);

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

export default PlanetGasObject;
