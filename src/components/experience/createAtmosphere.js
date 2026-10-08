import * as THREE from 'three'

export function createAtmosphere() {
  const geometry = new THREE.BufferGeometry()
  const count = 650
  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 160
    positions[i * 3 + 1] = Math.random() * 35 - 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 160
    phases[i] = Math.random()
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
  const material = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, pixelRatio: { value: 1 } },
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
      varying float glow;
      void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;
        vec3 color=glow>.8?vec3(1.,.82,1.):vec3(.25,.08,.35);
        gl_FragColor=vec4(color,(1.-smoothstep(.05,.5,d))*.6);
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
  tree.loadFromJson(options)
  tree.branchesMesh.geometry.computeBoundingBox()
  tree.scale.setScalar(50 / tree.branchesMesh.geometry.boundingBox.max.y)
  tree.position.y = -4
  tree.leavesMesh.material.emissive.set('#ca7bee')
  tree.leavesMesh.material.emissiveIntensity = 0.9
  const group = new THREE.Group()
  group.add(tree)
  const seats = [
    { position: [2.8, 1.3, 6.6], yaw: -68, scale: 8 },
    { position: [-6.5, 1.5, 0.5], yaw: 13, scale: 7.7 },
  ]
  seats.forEach((seat, i) => {
    const model = i === 0 ? chair.scene : chair.scene.clone(true)
    model.position.fromArray(seat.position)
    model.rotation.y = THREE.MathUtils.degToRad(seat.yaw)
    model.scale.setScalar(seat.scale)
    group.add(model)
  })
  const light = new THREE.SpotLight('#c9a3ff', 100, 60, 0.55, 0.5, 1)
  light.position.set(0, 16, 10)
  light.target.position.set(-2, 1, 4)
  group.add(light, light.target)
  group.position.set(120, -10.5, -80)
  return { group, update: (time) => tree.update(time) }
}
