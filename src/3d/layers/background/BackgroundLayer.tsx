import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./background.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type BackgroundLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
};

const BackgroundLayer = ({ meshProps }: BackgroundLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      time: { value: Math.floor(Math.random() * 120) },
    };

    materialRef.current.uniforms = uniforms;
  }, []);

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
