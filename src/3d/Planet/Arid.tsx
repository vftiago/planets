import * as THREE from "three";

import PlanetDustObject from "../layers/dust/PlanetDust";
import { PerspectiveCamera } from "@react-three/drei";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const Arid = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetDustObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Arid;
