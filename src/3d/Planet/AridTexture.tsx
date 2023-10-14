import * as THREE from "three";

import AridTextureLayer from "../layers/arid-texture/AridTextureLayer";
import { PerspectiveCamera } from "@react-three/drei";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const AridTexture = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <AridTextureLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default AridTexture;
