import * as THREE from "three";

import CloudLayer from "../layers/cloud/CloudLayer";
import AtmosphereLayer from "../layers/atmosphere/AtmosphereLayer";
import { PerspectiveCamera } from "@react-three/drei";
import IslandLayer from "../layers/island/IslandLayer";
import BaseLayer from "../layers/base/BaseLayer";
import { BASE_OCEAN_COLORS } from "../colors";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Ocean = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BaseLayer {...planetObjectProps} colors={BASE_OCEAN_COLORS} />
      <IslandLayer {...planetObjectProps} />
      <CloudLayer {...planetObjectProps} />
      <AtmosphereLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Ocean;
