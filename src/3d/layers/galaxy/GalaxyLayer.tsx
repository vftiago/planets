import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./galaxy.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type GalaxyLayerProps = {
  pixels?: number;
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors: THREE.Color[];
  rotation?: number;
  rotationSpeed?: number;
  ditherSize?: number;
  shouldDither?: boolean;
  size?: number;
  octaves?: number;
  tilt?: number;
  layerCount?: number;
  layerHeight?: number;
  zoom?: number;
  colorCount?: number;
  swirl?: number;
};

const GalaxyLayer = ({
  pixels = 100.0,
  meshProps,
  seed,
  colors,
  rotation = 0.4,
  rotationSpeed = 0.1,
  ditherSize = 2.0,
  shouldDither = true,
  size = 7.0,
  octaves = 1,
  tilt = 3.0,
  layerCount = 4.0,
  layerHeight = 0.4,
  zoom = 1.375,
  colorCount = 6.0,
  swirl = -9.0,
}: GalaxyLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      colorScheme: { value: colors },
      time_speed: { value: rotationSpeed },
      dither_size: { value: ditherSize },
      should_dither: { value: shouldDither },
      size: { value: size },
      rotation: { value: rotation },
      OCTAVES: { value: octaves },
      tilt: { value: tilt },
      n_layers: { value: layerCount },
      layer_height: { value: layerHeight },
      zoom: { value: zoom },
      n_colors: { value: colorCount },
      swirl: { value: swirl },
      seed: { value: seed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [
    pixels,
    colors,
    seed,
    rotation,
    rotationSpeed,
    ditherSize,
    shouldDither,
    size,
    octaves,
    tilt,
    layerCount,
    layerHeight,
    zoom,
    colorCount,
    swirl,
  ]);

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

export default GalaxyLayer;
