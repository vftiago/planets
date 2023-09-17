import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import { PerspectiveCamera } from "@react-three/drei";
import PlanetCraterObject from "../layers/crater/PlanetCrater";
import PlanetRiversObject from "../layers/rivers/PlanetRivers";
import { BASE_LAVA_COLORS, BASE_LAVA_CRATER_COLORS, BASE_LAVA_RIVER_COLORS } from "../colors";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const Lava = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetBaseObject {...planetObjectProps} colors={BASE_LAVA_COLORS} />
      <PlanetCraterObject {...planetObjectProps} colors={BASE_LAVA_CRATER_COLORS} />
      <PlanetRiversObject {...planetObjectProps} colors={BASE_LAVA_RIVER_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Lava;
