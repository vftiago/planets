import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./star-flare.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type StarFlareLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  seed: number;
  colors: THREE.Color[];
  rotation?: number;
  stormWidth?: number;
  stormDitherWidth?: number;
  rotationSpeed?: number;
};

const StarFlareLayer = ({
  meshProps,
  seed,
  colors,
  rotation = 1.0,
  rotationSpeed = 0.1,
  stormWidth = 0.2,
  stormDitherWidth = 0.05,
}: StarFlareLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      seed: { value: seed },
      pixels: { value: 100.0 },
      colorscheme: { value: colors },
      storm_width: { value: stormWidth },
      storm_dither_width: { value: stormDitherWidth },
      time_speed: { value: rotationSpeed },
      circle_amount: { value: 2.0 },
      circle_scale: { value: 1.0 },
      scale: { value: 1.0 },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colors, seed, rotation, stormWidth, rotationSpeed, stormDitherWidth]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[1.0, 1.0]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default StarFlareLayer;
