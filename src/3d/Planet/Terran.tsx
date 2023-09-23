import * as THREE from "three";

import BaseLayer from "../layers/base/BaseLayer";
import LandLayer from "../layers/land/LandLayer";
import CloudLayer from "../layers/cloud/CloudLayer";
import AtmosphereLayer from "../layers/atmosphere/AtmosphereLayer";
import RiversLayer from "../layers/river/RiverLayer";
import { EARTH_COLORS } from "../colors";
import { PerspectiveCamera } from "@react-three/drei";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const Terran = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BaseLayer {...planetObjectProps} colors={EARTH_COLORS} />
      <LandLayer {...planetObjectProps} />
      <CloudLayer {...planetObjectProps} />
      <AtmosphereLayer {...planetObjectProps} />
      <RiversLayer {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Terran;
