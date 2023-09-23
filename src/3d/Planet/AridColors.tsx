import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import { BASE_ARID_COLORS } from "../colors";
import AridColorsLayer from "../layers/arid-colors/AridColorsLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const AridColors = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <AridColorsLayer colors={BASE_ARID_COLORS} {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default AridColors;
