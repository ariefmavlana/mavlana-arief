import * as THREE from 'three'
import { createTreePetals } from './createTreePetals'

export function createAtmosphere() {
  const geometry = new THREE.BufferGeometry()
  const count = 1500
  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const nearby = i > 650
    positions[i * 3] = (Math.random() - 0.5) * (nearby ? 45 : 160)
    positions[i * 3 + 1] = Math.random() * 35 - 10
    positions[i * 3 + 2] =
      (Math.random() - 0.5) * (nearby ? 45 : 160) - (nearby ? 7 : 0)
    phases[i] = nearby ? 0.81 + Math.random() * 0.19 : Math.random()
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: 1 },
      night: { value: 0 },
    },
    vertexShader: `
      attribute float phase; uniform float time; uniform float pixelRatio; varying float glow;
      void main(){
        vec3 p=position;
        p.x+=sin(time*.1+phase*50.)*3.; p.y+=sin(time*.2+phase*20.)*2.;
        vec4 view=modelViewMatrix*vec4(p,1.);
        gl_Position=projectionMatrix*view;
        gl_PointSize=clamp((phase>.8?7.:2.)*pixelRatio*20./-view.z,1.,12.);
        glow=phase;
      }`,
    fragmentShader: `
      varying float glow; uniform float night;
      void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
        vec3 color=glow>.8?mix(vec3(1.,.70,.97),vec3(1.,.85,.5),night):mix(vec3(.35,.23,.43),vec3(.14,.08,.25),night);
        gl_FragColor=sRGBTransferEOTF(vec4(color,(1.-smoothstep(.05,.5,d))*.6));
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
  })
  return new THREE.Points(geometry, material)
}

export async function createSakura(gltf, quality) {
  const [{ Tree, TreePreset }, chair] = await Promise.all([
    import('@dgreenheck/ez-tree'),
    gltf.loadAsync('/experience/chair.glb'),
  ])
  const options = structuredClone(TreePreset['Oak Medium'])
  options.seed = 12345
  options.bark.tint = 0xa08794
  options.branch.children = { 0: 5, 1: 4, 2: 3 }
  options.branch.radius = { 0: 2.8, 1: 0.95, 2: 0.85, 3: 0.75 }
  options.branch.angle[1] = 55
  options.branch.force.strength = 0.015
  options.branch.start[1] = 0.55
  Object.assign(options.branch.length, { 1: 15, 2: 9, 3: 5 })
  Object.assign(options.leaves, {
    type: 'aspen',
    tint: 0x8f4fc6,
    count: quality === 'high' ? 32 : 24,
    size: 3.2,
    rotationJitter: 0.35,
    colorVariance: 0.35,
  })
  const tree = new Tree()
  const leafPhases = []
  const leafColors = []
  const generateLeaf = tree.generateLeaf
  let leafRandom
  tree.generateLeaf = function (origin, orientation) {
    leafRandom ??= new this.rng.constructor(options.seed + 1)
    const jitter = new THREE.Euler(
      leafRandom.random(0.35, -0.35),
      leafRandom.random(1.05, -1.05),
      leafRandom.random(0.35, -0.35),
    )
    const rotation = new THREE.Quaternion()
      .setFromEuler(orientation)
      .multiply(new THREE.Quaternion().setFromEuler(jitter))
    const phase = leafRandom.random()
    const brightness = 0.825 + leafRandom.random() * 0.35
    const hue = leafRandom.random() - 0.5
    const start = this.leaves.verts.length / 3
    generateLeaf.call(
      this,
      origin,
      new THREE.Euler().setFromQuaternion(rotation),
    )
    for (let i = start; i < this.leaves.verts.length / 3; i++) {
      leafPhases.push(phase)
      leafColors.push(
        brightness * (1 + hue * 0.14),
        brightness * (1 - hue * 0.105),
        brightness * (1 + hue * 0.175),
      )
    }
  }
  tree.loadFromJson(options)
  tree.leavesMesh.geometry.setAttribute(
    'leafPhase',
    new THREE.Float32BufferAttribute(leafPhases, 1),
  )
  tree.leavesMesh.geometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(leafColors, 3),
  )
  tree.leavesMesh.material.vertexColors = true
  tree.branchesMesh.geometry.computeBoundingBox()
  tree.scale.setScalar(50 / tree.branchesMesh.geometry.boundingBox.max.y)
  tree.position.y = -4
  tree.leavesMesh.material.emissive.set('#b36be2')
  tree.leavesMesh.material.emissiveIntensity = 0.9
  tree.branchesMesh.material.emissive.set('#603881')
  tree.branchesMesh.material.emissiveIntensity = 0.4
  const leafShader = tree.leavesMesh.material.onBeforeCompile
  tree.leavesMesh.material.onBeforeCompile = (shader, renderer) => {
    leafShader.call(tree.leavesMesh.material, shader, renderer)
    shader.vertexShader =
      `attribute float leafPhase; varying float vLeafPhase;\n${shader.vertexShader}`.replace(
        '#include <uv_vertex>',
        'vLeafPhase = leafPhase;\n#include <uv_vertex>',
      )
    shader.fragmentShader =
      `uniform float uTime; varying float vLeafPhase;\n${shader.fragmentShader}`
        .replace(
          '#include <map_fragment>',
          `
        vec4 leaf = texture2D(map, vMapUv);
        float luminance = dot(leaf.rgb, vec3(.299,.587,.114));
        diffuseColor *= vec4(vec3(luminance * 1.8), leaf.a);
      `,
        )
        .replace(
          '#include <emissivemap_fragment>',
          `
        #include <emissivemap_fragment>
        float core = smoothstep(.1,.9,texture2D(map,vMapUv,1.).a);
        float breath = .75 + .25 * sin(uTime * (.5 + vLeafPhase * 1.2) + vLeafPhase * 37.);
        totalEmissiveRadiance *= (.12 + 2.5 * core) * (.5 + 3.5 * pow(vLeafPhase,3.)) * breath;
      `,
        )
  }
  const group = new THREE.Group()
  const petals = createTreePetals(tree, quality)
  group.add(tree, petals)
  const seats = [
    { position: [2.8, 1.3, 6.6], yaw: -68, scale: 8 },
    { position: [-6.5, 1.5, 0.5], yaw: 13, scale: 7.7 },
  ]
  seats.forEach((seat, i) => {
    const model = i === 0 ? chair.scene : chair.scene.clone(true)
    model.position.fromArray(seat.position)
    model.rotation.y = THREE.MathUtils.degToRad(seat.yaw)
    model.scale.setScalar(seat.scale)
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    group.add(model)
  })
  const light = new THREE.SpotLight('#c9a3ff', 100, 60, 0.55, 0.5, 1)
  light.position.set(0, 16, 10)
  light.target.position.set(-2, 1, 4)
  light.castShadow = true
  light.shadow.mapSize.setScalar(quality === 'high' ? 1024 : 512)
  light.shadow.normalBias = 0.03
  const dappleCanvas = document.createElement('canvas')
  dappleCanvas.width = dappleCanvas.height = 256
  const dapple = dappleCanvas.getContext('2d')
  dapple.fillStyle = '#fff'
  dapple.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 70; i++) {
    const radius = 8 + leafRandom.random() * 22
    const x = leafRandom.random() * 256
    const y = leafRandom.random() * 256
    const gradient = dapple.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(0,0,0,${0.35 + leafRandom.random() * 0.35})`)
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    dapple.fillStyle = gradient
    dapple.beginPath()
    dapple.arc(x, y, radius, 0, Math.PI * 2)
    dapple.fill()
  }
  light.map = new THREE.CanvasTexture(dappleCanvas)
  group.add(light, light.target)
  group.position.set(120, -10.5, -80)
  const dayBark = tree.branchesMesh.material.color.clone()
  const nightBark = new THREE.Color('#2a1b4d')
  const dayLeaves = tree.leavesMesh.material.color.clone()
  const nightLeaves = new THREE.Color('#352060')
  const dayEmissive = tree.leavesMesh.material.emissive.clone()
  const nightEmissive = new THREE.Color('#7d5fe8')
  const dayLight = light.color.clone()
  const nightLight = new THREE.Color('#8e6cf0')
  const dayPetalA = petals.material.uniforms.colorA.value.clone()
  const nightPetalA = new THREE.Color('#231540')
  const dayPetalB = petals.material.uniforms.colorB.value.clone()
  const nightPetalB = new THREE.Color('#352060')
  return {
    group,
    update(time, night, pixelRatio, view) {
      tree.update(time)
      petals.visible = view === 'contact'
      petals.material.uniforms.time.value = time
      petals.material.uniforms.pixelRatio.value = pixelRatio
      petals.material.uniforms.colorA.value
        .copy(dayPetalA)
        .lerp(nightPetalA, night)
      petals.material.uniforms.colorB.value
        .copy(dayPetalB)
        .lerp(nightPetalB, night)
      petals.material.uniforms.glowColor.value
        .copy(dayPetalB)
        .lerp(nightPetalB, night)
      petals.material.uniforms.glowStrength.value = THREE.MathUtils.lerp(
        0.05,
        0.25,
        night,
      )
      tree.branchesMesh.material.color.copy(dayBark).lerp(nightBark, night)
      tree.branchesMesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        0.4,
        0.12,
        night,
      )
      tree.leavesMesh.material.color.copy(dayLeaves).lerp(nightLeaves, night)
      tree.leavesMesh.material.emissive
        .copy(dayEmissive)
        .lerp(nightEmissive, night)
      tree.leavesMesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        0.9,
        1.1,
        night,
      )
      light.color.copy(dayLight).lerp(nightLight, night)
      light.intensity = THREE.MathUtils.lerp(100, 120, night)
    },
    dispose() {
      light.map.dispose()
      light.shadow.dispose()
    },
  }
}
