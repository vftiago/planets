import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import PlanetGasDense from "../layers/gas-dense/PlanetGasDense";
import PlanetRingObject from "../layers/ring/PlanetRing";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
};

const GasRing = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetGasDense {...planetObjectProps} />
      <PlanetRingObject {...planetObjectProps} meshProps={{ position: [0.0, 0.0, 0.01], scale: [2.0, 2.0, 0.0] }} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default GasRing;
