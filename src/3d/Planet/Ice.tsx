import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import { PerspectiveCamera } from "@react-three/drei";
import PlanetCloudObject from "../layers/cloud/PlanetCloud";
import PlanetLakesObject from "../layers/lakes/PlanetLakes";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
};

const BASE_ICE_COLORS = [
  new THREE.Vector4(250 / 255, 255 / 255, 255 / 255, 1),
  new THREE.Vector4(199 / 255, 212 / 255, 255 / 255, 1),
  new THREE.Vector4(146 / 255, 143 / 255, 184 / 255, 1),
];

const Ice = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetBaseObject {...planetObjectProps} colors={BASE_ICE_COLORS} />
      <PlanetLakesObject {...planetObjectProps} />
      <PlanetCloudObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Ice;
