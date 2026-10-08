import * as THREE from 'three'
import { Water } from 'three/addons/objects/Water2.js'

const fract = (x) => x - Math.floor(x)
const mix = (a, b, t) => a + (b - a) * t

function terrainNoise(x, z) {
  const hash = (a, b) => {
    let p = fract(a * 0.1031),
      q = fract(b * 0.103),
      r = fract(a * 0.0973)
    const d = p * (q + 33.33) + q * (r + 33.33) + r * (p + 33.33)
    p += d
    q += d
    r += d
    return fract((p + q) * r)
  }
  const ix = Math.floor(x),
    iz = Math.floor(z)
  const fx = fract(x),
    fz = fract(z)
  const u = fx ** 3 * (fx * (fx * 6 - 15) + 10)
  const v = fz ** 3 * (fz * (fz * 6 - 15) + 10)
  return mix(
    mix(hash(ix, iz), hash(ix + 1, iz), u),
    mix(hash(ix, iz + 1), hash(ix + 1, iz + 1), u),
    v,
  )
}

export async function createLandscape({ scene, manager, gltf, ktx, quality }) {
  const textureLoader = new THREE.TextureLoader(manager)
  const [
    mountains,
    heightTexture,
    grassTexture,
    normal1,
    normal2,
    duck,
    office,
  ] = await Promise.all([
    gltf.loadAsync('/experience/mountain.glb'),
    textureLoader.loadAsync('/experience/water_map.png'),
    ktx.loadAsync('/experience/grassbushcc008.ktx2'),
    textureLoader.loadAsync('/experience/Water_1_M_Normal.jpg'),
    textureLoader.loadAsync('/experience/Water_2_M_Normal.jpg'),
    gltf.loadAsync('/experience/duck.glb'),
    gltf.loadAsync('/experience/office.glb'),
  ])
  const group = new THREE.Group()
  const mapCanvas = document.createElement('canvas')
  const image = heightTexture.image
  mapCanvas.width = image.width
  mapCanvas.height = image.height
  const context = mapCanvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0)
  const map = context.getImageData(0, 0, image.width, image.height).data
  const sample = (x, z) => {
    const u = Math.floor(fract(x / 256) * image.width)
    const v = Math.floor((1 - fract(z / 256)) * (image.height - 1))
    return map[(v * image.width + u) * 4] / 255
  }
  const heightAt = (x, z) => {
    const localZ = z + 31.66
    const blurred =
      sample(x, localZ) * 0.4 +
      (sample(x + 15, localZ) +
        sample(x - 15, localZ) +
        sample(x, localZ + 15) +
        sample(x, localZ - 15)) *
        0.15
    const large =
      terrainNoise(x * 0.008, localZ * 0.008) * 0.5 +
      terrainNoise(x * 0.016, localZ * 0.016) * 0.25
    const small =
      terrainNoise(x * 0.026, localZ * 0.026) * 0.5 +
      terrainNoise(x * 0.052, localZ * 0.052) * 0.25
    const terrain = -20.5 + 35 * (blurred * 0.1 + large * 0.59 + small * 0.15)
    const outside = Math.max(Math.abs(x - 100) - 52, Math.abs(z - 60.8) - 51, 0)
    const blend = THREE.MathUtils.smoothstep(outside, 0, 22)
    return mix(-5.9, terrain, blend)
  }
  const waterLevel = -12.8
  const groundGeometry = new THREE.PlaneGeometry(650, 650, 240, 240)
  groundGeometry.rotateX(-Math.PI / 2)
  const vertices = groundGeometry.attributes.position
  for (let i = 0; i < vertices.count; i++)
    vertices.setY(i, heightAt(vertices.getX(i), vertices.getZ(i)))
  groundGeometry.computeVertexNormals()
  const groundMaterial = new THREE.MeshLambertMaterial({ color: '#6F368D' })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  group.add(ground)

  mountains.scene.scale.setScalar(0.095)
  mountains.scene.position.set(0, -15, 0)
  group.add(mountains.scene)
  const mountainColors = []
  mountains.scene.traverse((object) => {
    if (object.isMesh) {
      object.material.side = THREE.DoubleSide
      mountainColors.push({
        material: object.material,
        color: object.material.color.clone(),
      })
    }
  })

  const water = new Water(new THREE.PlaneGeometry(650, 650), {
    color: '#b8a8e8',
    scale: 65,
    flowDirection: new THREE.Vector2(1, 1),
    flowSpeed: 0.1,
    textureWidth: quality === 'high' ? 768 : 384,
    textureHeight: quality === 'high' ? 768 : 384,
    reflectivity: 0.4,
    normalMap0: normal1,
    normalMap1: normal2,
  })
  water.rotation.x = -Math.PI / 2
  water.position.y = waterLevel
  group.add(water)

  const quad = new THREE.PlaneGeometry(1.8, 1.6, 1, 3)
  quad.translate(0, 0.8, 0)
  const grassGeometry = new THREE.InstancedBufferGeometry().copy(quad)
  const count = quality === 'high' ? 110000 : 40000
  const offsets = [],
    scales = [],
    angles = []
  let seed = 81
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  for (let i = 0; i < count; i++) {
    const x = (random() - 0.5) * 300
    const z = (random() - 0.5) * 300
    if (Math.abs(x - 100) < 48.5 && Math.abs(z - 60.8) < 47.5) continue
    const y = heightAt(x, z)
    if (y < waterLevel + 0.15) continue
    offsets.push(x, y - 0.08, z)
    scales.push(0.7 + random() * 0.65)
    angles.push(random() * Math.PI * 2)
  }
  grassGeometry.instanceCount = scales.length
  grassGeometry.setAttribute(
    'offset',
    new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3),
  )
  grassGeometry.setAttribute(
    'bladeScale',
    new THREE.InstancedBufferAttribute(new Float32Array(scales), 1),
  )
  grassGeometry.setAttribute(
    'angle',
    new THREE.InstancedBufferAttribute(new Float32Array(angles), 1),
  )
  const grassMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: grassTexture },
      time: { value: 0 },
      night: { value: 0 },
      fogColor: { value: scene.fog.color },
      fogNear: { value: 120 },
      fogFar: { value: 420 },
    },
    vertexShader: `
      attribute vec3 offset;
      attribute float bladeScale;
      attribute float angle;
      uniform float time;
      varying vec2 vUv;
      varying float distanceToCamera;
      void main() {
        vUv = uv;
        vec3 p = position * bladeScale;
        p.x += sin(time * 1.2 + offset.x * .16 + offset.z * .12) * uv.y * uv.y * .3;
        p = vec3(p.x*cos(angle) + p.z*sin(angle),p.y,-p.x*sin(angle)+p.z*cos(angle));
        vec4 view = modelViewMatrix * vec4(p + offset,1.);
        distanceToCamera = -view.z;
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader: `
      uniform sampler2D map;
      uniform float night;
      uniform vec3 fogColor;
      uniform float fogNear;
      uniform float fogFar;
      varying vec2 vUv;
      varying float distanceToCamera;
      void main() {
        vec4 blade = texture2D(map,vUv);
        if(blade.a < .45) discard;
        vec3 base = mix(vec3(.042,.006,.09),vec3(.21,.025,.35),vUv.y);
        base *= .8 + dot(blade.rgb, vec3(.333)) * .5;
        base = mix(base,base*vec3(.3,.25,.55),night);
        gl_FragColor = vec4(mix(base,fogColor,smoothstep(fogNear,fogFar,distanceToCamera)),1.);
        #include <colorspace_fragment>
      }`,
    side: THREE.DoubleSide,
  })
  const grass = new THREE.Mesh(grassGeometry, grassMaterial)
  grass.frustumCulled = false
  group.add(grass)

  duck.scene.scale.setScalar(0.15)
  duck.scene.position.set(-3, waterLevel + 0.15, 4)
  group.add(duck.scene)
  office.scene.position.set(100, -5.5, 70)
  office.scene.scale.setScalar(3)
  group.add(office.scene)
  for (const [x, y, z] of [
    [100, 13, 60],
    [87, 8, 49],
    [118, 9, 72],
  ]) {
    const light = new THREE.PointLight('#d4b7ff', 180, 65, 1.5)
    light.position.set(x, y, z)
    group.add(light)
  }
  scene.add(group)
  return {
    group,
    update(time, dark) {
      grassMaterial.uniforms.time.value = time
      grassMaterial.uniforms.night.value = dark
      groundMaterial.color.set(dark > 0.5 ? '#22183d' : '#6F368D')
      for (const { material, color } of mountainColors)
        material.color.copy(color).multiplyScalar(1 - dark * 0.65)
      water.material.uniforms.color.value.set(
        dark > 0.5 ? '#3a2575' : '#b8a8e8',
      )
      duck.scene.position.x = -3 + Math.sin(time * 0.04) * 7
      duck.scene.position.z = 4 + Math.cos(time * 0.04) * 4
      duck.scene.rotation.y = -time * 0.04
    },
    dispose() {
      heightTexture.dispose()
      grassTexture.dispose()
      normal1.dispose()
      normal2.dispose()
      quad.dispose()
      water.material.uniforms.tReflectionMap.value.renderTarget.dispose()
      water.material.uniforms.tRefractionMap.value.renderTarget.dispose()
    },
  }
}
