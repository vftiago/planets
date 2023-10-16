import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import BackgroundLayer from "./layers/background/BackgroundLayer";
import BlackHoleLayer from "./layers/black-hole/BlackHole";

type AsteroidObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_BLACK_COLOR = new THREE.Color(0.152941, 0.152941, 0.211765);

const BASE_BLACK_HOLE_COLORS = [new THREE.Color(1, 1, 0.921569), new THREE.Color(0.929412, 0.482353, 0.223529)];

const BlackHole = (planetObjectProps: AsteroidObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <BlackHoleLayer {...planetObjectProps} blackColor={BASE_BLACK_COLOR} blackHoleColors={BASE_BLACK_HOLE_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default BlackHole;
