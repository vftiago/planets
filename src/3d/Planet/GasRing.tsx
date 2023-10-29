import * as THREE from "three";

import { PerspectiveCamera } from "@react-three/drei";
import GasDenseColorsLayer from "../layers/gas-dense/GasDenseLayer";
import RingColorsLayer from "../layers/ring/RingLayer";
import BackgroundLayer from "../layers/background/BackgroundLayer";

type PlanetObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const GasRing = (planetObjectProps: PlanetObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <GasDenseColorsLayer {...planetObjectProps} />
      <RingColorsLayer
        {...planetObjectProps}
        ringWidth={0.1}
        meshProps={{ position: [0.0, 0.0, 0.01], scale: [2.0, 2.0, 0.0] }}
      />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default GasRing;
