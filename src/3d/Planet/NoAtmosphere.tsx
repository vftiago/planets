import * as THREE from "three";

import BaseLayer from "../layers/base/BaseLayer";
import { PerspectiveCamera } from "@react-three/drei";
import CraterLayer from "../layers/crater/CraterLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const NoAtmosphere = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <BaseLayer {...planetObjectProps} />
      <CraterLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default NoAtmosphere;
