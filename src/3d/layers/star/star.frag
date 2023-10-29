varying vec3 vUv;
uniform float pixels;
uniform float time_speed;
uniform float time;
uniform float rotation;
uniform sampler2D colorramp;
bool should_dither = true;

uniform float seed;
float size = 4.463;
int OCTAVES = 4;
float TILES = 2.0;

uniform vec3 colorscheme[4];

float rand(vec2 co) {
    co = mod(co, vec2(1.0,1.0)*floor(size+0.5));
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 15.5453 * seed);
}

vec2 rotate(vec2 vec, float angle) {
    vec -=vec2(0.5);
    vec *= mat2(vec2(cos(angle),-sin(angle)), vec2(sin(angle),cos(angle)));
    vec += vec2(0.5);
    return vec;
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

vec2 Hash2(vec2 p) {
    float r = 523.0*sin(dot(p, vec2(53.3158, 43.6143)));
    return vec2(fract(15.32354 * r), fract(17.25865 * r));
}

float cells(in vec2 p, in float numCells) {
    p *= numCells;
    float d = 1.0e10;
    for (int xo = -1; xo <= 1; xo++)
    {
        for (int yo = -1; yo <= 1; yo++)
        {
            vec2 tp = floor(p) + vec2(float(xo), float(yo));
            tp = p - tp - Hash2(mod(tp, numCells / TILES));
            d = min(d, dot(tp, tp));
        }
    }
    return sqrt(d);
}

bool dither(vec2 uv1, vec2 uv2) {
    return mod(uv1.x+uv2.y,2.0/pixels) <= 1.0 / pixels;
}

vec2 spherify(vec2 uv) {
    vec2 centered= uv *2.0-1.0;
    float z = sqrt(1.0 - dot(centered.xy, centered.xy));
    vec2 sphere = centered/(z + 1.0);
    return sphere * 0.5+0.5;
}


void main() {
    vec2 pixelized = (floor(vUv.xy*pixels)/pixels) + 0.5;

    // cut out a circle
    // stepping over 0.5 instead of 0.49999 makes some pixels a little buggy
    float a = step(distance(pixelized, vec2(0.5)), .49999);
    
    // use dither val later to mix between colors
    bool dith = dither(vUv.xy, pixelized);
    
    pixelized = rotate(pixelized, rotation);
    
    // spherify has to go after dither
    pixelized = spherify(pixelized);
    
    // use two different sized cells for some variation
    float n = cells(pixelized - vec2(time * time_speed * 2.0, 0), 10.0);
    n *= cells(pixelized - vec2(time * time_speed * 1.0, 0), 20.0);

    
    // adjust cell value to get better looking stuff
    n*= 2.;
    n = clamp(n, 0.0, 1.0);
    if (dith || !should_dither) { // here we dither
        n *= 1.3;
    }
    
    // constrain values 4 possibilities and then choose color based on those
    float interpolate = floor(n * 3.0) / 3.0;

    // finally add colors
    vec3 finalColor;

    if (interpolate < 0.33) {
        finalColor = colorscheme[0];
    } else if (interpolate < 0.66) {
        finalColor = colorscheme[1];
    } else if (interpolate < 1.0) {
        finalColor = colorscheme[2];
    } else {
        finalColor = colorscheme[3];
    }
    
    gl_FragColor = vec4(finalColor.rgb, a);
}
