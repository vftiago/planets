import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

import BaseLayer from "../layers/base/BaseLayer";
import CloudLayer from "../layers/cloud/CloudLayer";
import LakeLayer from "../layers/lake/LakeLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_ICE_COLORS = [
  new THREE.Color(0.980392, 1, 1),
  new THREE.Color(0.780392, 0.831373, 0.882353),
  new THREE.Color(0.572549, 0.560784, 0.721569),
];

const ICE_CLOUD_COLORS = [
  new THREE.Color(0.882353, 0.94902, 1),
  new THREE.Color(0.752941, 0.890196, 1),
  new THREE.Color(0.368627, 0.439216, 0.647059),
  new THREE.Color(0.25098, 0.286275, 0.45098),
];

const Ice = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BaseLayer {...planetObjectProps} colors={BASE_ICE_COLORS} />
      <CloudLayer {...planetObjectProps} colors={ICE_CLOUD_COLORS} lightBorder={[0.566, 0.781]} />
      <LakeLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Ice;
