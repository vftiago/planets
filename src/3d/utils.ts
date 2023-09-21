import * as THREE from "three";

export const generateSeedColors = (
  colorCount: number,
  hueDiff: number = 0.9,
  saturation: number = 0.5
): THREE.Color[] => {
  const a = new THREE.Vector3(0.5, 0.5, 0.5);
  const b = new THREE.Vector3(0.5, 0.5, 0.5).multiplyScalar(saturation);
  const c = new THREE.Vector3(
    THREE.MathUtils.randFloat(0.5, 1.5) * hueDiff,
    THREE.MathUtils.randFloat(0.5, 1.5) * hueDiff,
    THREE.MathUtils.randFloat(0.5, 1.5) * hueDiff
  );
  const d = new THREE.Vector3(
    THREE.MathUtils.randFloat(0, 1),
    THREE.MathUtils.randFloat(0, 1),
    THREE.MathUtils.randFloat(0, 1)
  ).multiplyScalar(THREE.MathUtils.randFloat(1, 3));

  const colors: THREE.Color[] = [];

  const n = Math.max(1, colorCount - 1);

  for (let i = 0; i < colorCount; i++) {
    const vec3 = new THREE.Vector3();

    const t = i / n;

    vec3.x = a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x));
    vec3.y = a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y));
    vec3.z = a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z));

    colors.push(new THREE.Color(vec3.x, vec3.y, vec3.z));
  }

  return colors;
};

export const randomizeColors = (): THREE.Color[] => {
  const colorCount = 5 + Math.floor(Math.random() * 3);
  const hueDiff = THREE.MathUtils.randFloat(0.3, 0.65);
  const saturation = 1.0;

  const seedColors = generateSeedColors(colorCount, hueDiff, saturation);
  const colors: THREE.Color[] = [];

  for (let i = 0; i < 5; i++) {
    const newColor = seedColors[i]
      .clone()
      .offsetHSL(0, 0, -(i / 5.0))
      .offsetHSL(0, 0, (1.0 - i / 5.0) * 0.2);

    colors.push(newColor);
  }

  return colors;
};
