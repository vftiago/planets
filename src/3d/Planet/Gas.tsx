import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import PlanetGasBaseObject from "../layers/gas-base/PlanetGasBase";
import PlanetGasObject from "../layers/gas/PlanetGas";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const Gas = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetGasBaseObject {...planetObjectProps} />
      <PlanetGasObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Gas;
