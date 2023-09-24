import * as THREE from "three";

import BaseLayer from "../layers/base/BaseLayer";
import { PerspectiveCamera } from "@react-three/drei";
import CraterLayer from "../layers/crater/CraterLayer";
import LavaRiverLayer from "../layers/lava-river/LavaRiverLayer";
import { BASE_LAVA_COLORS, BASE_LAVA_CRATER_COLORS, BASE_LAVA_RIVER_COLORS } from "../colors";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Lava = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BaseLayer {...planetObjectProps} colors={BASE_LAVA_COLORS} />
      <CraterLayer {...planetObjectProps} colors={BASE_LAVA_CRATER_COLORS} />
      <LavaRiverLayer {...planetObjectProps} colors={BASE_LAVA_RIVER_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Lava;
