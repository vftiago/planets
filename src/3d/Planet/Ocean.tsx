import * as THREE from "three";

import CloudLayer from "../layers/cloud/CloudLayer";
import AtmosphereLayer from "../layers/atmosphere/AtmosphereLayer";
import { PerspectiveCamera } from "@react-three/drei";
import IslandLayer from "../layers/island/IslandLayer";
import BaseLayer from "../layers/base/BaseLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

const BASE_OCEAN_COLORS = [
  new THREE.Color(0.572549, 0.909804, 0.752941),
  new THREE.Color(0.309804, 0.643137, 0.721569),
  new THREE.Color(0.172549, 0.207843, 0.301961),
];

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Ocean = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <BaseLayer {...planetObjectProps} colors={BASE_OCEAN_COLORS} />
      <IslandLayer {...planetObjectProps} />
      <CloudLayer {...planetObjectProps} />
      <AtmosphereLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Ocean;
