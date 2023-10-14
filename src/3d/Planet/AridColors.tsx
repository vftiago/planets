import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import AridColorsLayer from "../layers/arid-colors/AridColorsLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_ARID_COLORS = [
  new THREE.Color(1.0, 0.537255, 0.2),
  new THREE.Color(0.901961, 0.270588, 0.223529),
  new THREE.Color(0.678431, 0.184314, 0.270588),
  new THREE.Color(0.321569, 0.2, 0.247059),
  new THREE.Color(0.239216, 0.160784, 0.211765),
];

const AridColors = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <AridColorsLayer colors={BASE_ARID_COLORS} {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default AridColors;
