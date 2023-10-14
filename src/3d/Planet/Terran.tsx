import * as THREE from "three";

import CloudLayer from "../layers/cloud/CloudLayer";
import AtmosphereLayer from "../layers/atmosphere/AtmosphereLayer";
import { PerspectiveCamera } from "@react-three/drei";
import TerranLayer from "../layers/terran/TerranLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Terran = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <TerranLayer {...planetObjectProps} />
      <CloudLayer {...planetObjectProps} />
      <AtmosphereLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Terran;
