import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import PlanetLandObject from "../layers/land/PlanetLand";
import PlanetCloudObject from "../layers/cloud/PlanetCloud";
import PlanetAtmosphereObject from "../layers/atmosphere/PlanetAtmosphere";
import PlanetRiversObject from "../layers/rivers/PlanetRivers";
import { EARTH_COLORS } from "../colors";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Vector4[];
};

const PlanetObject = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <PlanetBaseObject {...planetObjectProps} colors={EARTH_COLORS} />
      <PlanetLandObject {...planetObjectProps} />
      <PlanetRiversObject {...planetObjectProps} />
      <PlanetCloudObject {...planetObjectProps} />
      <PlanetAtmosphereObject {...planetObjectProps} />
    </group>
  );
};

export default PlanetObject;
