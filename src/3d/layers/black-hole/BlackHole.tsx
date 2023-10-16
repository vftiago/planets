import { useLayoutEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./black-hole.frag";
import vertexShader from "../base.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type BlackHoleLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  pixels?: number;
  blackColor: THREE.Color;
  blackHoleColors?: THREE.Color[];
  lightWidth?: number;
  radius?: number;
};

const BlackHoleLayer = ({
  pixels = 100,
  meshProps,
  blackColor,
  blackHoleColors,
  lightWidth = 0.028,
  radius = 0.247,
}: BlackHoleLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      pixels: { value: pixels },
      black_hole_colors: { value: blackHoleColors },
      black_color: { value: new THREE.Vector4(...blackColor, 1) },
      light_width: { value: lightWidth },
      radius: { value: radius },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [blackColor, blackHoleColors, lightWidth, radius, pixels]);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
  });

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[1.2, 1.2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default BlackHoleLayer;
