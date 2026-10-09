import * as THREE from 'three'

export function createTreePetals(tree, quality) {
  const leaves = tree.leavesMesh.geometry.attributes.position
  const count = quality === 'high' ? 1000 : 500
  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const sizes = new Float32Array(count)
  const ranges = new Float32Array(count)
  const velocities = new Float32Array(count)
  const anchor = new THREE.Vector3()
  const vertex = new THREE.Vector3()
  const random = new tree.rng.constructor(7419)
  for (let i = 0; i < count; i++) {
    const start = Math.floor(random.random() * (leaves.count / 4)) * 4
    anchor.set(0, 0, 0)
    for (let j = 0; j < 4; j++)
      anchor.add(vertex.fromBufferAttribute(leaves, start + j))
    anchor.multiplyScalar(tree.scale.x / 4).add(tree.position)
    anchor.toArray(positions, i * 3)
    phases[i] = random.random()
    sizes[i] = 0.6 + random.random() * 0.5
    velocities[i] = 0.6 + random.random() * 0.8
    ranges[i] = Math.max(anchor.y - 1.2, 1)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
  geometry.setAttribute('petalSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('fallRange', new THREE.BufferAttribute(ranges, 1))
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1))
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: 1 },
      map: { value: tree.leavesMesh.material.map },
      colorA: { value: new THREE.Color('#5a3a6e') },
      colorB: { value: new THREE.Color('#8b5e9f') },
      glowColor: { value: new THREE.Color('#8b5e9f') },
      glowStrength: { value: 0.05 },
    },
    vertexShader: `
      attribute float phase, petalSize, fallRange, velocity;
      uniform float time, pixelRatio;
      varying float vPhase, vRotation, vAlpha;
      vec2 drift(float fall, float t) {
        float angle = phase * 6.2831853;
        vec2 wind = vec2(.85,.53) * fall * 6. * (1. + .5 * sin(t * .6 + angle * 2.));
        wind += vec2(sin(t * (.6 + phase * .5) + angle),cos(t * (.6 + phase * .5) * .8 + angle * 1.3)) * (.6 + fall * 3.6);
        return wind;
      }
      vec2 avoidChair(vec2 p, vec2 center, float radius) {
        vec2 offset = p - center;
        return normalize(offset + vec2(.001)) * max(radius - length(offset),0.);
      }
      void main() {
        float hold = fallRange * .35 * step(fract(phase * 13.7), .25);
        float cycle = hold + fallRange * 31.;
        float elapsed = mod(time * velocity * 1.2 + phase * cycle * 7.,cycle);
        float fall = clamp(elapsed - hold,0.,fallRange) / fallRange;
        float t = time - max(0.,elapsed - hold - fallRange) / (velocity * 1.2);
        vec3 p = position;
        p.y -= fallRange * mix(fall * fall,fall,smoothstep(0.,.5,fall));
        vec2 landing = position.xz + drift(1.,t + fallRange * (1.-fall) / (velocity * 1.2));
        landing += avoidChair(landing,vec2(2.8,6.6),5.2) + avoidChair(landing,vec2(-6.5,.5),5.005);
        p.xz = mix(position.xz + drift(fall,t),landing,smoothstep(.3,.75,fall));
        p.y += sin(t * 2.2 + phase * 18.85) * (.3 + fall * .8) * (1.-smoothstep(.85,1.,fall));
        float rest = max(0.,(elapsed - hold - fallRange) / (cycle - hold - fallRange));
        vAlpha = smoothstep(0.,.08,max(fall,elapsed / max(hold,.001))) * (1.-smoothstep(.7,1.,rest));
        vPhase = phase;
        vRotation = min(max(0.,elapsed - hold) / (velocity * 1.2),fallRange / (velocity * 1.2)) * (1.5 + velocity) + phase * 6.2831853;
        vec4 view = modelViewMatrix * vec4(p,1.);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(petalSize * pixelRatio * 350. / -view.z,1.5,56.);
      }`,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec3 colorA, colorB, glowColor;
      uniform float time, glowStrength;
      varying float vPhase, vRotation, vAlpha;
      void main() {
        vec2 uv = gl_PointCoord * 2. - 1.;
        float c = cos(vRotation), s = sin(vRotation);
        uv = mat2(c,-s,s,c) * uv;
        uv.x *= 1. + sin(vRotation * .7) * .6;
        if (any(greaterThan(abs(uv),vec2(1.)))) discard;
        vec4 leaf = texture2D(map,uv * .5 + .5);
        float alpha = smoothstep(.1,.6,leaf.a) * vAlpha;
        if (alpha < .01) discard;
        float luminance = dot(leaf.rgb,vec3(.299,.587,.114));
        vec3 color = mix(colorA,colorB,vPhase) * luminance * 1.8 + glowColor * glowStrength;
        color *= 1. + 1.5 * pow(vPhase,3.) * (.75 + .25 * sin(time * (.5 + vPhase * 1.2) + vPhase * 37.));
        gl_FragColor = vec4(color,alpha);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
  })
  const petals = new THREE.Points(geometry, material)
  petals.frustumCulled = false
  return petals
}
