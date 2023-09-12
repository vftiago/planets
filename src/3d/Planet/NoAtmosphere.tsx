import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import { PerspectiveCamera } from "@react-three/drei";
import PlanetCraterObject from "../layers/crater/PlanetCrater";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const NoAtmosphere = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetBaseObject {...planetObjectProps} />
      <PlanetCraterObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default NoAtmosphere;
