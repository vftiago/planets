varying vec3 vUv;

uniform float pixels;
uniform float rotation;
uniform vec2 light_origin;
uniform float time_speed;
uniform float disk_width;
uniform float ring_perspective;
uniform int should_dither;
uniform vec3 colorScheme[5];

uniform float size;
uniform int OCTAVES;
uniform float seed;
uniform float time;

float rand(vec2 coord) {
    coord = mod(coord, vec2(2.0, 1.0) * round(size));
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

float circleNoise(vec2 uv) {
    float uv_y = floor(uv.y);
    uv.x += uv_y * 0.31;
    vec2 f = fract(uv);
    float h = rand(vec2(floor(uv.x), floor(uv_y)));
    float m = (length(f - vec2(0.25) - (h * 0.5)));
    float r = h * 0.25;
    return smoothstep(0.0, r, m * 0.75);
}

bool dither(vec2 uv_pixel, vec2 uv_real) {
    return mod(uv_pixel.x + uv_real.y, 2.0 / pixels) <= 1.0 / pixels;
}

vec2 spherify(vec2 uv) {
    vec2 centered = uv * 2.0 - 1.0;
    float z = sqrt(1.0 - dot(centered.xy, centered.xy));
    vec2 sphere = centered / (z + 1.0);
    return sphere * 0.5 + 0.5;
}

vec2 rotate(vec2 coord, float angle) {
    coord -= 0.5;
    coord *= mat2(vec2(cos(angle), -sin(angle)), vec2(sin(angle), cos(angle)));
    return coord + 0.5;
}

void main() {
    // Pixelize uv
    vec2 uv = (floor(vUv.xy*pixels)/pixels) + 0.5;

    // We use this value later to dither between colors
    bool dith = bool(should_dither);

    uv = rotate(uv, rotation);

    // Keep an undistorted version of the current uvs
    vec2 uv2 = uv;

    // Compress uv along the x axis, or the accretion disk will look too stretched out
    uv.x -= 0.5;
    uv.x *= 1.3;
    uv.x += 0.5;

    // Add a bit of movement to the accretion disk by wobbling it, completely optional and can be disabled.
    uv = rotate(uv, sin(time * time_speed * 2.0) * 0.01);

    // L_origin will be used to determine how to color the pixels
    vec2 l_origin = vec2(0.5);

    // D_width will be the final width of the accretion disk
    float d_width = disk_width;

    // Here we distort the uvs to achieve the shape of the accretion disk
    if (uv.y < 0.5) {
        // If we are in the top half of the image, then add to the uv.y based on how close we are to the center
        uv.y += smoothstep(distance(vec2(0.5), uv), 0.5, 0.2);
        // And also the ring width has to be adjusted or it will look too stretched out
        d_width += smoothstep(distance(vec2(0.5), uv), 0.5, 0.3);

        // Another optional thing that changes the color distribution, I like it, but can be disabled.
        l_origin.y -= smoothstep(distance(vec2(0.5), uv), 0.5, 0.2);
    }
    // We don't check for exactly uv.y > 0.5 because we want a small area where the ring
    // is unaffected by stretching, the middle part that goes over the black hole.
    else if (uv.y > 0.53) {

        // Same steps as before, but uv.y and light is stretched the other way, the disk width is slightly smaller here for visual effect.
        uv.y -= smoothstep(distance(vec2(0.5), uv), 0.4, 0.17);
        d_width += smoothstep(distance(vec2(0.5), uv), 0.5, 0.2);
        l_origin.y += smoothstep(distance(vec2(0.5), uv), 0.5, 0.2);
    }

    // Get distance to light origin based on unaltered uv's we saved earlier, some math to account for perspective
    float light_d = distance(uv2 * vec2(1.0, ring_perspective), l_origin * vec2(1.0, ring_perspective)) * 0.3;

    // Center is used to determine ring position
    vec2 uv_center = uv - vec2(0.0, 0.5);

    // Tilt ring
    uv_center *= vec2(1.0, ring_perspective);
    float center_d = distance(uv_center, vec2(0.5, 0.0));

    // Cut out 2 circles of different sizes and only intersection of the 2.
    // This actually makes the disk
    float disk = smoothstep(0.1 - d_width * 2.0, 0.5 - d_width, center_d);
    disk *= smoothstep(center_d - d_width, center_d, 0.4);

    // Rotate noise in the disk
    uv_center = rotate(uv_center + vec2(0.0, 0.5), time * time_speed * 3.0);

    // Some noise
    disk *= pow(fbm(uv_center * size), 0.5);

    // Apply dithering
    if (dith || !bool(should_dither)) {
        disk *= 1.2;
    }

    // Apply some colors based on the final value
    vec3 finalColor;

    float posterized = floor((disk + light_d) * 4.0) / 4.0;

    if (posterized < 0.25) {
        finalColor = colorScheme[0];
    } else if (posterized < 0.5) {
        finalColor = colorScheme[1];
    } else if (posterized < 0.75) {
        finalColor = colorScheme[2];
    } else if (posterized < 1.0) {
        finalColor = colorScheme[3];
    } else {
        finalColor = colorScheme[4];
    }

    // This can be toggled on to achieve a more "realistic" black hole, with red and blue shifting. This was just me messing around so can probably be more optimized and done cleaner
    // finalColor.rgb *= 1.0 - pow(uv.x, 1.0);
    // finalColor.gb *= 1.0 - pow(uv.x, 2.0);
    // finalColor.b *= 3.0 - pow(uv.x, 4.0);
    // finalColor.gb *= 2.0 - pow(uv.x, 2.0);
    // finalColor.rgb *= pow(uv.x, 0.15);

    float disk_a = step(0.15, disk);
    gl_FragColor = vec4(finalColor.rgb, disk_a);
}
