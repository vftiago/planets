varying vec3 vUv;

uniform float pixels;
uniform vec3 black_hole_colors[2];
uniform vec4 black_color;
uniform float radius;
uniform float light_width;

void main() {
  // Pixelize uv
  vec2 uv = (floor(vUv.xy*pixels)/pixels) + 0.5;

  // Distance from center
  float d_to_center = distance(uv, vec2(0.5));

  vec4 finalColor = black_color;

  if (d_to_center > radius - light_width) {
    float col_val = ceil(d_to_center - (radius - (light_width * 0.5))) * (1.0 / (light_width * 0.5));

    if (col_val < 0.25) {
        finalColor = vec4(black_hole_colors[0], 1);
    } else {
        finalColor =  vec4(black_hole_colors[1], 1);
    }
  }

  float a = step(d_to_center, radius);

  gl_FragColor = vec4(finalColor.rgb, a);
}
