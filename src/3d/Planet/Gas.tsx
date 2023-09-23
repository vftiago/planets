import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import { GAS_COLORS } from "../colors";
import PlanetGasObject from "../layers/gas/PlanetGas";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
};

const Gas = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetGasObject {...planetObjectProps} />
      <PlanetGasObject cloudCover={0.538} cloudCurve={1.3} colors={GAS_COLORS} {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Gas;
