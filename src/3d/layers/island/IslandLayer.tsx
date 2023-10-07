import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./island.frag";
import vertexShader from "./island.vert";
import { BASE_LAND_MASS_COLORS as BASE_ISLAND_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type OceanLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightIntensity?: number;
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  land?: number;
  pixels?: number;
  rivers?: number;
  colors?: THREE.Color[];
  rotation?: number;
  seed: number;
};

const IslandLayer = ({
  meshProps,
  lightIntensity = 0.1,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  land = 0.5,
  rivers = 0.368,
  pixels = 100.0,
  colors,
  rotation,
  seed,
}: OceanLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_ISLAND_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      light_origin: { value: lightPos },
      seed: { value: seed },
      pixels: { value: 100.0 },
      land_cutoff: { value: land },
      col1: { value: new THREE.Vector4(...colorPalette[0], 1) },
      col2: { value: new THREE.Vector4(...colorPalette[1], 1) },
      col3: { value: new THREE.Vector4(...colorPalette[2], 1) },
      col4: { value: new THREE.Vector4(...colorPalette[3], 1) },
      lightIntensity: { value: lightIntensity },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette, lightPos, seed, rotation, rivers, rotationSpeed, pixels, lightIntensity, land]);

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

export default IslandLayer;
