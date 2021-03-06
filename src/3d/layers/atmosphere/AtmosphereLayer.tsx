import { useLayoutEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./atmosphere.frag";
import vertexShader from "../base.vert";
import { BASE_ATMOSPHERE_COLORS } from "../../colors";
import { DEFAULT_TIME_VALUE_UPDATE } from "../../constants";

type AtmosphereLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  colors?: THREE.Color[];
};

const AtmosphereLayer = ({ meshProps, colors }: AtmosphereLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const colorPalette = useMemo(() => (colors ? colors : BASE_ATMOSPHERE_COLORS), [colors]);

  useLayoutEffect(() => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = {
      color1: { value: new THREE.Vector4(...colorPalette[0], 0.25) },
      color2: { value: new THREE.Vector4(...colorPalette[1], 0.35) },
      color3: { value: new THREE.Vector4(...colorPalette[2], 0.45) },
      time: { value: 0.0 },
    };

    materialRef.current.uniforms = uniforms;
  }, [colorPalette]);

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

export default AtmosphereLayer;
