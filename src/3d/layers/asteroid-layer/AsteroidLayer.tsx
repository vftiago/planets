import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./asteroid-layer.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type AsteroidLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors: THREE.Color[];
  rotation?: number;
  seed: number;
  lightPos?: THREE.Vector2;
  pixels?: number;
  size?: number;
  rotationSpeed?: number;
};

const AsteroidLayer = ({
  meshProps,
  colors,
  rotation,
  seed,
  lightPos = new THREE.Vector2(0.0, 0.0),
  pixels = 100.0,
  size = 5.294,
  rotationSpeed = 0.1, // 3.0 * Math.random() looks pretty good
}: AsteroidLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      color1: { value: new THREE.Vector4(...colors[0], 1) },
      color2: { value: new THREE.Vector4(...colors[1], 1) },
      color3: { value: new THREE.Vector4(...colors[2], 1) },
      light_origin: { value: lightPos },
      rotation: { value: rotation },
      size: { value: size },
      seed: { value: seed },
      time_speed: { value: rotationSpeed },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colors, lightPos, rotation, seed, pixels, rotationSpeed, size]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[1.5, 1.5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default AsteroidLayer;
