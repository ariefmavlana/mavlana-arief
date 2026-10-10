import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'

export async function createSculpture(gltf, quality) {
  const model = await gltf.loadAsync('/experience/e.glb')
  model.scene.updateMatrixWorld(true)
  let source
  model.scene.traverse((object) => {
    if (object.isMesh && !source) source = object
  })
  const letter = source.geometry.clone().applyMatrix4(source.matrixWorld)
  letter.center().computeBoundingBox()
  const size = new THREE.Vector3()
  letter.boundingBox.getSize(size)
  letter.scale(
    12.5 / Math.max(size.x, size.y, size.z),
    12.5 / Math.max(size.x, size.y, size.z),
    18.75 / Math.max(size.x, size.y, size.z),
  )
  const cube = new THREE.BoxGeometry(6, 6, 6)
  const sphere = new THREE.SphereGeometry(6, 32, 24)
  const torus = new THREE.TorusGeometry(4.5, 1.5, 20, 64)
  const samplers = [letter, cube, sphere, torus].map((geometry) =>
    new MeshSurfaceSampler(new THREE.Mesh(geometry)).build(),
  )
  const count = quality === 'high' ? 78400 : 48400
  const arrays = Array.from({ length: 5 }, () => new Float32Array(count * 3))
  const seeds = new Float32Array(count)
  const colors = new Float32Array(count * 3)
  const palette = ['#9047ff', '#8844ee', '#cc66ff', '#6622cc', '#e7f5f5'].map(
    (value) => new THREE.Color(value),
  )
  const color = new THREE.Color()
  const point = new THREE.Vector3()
  const heartRotation = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    THREE.MathUtils.degToRad(-75),
  )
  for (let i = 0; i < count; i++) {
    for (let shape = 0; shape < 4; shape++) {
      samplers[shape].sample(point)
      if (shape === 2) point.multiplyScalar(Math.cbrt(Math.random()))
      if (shape === 3) {
        const around = Math.random() * Math.PI * 2
        const tube = Math.random() * Math.PI * 2
        const radius = 1.5 * Math.cbrt(Math.random())
        point.set(
          (4.5 + radius * Math.cos(tube)) * Math.cos(around),
          (4.5 + radius * Math.cos(tube)) * Math.sin(around),
          radius * Math.sin(tube),
        )
      }
      point.toArray(arrays[shape === 3 ? 4 : shape], i * 3)
    }
    const angle = Math.random() * Math.PI * 2
    const fill = Math.sqrt(Math.random())
    const jitter = Math.cbrt(Math.random()) * 0.6
    point.set(
      16 * Math.sin(angle) ** 3 * 0.245 + (Math.random() - 0.5) * jitter * 1.5,
      (13 * Math.cos(angle) -
        5 * Math.cos(2 * angle) -
        2 * Math.cos(3 * angle) -
        Math.cos(4 * angle)) *
        0.245 +
        (Math.random() - 0.5) * jitter * 1.5,
      (Math.random() - 0.5) * 4.9 + (Math.random() - 0.5) * jitter,
    )
    point.x *= fill
    point.y *= fill
    point.z *= Math.sqrt(1 - fill * fill)
    point.applyQuaternion(heartRotation).toArray(arrays[3], i * 3)
    seeds[i] = Math.random()
    if (Math.random() < 0.11)
      color.copy(palette[4]).lerp(palette[0], Math.random() * 0.4)
    else {
      const band = Math.random()
      if (band < 0.3)
        color
          .copy(palette[0])
          .lerp(palette[2], Math.sin((i / count) * Math.PI * 4) * 0.3 + 0.5)
      else if (band < 0.6)
        color
          .copy(palette[0])
          .lerp(palette[1], Math.sin((i / count) * Math.PI * 3) * 0.4 + 0.5)
      else
        color
          .copy(palette[1])
          .lerp(palette[3], Math.sin((i / count) * Math.PI * 5) * 0.3 + 0.4)
    }
    color.toArray(colors, i * 3)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(arrays[0], 3))
  arrays
    .slice(1)
    .forEach((array, i) =>
      geometry.setAttribute(
        `shape${i + 1}`,
        new THREE.BufferAttribute(array, 3),
      ),
    )
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      lightDirView: { value: new THREE.Vector3() },
      halfDirView: { value: new THREE.Vector3() },
      centerColor: { value: new THREE.Color(14006783) },
      tintColor: { value: new THREE.Color(15915519) },
      rimCool: { value: new THREE.Color(6740479) },
      rimWarm: { value: new THREE.Color(15892735) },
      specColor: { value: new THREE.Color(12556799) },
      progress: { value: 0 },
      pixelRatio: { value: 1 },
      pointer: { value: new THREE.Vector2(10, 10) },
    },
    vertexShader: `
      attribute vec3 shape1; attribute vec3 shape2; attribute vec3 shape3; attribute vec3 shape4;
      attribute float seed; attribute vec3 color;
      uniform float time; uniform float progress; uniform float pixelRatio; uniform vec2 pointer;
      varying float shade; varying float energy; varying vec3 vColor;
      void main() {
        vec3 p = mix(position,shape1,smoothstep(.03,.22,progress));
        p = mix(p,shape2,smoothstep(.28,.47,progress));
        p = mix(p,shape3,smoothstep(.53,.72,progress));
        p = mix(p,shape4,smoothstep(.78,.97,progress));
        float phase = seed * 6.28318;
        vec3 flow = vec3(
          sin(p.y*.8 + time*.5 + phase) + cos(p.z*.6 - time*.3),
          sin(p.z*.7 + time*.4 + phase) + cos(p.x*.8 + time*.35),
          sin(p.x*.6 - time*.45 + phase) + cos(p.y*.7 + time*.25)
        );
        float drift = mix(.22, .85, seed * seed);
        float morph = sin(fract(progress * 4.) * 3.14159);
        float heart = smoothstep(.53,.72,progress) * (1.-smoothstep(.78,.97,progress));
        p += flow * (drift + morph * .35) * mix(1.,.25,heart);
        p += normalize(p + vec3(.01)) * pow(seed, 18.) * mix(1.8,.5,heart);
        vec4 view = modelViewMatrix * vec4(p,1.);
        vec4 clip = projectionMatrix * view;
        vec2 away = clip.xy/clip.w-pointer;
        view.xy += normalize(away+vec2(.001)) * exp(-dot(away,away)*45.) * .8;
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(.6 * pixelRatio * 350. / -view.z, 2., 100.) * .84;
        shade = seed;
        vec3 center = (modelViewMatrix * vec4(0.,0.,0.,1.)).xyz;
        energy = pow(1.-smoothstep(0.,7.,length(view.xy-center.xy)),2.);
        energy *= mix(1.,.6,heart);
        vColor = color;
      }`,
    fragmentShader: `
      varying float shade; varying float energy; varying vec3 vColor;
      uniform float time;
      uniform vec3 lightDirView, halfDirView, centerColor, tintColor, rimCool, rimWarm, specColor;
      void main() {
        vec2 uv = (gl_PointCoord - .5) * .84;
        float d = length(uv);
        if (d > .42) discard;
        vec3 normal = vec3(uv.x,-uv.y,sqrt(max(0.,.25-d*d))) * 2.;
        float diffuse = max(dot(normal,lightDirView),0.);
        float rim = 1. - max(normal.z,0.);
        vec3 color = vColor * (diffuse * .4 + .6) * (smoothstep(-.3,.4,normal.y) * .25 + .75) * 1.2;
        color += vColor * pow(1.-diffuse,2.) * .18;
        color += mix(rimWarm,rimCool,rim*rim) * pow(rim,3.) * .4;
        color += specColor * pow(max(dot(normal,halfDirView),0.),24.) * .25;
        color += centerColor * energy * 1.65;
        color *= (1. + .05 * sin(time * 1.5 + shade * 6.28318)) * tintColor * 1.3 * (1. + energy * .3);
        gl_FragColor=vec4(color,1.-smoothstep(.36,.42,d));
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: true,
    blending: THREE.NormalBlending,
  })
  const points = new THREE.Points(geometry, material)
  points.position.set(0, 4.5, -7)
  points.frustumCulled = false
  for (const item of [letter, cube, sphere, torus]) item.dispose()
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.geometry.dispose()
      object.material.dispose()
    }
  })
  return points
}
