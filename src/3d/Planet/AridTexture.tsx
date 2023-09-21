import * as THREE from "three";

import PlanetAridTextureObject from "../layers/arid-texture/PlanetAridTexture";
import { PerspectiveCamera } from "@react-three/drei";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const AridTexture = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetAridTextureObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default AridTexture;
