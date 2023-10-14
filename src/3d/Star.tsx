import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import BaseStarLayer from "./layers/base-star/BaseStarLayer";
import BackgroundLayer from "./layers/background/BackgroundLayer";
import StarBlobLayer from "./layers/star-blob-layer/StarBlobLayer";

type StarObjectProps = {
  seed: number;
  colors?: THREE.Color[];
  rotation: number;
};

const BASE_STAR_COLORS = [
  new THREE.Color(0.960784, 1, 0.909804),
  new THREE.Color(0.466667, 0.839216, 0.756863),
  new THREE.Color(0.109804, 0.572549, 0.654902),
  new THREE.Color(0.0117647, 0.243137, 0.368627),
];

const BASE_STAR_BLOB_COLOR = new THREE.Color(1, 1, 0.894118);

const Star = (planetObjectProps: StarObjectProps) => {
  return (
    <group>
      <BackgroundLayer />
      <StarBlobLayer {...planetObjectProps} color={BASE_STAR_BLOB_COLOR} />
      <BaseStarLayer {...planetObjectProps} colors={BASE_STAR_COLORS} />
      <PerspectiveCamera makeDefault fov={90} position={[0, 0, 0.6]} />
    </group>
  );
};

export default Star;
