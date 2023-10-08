import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./arid-texture.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";
import palette from "./dry_terran.png";
import { useTexture } from "@react-three/drei";

type AridTextureLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  lightPos?: THREE.Vector2;
  rotationSpeed?: number;
  colors?: THREE.Color[];
  rotation?: number;
  seed: number;
  pixels?: number;
};

const AridTextureLayer = ({
  meshProps,
  lightPos = new THREE.Vector2(0.39, 0.7),
  rotationSpeed = 0.1,
  rotation,
  seed,
  pixels = 100.0,
}: AridTextureLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { colorSchemeTexture } = useTexture({ colorSchemeTexture: palette });

  colorSchemeTexture.magFilter = THREE.NearestFilter;
  colorSchemeTexture.minFilter = THREE.NearestFilter;

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      light_origin: { value: lightPos },
      seed: { value: seed },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      colors: { value: colorSchemeTexture },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorSchemeTexture, lightPos, seed, rotation, rotationSpeed, pixels]);

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

export default AridTextureLayer;
