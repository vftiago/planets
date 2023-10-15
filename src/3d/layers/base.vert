varying vec3 vUv;
float scale = 1.0;

void main() {
  vUv = position; 

  vec4 modelViewPosition = modelViewMatrix * vec4(position * vec3(scale, scale, 1), 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
