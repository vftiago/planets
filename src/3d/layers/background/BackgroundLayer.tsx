import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./background.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";
import { useTexture } from "@react-three/drei";
import color from "./palette.png";

type BackgroundLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
};

// looks bad. try to find a better nebula-style fragment shader online
const BackgroundLayer = ({ meshProps, seed }: BackgroundLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { colorSchemeTexture } = useTexture({ colorSchemeTexture: color });

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    colorSchemeTexture.magFilter = THREE.NearestFilter;
    colorSchemeTexture.minFilter = THREE.NearestFilter;

    const uniforms = {
      colorscheme: { value: colorSchemeTexture },
      seed: { value: seed },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorSchemeTexture, seed]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[3, 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default BackgroundLayer;
