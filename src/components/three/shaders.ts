export const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export const dataSphereVertex = /* glsl */ `
uniform float uTime;
uniform float uDistort;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisplace;
varying vec2 vUv;

${NOISE_GLSL}

void main() {
  vUv = uv;
  float t = uTime * 0.45;
  float n1 = snoise(normal * uDistort + t);
  float n2 = snoise(normal * uDistort * 1.7 - t * 1.3);
  float displacement = (n1 * 0.6 + n2 * 0.4) * 0.28;
  vec3 pos = position + normal * displacement;
  vDisplace = displacement;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const dataSphereFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisplace;
varying vec2 vUv;

void main() {
  float fresnel = pow(1.0 - max(dot(normalize(vView), normalize(vNormal)), 0.0), 2.2);
  vec3 base = mix(uColorA, uColorB, clamp(vUv.y + vDisplace * 2.0, 0.0, 1.0));
  float lines = sin(vUv.y * 60.0 + uTime * 1.4) * 0.5 + 0.5;
  base += lines * 0.07;
  vec3 glow = base * fresnel * 1.1;
  float alpha = 0.72 + fresnel * 0.28;
  gl_FragColor = vec4(base + glow, alpha);
}
`;

export const wireVertex = /* glsl */ `
uniform float uTime;
varying float vFade;
${NOISE_GLSL}
void main() {
  float n = snoise(normal * 1.4 + uTime * 0.3);
  vec3 pos = position + normal * n * 0.06;
  vFade = n * 0.5 + 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const wireFragment = /* glsl */ `
uniform vec3 uColor;
varying float vFade;
void main() {
  gl_FragColor = vec4(uColor, 0.14 + vFade * 0.12);
}
`;

export const particleVertex = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
uniform vec2 uMouse;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec3 p = position;
  // slow drift
  p.x += sin(uTime * 0.05 + aPhase) * 0.4;
  p.y += cos(uTime * 0.04 + aPhase * 1.3) * 0.4;
  p.z += sin(uTime * 0.03 + aPhase * 0.7) * 0.6;
  // gentle mouse parallax
  p.x += (uMouse.x - 0.5) * 1.2;
  p.y += (uMouse.y - 0.5) * 1.2;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * uPixelRatio * (240.0 / -mvPosition.z);
  vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + aPhase) + aPhase * 6.0));
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragment = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * vAlpha * 0.55);
}
`;
