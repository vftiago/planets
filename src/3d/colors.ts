import * as THREE from "three";

export const BASE_COLORS = [
  new THREE.Color(155 / 255, 158 / 255, 184 / 255),
  new THREE.Color(71 / 255, 97 / 255, 124 / 255),
  new THREE.Color(53 / 255, 57 / 255, 85 / 255),
];

export const GAS_CLOUD_COLORS = [
  new THREE.Color(0.941176, 0.709804, 0.254902),
  new THREE.Color(0.811765, 0.458824, 0.168627),
  new THREE.Color(0.670588, 0.317647, 0.188235),
  new THREE.Color(0.490196, 0.219608, 0.2),
];

export const GAS_BASE_COLORS = [
  new THREE.Color(0.231373, 0.12549, 0.152941),
  new THREE.Color(0.231373, 0.12549, 0.152941),
  new THREE.Color(0.129412, 0.0941176, 0.105882),
  new THREE.Color(0.129412, 0.0941176, 0.105882),
];

export const BASE_LAVA_COLORS = [
  new THREE.Color(0.560784, 0.301961, 0.341176),
  new THREE.Color(0.321569, 0.2, 0.247059),
  new THREE.Color(0.239216, 0.160784, 0.211765),
];

export const BASE_OCEAN_COLORS = [
  new THREE.Color(0.572549, 0.909804, 0.752941),
  new THREE.Color(0.309804, 0.643137, 0.721569),
  new THREE.Color(0.172549, 0.207843, 0.301961),
];

export const EARTH_COLORS = [
  new THREE.Color(0.388, 0.671, 0.247),
  new THREE.Color(0.231, 0.49, 0.31),
  new THREE.Color(0.184, 0.341, 0.325),
  new THREE.Color(0.157, 0.208, 0.251),
];

export const BASE_CRATER_COLORS = [
  new THREE.Color(71 / 255, 97 / 255, 124 / 255),
  new THREE.Color(53 / 255, 57 / 255, 85 / 255),
];

export const BASE_LAVA_CRATER_COLORS = [
  new THREE.Color(0.321569, 0.2, 0.247059),
  new THREE.Color(0.239216, 0.160784, 0.211765),
];

export const BASE_LAVA_RIVER_COLORS = [
  new THREE.Color(1, 0.537255, 0.2),
  new THREE.Color(0.901961, 0.270588, 0.223529),
  new THREE.Color(0.678431, 0.184314, 0.270588),
];

export const BASE_CLOUD_COLORS = [
  new THREE.Color(0.960784, 1, 0.909804),
  new THREE.Color(0.87451, 0.878431, 0.909804),
  new THREE.Color(0.407843, 0.435294, 0.6),
  new THREE.Color(0.25098, 0.286275, 0.45098),
];

export const BASE_LAND_MASS_COLORS = [
  new THREE.Color(0.784314, 0.831373, 0.364706),
  new THREE.Color(0.388235, 0.670588, 0.247059),
  new THREE.Color(0.184314, 0.341176, 0.32549),
  new THREE.Color(0.156863, 0.207843, 0.25098),
];

// export const BASE_CLOUD_COLORS = [
//   new THREE.Color(0.882353, 0.94902, 1),
//   new THREE.Color(0.752941, 0.890196, 1),
//   new THREE.Color(0.368627, 0.439216, 0.647059),
//   new THREE.Color(0.25098, 0.286275, 0.45098),
// ];

export const BASE_ATMOSPHERE_COLORS = [
  new THREE.Color(173 / 255, 216 / 255, 230 / 255),
  new THREE.Color(0 / 255, 127 / 255, 255 / 255),
  new THREE.Color(0 / 255, 0 / 255, 128 / 255),
];

export const BASE_RIVER_COLOR = new THREE.Color(0.309804, 0.643137, 0.721569);
export const BASE_RIVER_COLOR_DARK = new THREE.Color(0.25098, 0.286275, 0.45098);

export const BASE_TERRAN_LAND_COLORS = [
  new THREE.Color(0.388235, 0.670588, 0.247059),
  new THREE.Color(0.231373, 0.490196, 0.309804),
  new THREE.Color(0.184314, 0.341176, 0.32549),
  new THREE.Color(0.156863, 0.207843, 0.25098),
];

const BASE_TERRAN_RIVER_LIGHT_COLOR = new THREE.Color(0.309804, 0.643137, 0.721569);
const BASE_TERRAN_RIVER_DARK_COLOR = new THREE.Color(0.25098, 0.286275, 0.45098);

export const BASE_TERRAN_COLORS = [
  ...BASE_TERRAN_LAND_COLORS,
  BASE_TERRAN_RIVER_LIGHT_COLOR,
  BASE_TERRAN_RIVER_DARK_COLOR,
];

export const BASE_LAKE_COLORS = [
  new THREE.Color(79 / 255, 164 / 255, 184 / 255),
  new THREE.Color(76 / 255, 104 / 255, 133 / 255),
  new THREE.Color(58 / 255, 63 / 255, 94 / 255),
];

export const BLUE_LAVA_BASE_COLORS = [
  new THREE.Color("#50478A"),
  new THREE.Color("#422F5C"),
  new THREE.Color("#28182E"),
];

export const BLUE_LAVA_CRATER_COLORS = [new THREE.Color("#422F5C"), new THREE.Color("#28182E")];

export const BLUE_LAVA_RIVER_COLORS = [
  new THREE.Color("#51D9DA"),
  new THREE.Color("#366C91"),
  new THREE.Color("#1B2449"),
];
