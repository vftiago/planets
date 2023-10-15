TODO: implement the following solution across all materials to allow for scaling when necessary:

- To achieve a similar effect as `set_shader_param`, you can use shader uniforms in Three.js. If you're using a custom shader material, define a uniform for the scaling factor and set its value in your shader.

Example (in the shader):

```glsl
uniform float scale; // Add this uniform to your shader

void main() {
    // Apply the scale to your vertex or fragment shader calculations
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * vec3(scale, scale, 1), 1.0);
}
```

Example (in Three.js JavaScript):

```javascript
// Assuming you've created a ShaderMaterial
var material = new THREE.ShaderMaterial({
  uniforms: {
    scale: { value: amount * relativeScale }, // Set the uniform value
  },
  // ... other shader properties
});
```
