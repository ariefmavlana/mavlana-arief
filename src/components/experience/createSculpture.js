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
  const cube = new THREE.BoxGeometry(8, 8, 8)
  const sphere = new THREE.SphereGeometry(6, 32, 24)
  const torus = new THREE.TorusGeometry(4.5, 1.5, 20, 64)
  const samplers = [letter, cube, sphere, torus].map((geometry) =>
    new MeshSurfaceSampler(new THREE.Mesh(geometry)).build(),
  )
  const count = quality === 'high' ? 78400 : 30000
  const arrays = Array.from({ length: 5 }, () => new Float32Array(count * 3))
  const seeds = new Float32Array(count)
  const point = new THREE.Vector3()
  const heartRotation = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    THREE.MathUtils.degToRad(-75),
  )
  for (let i = 0; i < count; i++) {
    for (let shape = 0; shape < 4; shape++) {
      samplers[shape].sample(point)
      point.toArray(arrays[shape === 3 ? 4 : shape], i * 3)
    }
    const angle = Math.random() * Math.PI * 2
    const depth = Math.random() * 2 - 1
    const radius = Math.sqrt(1 - depth * depth)
    point.set(
      (16 * Math.sin(angle) ** 3 * radius) / 3,
      ((13 * Math.cos(angle) -
        5 * Math.cos(2 * angle) -
        2 * Math.cos(3 * angle) -
        Math.cos(4 * angle)) *
        radius) /
        3,
      depth * 2.5,
    )
    point.applyQuaternion(heartRotation).toArray(arrays[3], i * 3)
    seeds[i] = Math.random()
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
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      pixelRatio: { value: 1 },
      pointer: { value: new THREE.Vector2(10, 10) },
    },
    vertexShader: `
      attribute vec3 shape1; attribute vec3 shape2; attribute vec3 shape3; attribute vec3 shape4;
      attribute float seed;
      uniform float time; uniform float progress; uniform float pixelRatio; uniform vec2 pointer;
      varying float shade; varying float energy;
      void main() {
        vec3 p = mix(position,shape1,smoothstep(.12,.23,progress));
        p = mix(p,shape2,smoothstep(.32,.44,progress));
        p = mix(p,shape3,smoothstep(.57,.7,progress));
        p = mix(p,shape4,smoothstep(.8,.92,progress));
        p += vec3(sin(time*.5+seed*90.),cos(time*.4+seed*120.),sin(time*.6+seed*70.))*.45;
        vec4 view = modelViewMatrix * vec4(p,1.);
        vec4 clip = projectionMatrix * view;
        vec2 away = clip.xy/clip.w-pointer;
        view.xy += normalize(away+vec2(.001)) * exp(-dot(away,away)*45.) * .8;
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp((.3+seed*.8)*pixelRatio*150./-view.z, .8, 5.);
        shade = seed;
        energy = (1.-smoothstep(0.,5.,length(p))) * (.5+.5*sin(time*.7));
      }`,
    fragmentShader: `
      varying float shade; varying float energy;
      void main() {
        float d=length(gl_PointCoord-.5);
        if(d>.5) discard;
        vec3 color=mix(vec3(.24,.002,.75),vec3(.65,.035,1.),shade);
        color=mix(color,vec3(.94,.92,1.),pow(shade,8.));
        color=mix(color,vec3(1.,.7,1.),energy*.8);
        gl_FragColor=vec4(color,(1.-smoothstep(.15,.5,d))*.88);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
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
