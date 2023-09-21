import * as THREE from "three";

export const generateNewColorScheme = (
  colorCount: number,
  hueDiff: number = 0.9,
  saturation: number = 0.5
): THREE.Vector4[] => {
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

  const cols: THREE.Vector4[] = [];
  let n = colorCount - 1;
  n = Math.max(1, n);

  for (let i = 0; i < colorCount; i++) {
    const vec3 = new THREE.Vector3();
    const t = i / n;

    vec3.x = a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x));
    vec3.y = a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y));
    vec3.z = a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z));

    cols.push(new THREE.Vector4(vec3.x, vec3.y, vec3.z, 1));
  }

  return cols;
};

export const randomizeColors = (): THREE.Vector4[] => {
  const colorCount = 5 + Math.floor(Math.random() * 3);
  const hueDiff = THREE.MathUtils.randFloat(0.3, 0.65);
  const saturation = 1.0;
  const seedColors = generateNewColorScheme(colorCount, hueDiff, saturation);
  const cols: THREE.Vector4[] = [];

  for (let i = 0; i < 5; i++) {
    const baseColor = seedColors[i];
    const newCol = new THREE.Vector4(
      Math.max(0, baseColor.x - i / 5.0),
      Math.max(0, baseColor.y - i / 5.0),
      Math.max(0, baseColor.z - i / 5.0),
      1
    );

    cols.push(newCol);
  }

  return cols;
};
