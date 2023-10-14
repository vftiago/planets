import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./star-blob.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type StarBlobLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  color: THREE.Color;
  rotation?: number;
  rotationSpeed?: number;
};

const StarBlobLayer = ({ meshProps, seed, color, rotation = 0.1, rotationSpeed = 0.1 }: StarBlobLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: 200.0 },
      color: { value: new THREE.Vector4(...color, 1) },
      lightIntensity: { value: 0.1 },
      light_origin: { value: new THREE.Vector2(0.39, 0.7) },
      time_speed: { value: rotationSpeed },
      rotation: { value: rotation },
      seed: { value: seed },
      circle_amount: { value: 1.0 },
      circle_size: { value: 1.0 },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [color, seed, rotation, rotationSpeed]);

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

export default StarBlobLayer;
