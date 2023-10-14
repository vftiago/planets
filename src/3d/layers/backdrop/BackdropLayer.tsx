import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./backdrop.frag";
import vertexShader from "../base.vert";

type BackgroundLayerProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
};

const BackdropLayer = ({ meshProps }: BackgroundLayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[3, 3]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
};

export default BackdropLayer;
