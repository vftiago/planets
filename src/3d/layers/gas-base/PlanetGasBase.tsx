import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./planet-gas-base.frag";
import vertexShader from "./planet-gas-base.vert";
import { GAS_BASE_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type PlanetGasBaseProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors?: THREE.Vector4[];
  lightPos?: THREE.Vector2;
  lightIntensity?: number;
  rotationSpeed?: number;
  rotation?: number;
  land?: number;
  cloudCover?: number;
  cloudCurve?: number;
  stretch?: number;
};

const PlanetGasBaseObject = ({
  meshProps,
  cloudCover = 0.0,
  cloudCurve = 0.0,
  seed,
  colors,
  rotation = 80.0,
  stretch = 1.0,
  rotationSpeed = 0.1,
  lightPos = new THREE.Vector2(0.39, 0.7),
}: PlanetGasBaseProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : GAS_BASE_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      base_color: { value: colorPalette[0] },
      outline_color: { value: colorPalette[1] },
      shadow_base_color: { value: colorPalette[2] },
      shadow_outline_color: { value: colorPalette[3] },
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

export default PlanetGasBaseObject;
