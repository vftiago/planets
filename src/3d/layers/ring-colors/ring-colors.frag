varying vec3 vUv;
uniform float pixels;
uniform float rotation;
uniform vec2 light_origin;
uniform float time_speed;
float light_border_1 = 0.4;
float light_border_2 = 0.6;
uniform float ring_width;
uniform float ring_perspective;
uniform float scale_rel_to_planet;

uniform vec3 colorscheme[3];
uniform vec3 dark_colorscheme[3];

float size = 25.0;
int OCTAVES = 8;
uniform float seed;
uniform float time;

float rand(vec2 coord) {
    coord = mod(coord, vec2(2.0,1.0)*floor(size+0.5));
    return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 15.5453 * seed);
}

float noise(vec2 coord){
    vec2 i = floor(coord);
    vec2 f = fract(coord);
    
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 cubic = f * f * (3.0 - 2.0 * f);

    return mix(a, b, cubic.x) + (c - a) * cubic.y * (1.0 - cubic.x) + (d - b) * cubic.x * cubic.y;
}

float fbm(vec2 coord){
    float value = 0.0;
    float scale = 0.5;

    for(int i = 0; i < OCTAVES ; i++){
        value += noise(coord) * scale;
        coord *= 2.0;
        scale *= 0.5;
    }
    return value;
}

vec2 spherify(vec2 uv) {
    vec2 centered= uv *2.0-1.0;
    float z = sqrt(1.0 - dot(centered.xy, centered.xy));
    vec2 sphere = centered/(z + 1.0);
    return sphere * 0.5+0.5;
}

vec2 rotate(vec2 coord, float angle){
    coord -= 0.5;
    coord *= mat2(vec2(cos(angle),-sin(angle)),vec2(sin(angle),cos(angle)));
    return coord + 0.5;
}

void main() {
    // pixelize uv
    vec2 uv = (floor(vUv.xy*pixels)/pixels) + 0.5;
    
    float light_d = distance(uv, light_origin);
    uv = rotate(uv, rotation);

    float a = step(length(uv-vec2(0.5)), 0.49999);
    
    // center is used to determine ring position
    vec2 uv_center = uv - vec2(0.0, 0.5);
    
    // tilt ring
    uv_center *= vec2(1.0, ring_perspective);
    float center_d = distance(uv_center,vec2(0.5, 0.0));
    
    // cut out 2 circles of different sizes and only intersection of the 2.
    float ring = smoothstep(0.5-ring_width*2.0, 0.5-ring_width, center_d);
    ring *= smoothstep(center_d-ring_width, center_d, 0.4);
    
    // pretend like the ring goes behind the planet by removing it if it's in the upper half.
    if (uv.y < 0.5) {
        ring *= step(1.0/scale_rel_to_planet, distance(uv,vec2(0.5)));
    }
    
    // rotate material in the ring
    uv_center = rotate(uv_center+vec2(0, 0.5), time*time_speed);
    // some noise
    // ring *= fbm(uv_center*size);
    
    // apply some colors based on final value
    vec3 finalColor;

    float posterized = floor((ring+pow(light_d, 2.0)*2.0)*4.0)/4.0;

    if (posterized <= 1.0) {
      if (posterized < 0.498182) {
          finalColor = colorscheme[0];
      } else if (posterized < 1.0) {
          finalColor = colorscheme[1];
      } else {
          finalColor = colorscheme[2];
      }
    } else {     
      if (posterized - 1.0 < 0.498182) {
          finalColor = dark_colorscheme[0];
      } else if (posterized - 1.0 < 1.0) {
          finalColor = dark_colorscheme[1];
      } else {
          finalColor = dark_colorscheme[2];
      }
    }

    float ring_a = step(0.28, ring);

    gl_FragColor = vec4(finalColor, a * ring_a);
}
