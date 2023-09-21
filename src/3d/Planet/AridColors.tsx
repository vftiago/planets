import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import { RANDOM_COLORS } from "../colors";
import PlanetAridColorsObject from "../layers/arid-colors/PlanetAridColors";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const AridColors = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetAridColorsObject colors={RANDOM_COLORS} {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default AridColors;
