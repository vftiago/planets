import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import BackgroundLayer from "./layers/background/BackgroundLayer";
import BlackHoleLayer from "./layers/black-hole/BlackHole";
import BlackHoleRingLayer from "./layers/black-hole-ring/BlackHoleRing";

type AsteroidObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_BLACK_COLOR = new THREE.Color(0.152941, 0.152941, 0.211765);

const BASE_BLACK_HOLE_COLORS = [new THREE.Color(1, 1, 0.921569), new THREE.Color(0.929412, 0.482353, 0.223529)];

const BASE_BLACK_HOLE_RING_COLORS = [
  new THREE.Color(1, 1, 0.921569),
  new THREE.Color(1, 0.960784, 0.25098),
  new THREE.Color(1, 0.721569, 0.290196),
  new THREE.Color(0.929412, 0.482353, 0.223529),
  new THREE.Color(0.741176, 0.25098, 0.207843),
];

const BlackHole = (planetObjectProps: AsteroidObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <BlackHoleLayer {...planetObjectProps} blackColor={BASE_BLACK_COLOR} blackHoleColors={BASE_BLACK_HOLE_COLORS} />
      <BlackHoleRingLayer {...planetObjectProps} colorScheme={BASE_BLACK_HOLE_RING_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 1.0]} />
    </group>
  );
};

export default BlackHole;
