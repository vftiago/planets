varying vec3 vUv;

uniform float pixels;
uniform float rotation;
uniform float time_speed;
uniform float dither_size;
uniform bool should_dither;
uniform vec3 colorScheme[6];
uniform float size;
uniform int OCTAVES;
uniform float seed;
uniform float time;
uniform float tilt;
uniform float n_layers;
uniform float layer_height;
uniform float zoom;
uniform float n_colors;
uniform float swirl;

float rand(vec2 coord) {
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 15.5453 * seed);
}

float noise(vec2 coord) {
    vec2 i = floor(coord);
    vec2 f = fract(coord);

    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 cubic = f * f * (3.0 - 2.0 * f);

    return mix(a, b, cubic.x) + (c - a) * cubic.y * (1.0 - cubic.x) + (d - b) * cubic.x * cubic.y;
}

float fbm(vec2 coord) {
    float value = 0.0;
    float scale = 0.5;

    for (int i = 0; i < OCTAVES; i++) {
        value += noise(coord) * scale;
        coord *= 2.0;
        scale *= 0.5;
    }
    return value;
}

vec2 rotate(vec2 coord, float angle) {
    coord -= 0.5;
    coord *= mat2(vec2(cos(angle), -sin(angle)), vec2(sin(angle), cos(angle)));
    return coord + 0.5;
}

bool dither(vec2 uv1, vec2 uv2) {
    return mod(uv1.x + uv2.y, 2.0 / pixels) <= 1.0 / pixels;
}

void main() {
    vec2 uv = (floor(vUv.xy*pixels)/pixels) + 0.5;
    bool dith = dither(uv, vUv.xy);

	  // I added a little zooming functionality so I dont have to mess with other values to get correct sizing.
    uv *= zoom;
    uv -= (zoom - 1.0) / 2.0;

    // overall rotation of galaxy
    uv = rotate(uv, rotation);
    vec2 uv2 = uv;

    // this uv is used to determine where the "layers" will be
    uv.y *= tilt;
    uv.y -= (tilt - 1.0) / 2.0;

    float d_to_center = distance(uv, vec2(0.5, 0.5));
    // swirl uv around the center, the further from the center the more rotated.
    float rot = swirl * pow(d_to_center, 0.4);
    vec2 rotated_uv = rotate(uv, rot + time * time_speed);

    // fbm will decide where the layers are
    float f1 = fbm(rotated_uv * size);
    // quantize to a few different values, so layers don't blur through each other
    f1 = floor(f1 * n_layers) / n_layers;

    // use the unaltered second uv for the actual galaxy
	  // tilt so it looks like it's an angle.
    uv2.y *= tilt;
    uv2.y -= (tilt - 1.0) / 2.0 + f1 * layer_height;

    // now do the same stuff as before, but for the actual galaxy image, not the layers
    float d_to_center2 = distance(uv2, vec2(0.5, 0.5));
    float rot2 = swirl * pow(d_to_center2, 0.4);
    vec2 rotated_uv2 = rotate(uv2, rot2 + time * time_speed);
    // I offset the second fbm by some amount so the don't all use the same noise, try it wihout and the layers are very obvious
    float f2 = fbm(rotated_uv2 * size + vec2(f1) * 10.0);

    // alpha
    float a = step(f2 + d_to_center2, 0.7);

    // some final steps to choose a nice color
    f2 *= 2.3;
    if (should_dither && dith) {
        f2 *= 0.94;
    }

    f2 = floor(f2 * (n_colors + 1.0)) / n_colors;

    // calculate the index (integer part of f2) and its fractional part.
    int index = int(f2 * n_colors);

    // ensure that the index doesn't exceed the maximum index
    if (index > 5) {
        index = 5;
    }
    // calculate the fractional part of f2
    float fraction = fract(f2 * n_colors);

    // use the index to access two adjacent colors in the colorscheme.
    vec3 color1 = colorScheme[index];
    vec3 color2 = colorScheme[index + 1];

    vec3 finalColor = mix(color1, color2, fraction);

    // if (f2 < 0.2) {
    //     finalColor = colorScheme[0];
    // } else if (f2 < 0.4) {
    //     finalColor = colorScheme[1];
    // } else if (f2 < 0.6) {
    //     finalColor = colorScheme[2];
    // } else if (f2 < 0.8) {
    //     finalColor = colorScheme[3];
    // } else if (f2 < 1.0) {
    //     finalColor = colorScheme[4];
    // } else {
    //     finalColor = colorScheme[5];
    // }

    gl_FragColor = vec4(finalColor.rgb, a);
}
