import * as THREE from "three";

const generateNewColorScheme = (nColors: number, hueDiff: number = 0.9, saturation: number = 0.5): THREE.Color[] => {
  const a = new THREE.Vector3(0.5, 0.5, 0.5);
  const b = new THREE.Vector3(0.5, 0.5, 0.5).multiplyScalar(saturation);
  const c = new THREE.Vector3(
    Math.random() * (1.5 - 0.5) + 0.5,
    Math.random() * (1.5 - 0.5) + 0.5,
    Math.random() * (1.5 - 0.5) + 0.5
  ).multiplyScalar(hueDiff);
  const d = new THREE.Vector3(Math.random() * 1.0, Math.random() * 1.0, Math.random() * 1.0).multiplyScalar(
    Math.random() * (3.0 - 1.0) + 1.0
  );

  const cols: THREE.Color[] = [];
  let n = nColors - 1;
  n = Math.max(1, n);

  for (let i = 0; i < nColors; i++) {
    const vec3 = new THREE.Vector3();
    const t = i / n;

    vec3.x = a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x));
    vec3.y = a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y));
    vec3.z = a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z));

    cols.push(new THREE.Color(vec3.x, vec3.y, vec3.z));
  }

  return cols;
};
