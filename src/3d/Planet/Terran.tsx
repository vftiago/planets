import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import PlanetLandObject from "../layers/land/PlanetLand";
import PlanetCloudObject from "../layers/cloud/PlanetCloud";
import PlanetAtmosphereObject from "../layers/atmosphere/PlanetAtmosphere";
import PlanetRiversObject from "../layers/rivers/PlanetRivers";
import { EARTH_COLORS } from "../colors";
import { PerspectiveCamera } from "@react-three/drei";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const Terran = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetBaseObject {...planetObjectProps} colors={EARTH_COLORS} />
      <PlanetLandObject {...planetObjectProps} />
      <PlanetRiversObject {...planetObjectProps} />
      <PlanetCloudObject {...planetObjectProps} />
      <PlanetAtmosphereObject {...planetObjectProps} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Terran;
