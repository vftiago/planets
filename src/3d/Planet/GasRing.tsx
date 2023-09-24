import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import RingLayer from "../layers/ring/RingLayer";
import GasDenseColorsLayer from "../layers/gas-dense-colors/GasDenseColorsLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const GasRing = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <GasDenseColorsLayer {...planetObjectProps} />
      <RingLayer
        {...planetObjectProps}
        ringWidth={0.1}
        meshProps={{ position: [0.0, 0.0, 0.01], scale: [2.0, 2.0, 0.0] }}
      />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default GasRing;
