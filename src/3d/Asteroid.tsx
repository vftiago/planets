import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import BackgroundLayer from "./layers/background/BackgroundLayer";
import AsteroidLayer from "./layers/asteroid-layer/AsteroidLayer";

type AsteroidObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_ASTEROID_COLORS = [
  new THREE.Color(0.639216, 0.654902, 0.760784),
  new THREE.Color(0.298039, 0.407843, 0.521569),
  new THREE.Color(0.227451, 0.247059, 0.368627),
];

const Asteroid = (planetObjectProps: AsteroidObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <AsteroidLayer {...planetObjectProps} colors={BASE_ASTEROID_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Asteroid;
