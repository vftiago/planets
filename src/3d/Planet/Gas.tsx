import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import { GAS_CLOUD_COLORS, GAS_BASE_COLORS } from "../colors";
import GasLayer from "../layers/gas/GasLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Gas = (planetObjectProps: PlanetObjectProps) => {
  const cloudCover = Math.random() * 0.22 + 0.28; // between 0.28 and 0.5

  return (
    <group>
      <BackgroundLayer />
      <GasLayer colors={GAS_BASE_COLORS} lightBorder={[0.692, 0.666]} {...planetObjectProps} />
      <GasLayer colors={GAS_CLOUD_COLORS} cloudCover={cloudCover} {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Gas;
