import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import BackgroundLayer from "./layers/background/BackgroundLayer";
import GalaxyLayer from "./layers/galaxy/GalaxyLayer";

type GalaxyObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_GALAXY_COLORS = [
  new THREE.Color(1, 1, 0.92156),
  new THREE.Color(1, 0.894118, 0.470588),
  new THREE.Color(0.560784, 0.870588, 0.364706),
  new THREE.Color(0.239216, 0.431373, 0.439216),
  new THREE.Color(0.196078, 0.243137, 0.309804),
  new THREE.Color(0.196078, 0.160784, 0.278431),
];

const BLUE_GALAXY_COLORS = [
  new THREE.Color("#97FDF3"),
  new THREE.Color("#6CA7FF"),
  new THREE.Color("#5357E4"),
  new THREE.Color("#4C42A3"),
  new THREE.Color("#4B5955"),
  new THREE.Color("#425D18"),
];

const ORANGE_GALAXY_COLORS = [
  new THREE.Color("#EAFFFF"),
  new THREE.Color("#EFE1BA"),
  new THREE.Color("#E59963"),
  new THREE.Color("#C75239"),
  new THREE.Color("#942341"),
  new THREE.Color("#56104C"),
];

const Galaxy = (planetObjectProps: GalaxyObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <GalaxyLayer {...planetObjectProps} colors={BASE_GALAXY_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.4]} />
    </group>
  );
};

export default Galaxy;
