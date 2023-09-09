import * as THREE from "three";

import PlanetBaseObject from "../layers/base/PlanetBase";
import PlanetLandObject from "../layers/land/PlanetLand";
import PlanetCloudObject from "../layers/cloud/PlanetCloud";
import PlanetAtmosphereObject from "../layers/atmosphere/PlanetAtmosphere";

type PlanetProps = {
  colors?: THREE.Vector4[];
};

const PlanetObject = ({ colors }: PlanetProps) => {
  return (
    <group>
      <PlanetBaseObject colors={colors} />
      <PlanetLandObject colors={colors} />
      <PlanetCloudObject colors={colors} />
      <PlanetAtmosphereObject colors={colors} />
    </group>
  );
};

export default PlanetObject;
