import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

import BaseLayer from "../layers/base/BaseLayer";
import CloudLayer from "../layers/cloud/CloudLayer";
import LakesLayer from "../layers/lake/LakeLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_ICE_COLORS = [
  new THREE.Color(250 / 255, 255 / 255, 255 / 255),
  new THREE.Color(199 / 255, 212 / 255, 255 / 255),
  new THREE.Color(146 / 255, 143 / 255, 184 / 255),
];

const Ice = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BaseLayer {...planetObjectProps} colors={BASE_ICE_COLORS} />
      <CloudLayer {...planetObjectProps} />
      <LakesLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Ice;
