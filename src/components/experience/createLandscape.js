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

  const waterGeometry = new THREE.PlaneGeometry(650, 650, 128, 128)
  const waterVertices = waterGeometry.attributes.position
  const waterDepth = new Float32Array(waterVertices.count)
  for (let i = 0; i < waterVertices.count; i++) {
    waterDepth[i] =
      waterLevel - heightAt(waterVertices.getX(i), -waterVertices.getY(i))
  }
  waterGeometry.setAttribute(
    'waterDepth',
    new THREE.BufferAttribute(waterDepth, 1),
  )
  const water = new Water(waterGeometry, {
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
  Object.assign(water.material.uniforms, {
    time: { value: 0 },
    night: { value: 0 },
    visibility: { value: 1 },
    deepColor: { value: new THREE.Color(1706544) },
    shallowColor: { value: new THREE.Color(7028640) },
  })
  water.material.depthWrite = false
  water.material.vertexShader = `attribute float waterDepth;
    varying float vWaterDepth; varying vec2 vWorldXZ;
    ${water.material.vertexShader}`.replace(
    'void main() {',
    `void main() {
      vWaterDepth = waterDepth; vWorldXZ = vec2(position.x,-position.y);
    `,
  )
  water.material.fragmentShader = `
    #include <common>
    #include <fog_pars_fragment>
    uniform sampler2D tReflectionMap, tNormalMap0, tNormalMap1;
    uniform vec3 deepColor, shallowColor;
    uniform float time, night, reflectivity, visibility;
    varying vec4 vCoord;
    varying vec3 vToEye;
    varying vec2 vWorldXZ;
    varying float vWaterDepth;
    void main() {
      if (vWaterDepth < 0.) discard;
      float t = time * .1;
      vec3 n1 = texture2D(tNormalMap0,vWorldXZ * .1 + vec2(t * 1.2,t * .8)).rgb * 2. - 1.;
      vec3 n2 = texture2D(tNormalMap1,vWorldXZ * .075 + vec2(-t * .9,t * 1.1)).rgb * 2. - 1.;
      vec3 wave = normalize(vec3(n1.x+n2.x,n1.z+n2.z,n1.y+n2.y));
      vec3 N = normalize(mix(vec3(0.,1.,0.),wave,mix(.5,.9,night)));
      vec3 V = normalize(vToEye);
      float fresnel = reflectivity + (1.-reflectivity) * pow(1.-max(dot(N,V),.001),5.);
      float depth = pow(clamp(vWaterDepth / 8.,0.,1.),2.);
      vec3 body = mix(shallowColor,deepColor,depth);
      vec2 uv = vCoord.xy / vCoord.w;
      uv.x = 1.-uv.x;
      uv += N.xz * (.02 + .14 * night);
      vec2 soften = vec2(.0014) * clamp(vWaterDepth / 6.,0.,1.);
      vec3 reflection = texture2D(tReflectionMap,clamp(uv,.001,.999)).rgb * .4;
      reflection += texture2D(tReflectionMap,clamp(uv+vec2(soften.x,0.),.001,.999)).rgb * .15;
      reflection += texture2D(tReflectionMap,clamp(uv-vec2(soften.x,0.),.001,.999)).rgb * .15;
      reflection += texture2D(tReflectionMap,clamp(uv+vec2(0.,soften.y),.001,.999)).rgb * .15;
      reflection += texture2D(tReflectionMap,clamp(uv-vec2(0.,soften.y),.001,.999)).rgb * .15;
      vec3 color = mix(body,reflection,fresnel);
      color += shallowColor * pow(max(N.y,0.),9.) * (1.-depth) * .15 * (1.-night);
      float gate = smoothstep(0.,.25,depth);
      float crest = pow(smoothstep(.15,.55,length(wave.xz)),2.);
      color += vec3(.70,.58,.95) * crest * night * .9 * gate;
      vec3 halfDir = normalize(V + normalize(vec3(.6,.22,.45)));
      float highlight = clamp(dot(N,halfDir),0.,1.);
      color += vec3(.82,.68,.98) * (pow(highlight,56.) + pow(highlight,12.) * .35) * night * gate;
      gl_FragColor = vec4(min(color,vec3(1.)),smoothstep(0.,1.5,vWaterDepth) * mix(.6,1.,depth) * visibility);
      #include <colorspace_fragment>
      #include <fog_fragment>
    }
  `
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
      baseColor: { value: new THREE.Color('#3b1a60') },
      tipColor: { value: new THREE.Color('#9134b7') },
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
      uniform vec3 baseColor;
      uniform vec3 tipColor;
      uniform vec3 fogColor;
      uniform float fogNear;
      uniform float fogFar;
      varying vec2 vUv;
      varying float distanceToCamera;
      void main() {
        vec4 blade = texture2D(map,vUv);
        float mipFill = 1. + smoothstep(25.,160.,distanceToCamera) * .9;
        if(blade.a * mipFill < .4) discard;
        float luminance = dot(blade.rgb,vec3(.299,.587,.114));
        vec3 base = mix(baseColor,tipColor,luminance) * mix(.5,.95,vUv.y);
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
  const officeLights = []
  for (const [
    position,
    distance,
    dayColor,
    nightColor,
    dayIntensity,
    nightIntensity,
  ] of [
    [[63.9, -1.1, 77.9], 45, '#ffb27a', '#ffa25c', 45, 95],
    [[77.8, 0, 96.3], 45, '#ffb27a', '#ffa25c', 45, 95],
    [[66.7, 7.4, 87.4], 55, '#ffc79a', '#ffb87f', 60, 125],
  ]) {
    const light = new THREE.PointLight(dayColor, dayIntensity, distance, 2)
    light.position.fromArray(position)
    officeLights.push({
      light,
      dayColor: new THREE.Color(dayColor),
      nightColor: new THREE.Color(nightColor),
      dayIntensity,
      nightIntensity,
    })
    group.add(light)
  }
  const officeFill = new THREE.HemisphereLight('#b9a3ff', '#4a2a70', 0.45)
  officeFill.position.set(100, 14, 70)
  const officeSun = new THREE.DirectionalLight('#cbb6ff', 0.55)
  officeSun.position.set(87.8, 2.1, 43.1)
  officeSun.target.position.set(87.8, -5.5, 62)
  const officeSpot = new THREE.SpotLight('#efe6ff', 230, 70, 0.95, 0.85, 2)
  officeSpot.position.set(101, 12, 62)
  officeSpot.target.position.set(101, -5.5, 62)
  for (const [light, nightColor, nightIntensity] of [
    [officeFill, '#6a5aa8', 0.24],
    [officeSun, '#7f6ccc', 0.18],
    [officeSpot, '#8f7fd8', 100],
  ]) {
    officeLights.push({
      light,
      dayColor: light.color.clone(),
      nightColor: new THREE.Color(nightColor),
      dayIntensity: light.intensity,
      nightIntensity,
    })
  }
  group.add(
    officeFill,
    officeSun,
    officeSun.target,
    officeSpot,
    officeSpot.target,
  )
  const dayOfficeGround = officeFill.groundColor.clone()
  const nightOfficeGround = new THREE.Color('#1c0f38')
  scene.add(group)
  const dayGround = new THREE.Color('#6F368D')
  const nightGround = new THREE.Color('#22183d')
  const dayGrassBase = new THREE.Color('#3b1a60')
  const nightGrassBase = new THREE.Color('#160e35')
  const dayGrassTip = new THREE.Color('#9134b7')
  const nightGrassTip = new THREE.Color('#5a3878')
  const dayDeepWater = new THREE.Color(1706544)
  const nightDeepWater = new THREE.Color(2626930)
  const dayShallowWater = new THREE.Color(7028640)
  const nightShallowWater = new THREE.Color(4465296)
  return {
    group,
    update(time, dark, view, travelChapter) {
      const officeWeight =
        travelChapter === undefined
          ? Number(view === 'about')
          : THREE.MathUtils.smoothstep(travelChapter, 4, 4.8) *
            (1 - THREE.MathUtils.smoothstep(travelChapter, 5.1, 5.8))
      const waterWeight =
        travelChapter === undefined
          ? Number(view === 'home')
          : 1 - THREE.MathUtils.smoothstep(travelChapter, 4.2, 4.8)
      grassMaterial.uniforms.time.value = time
      grassMaterial.uniforms.baseColor.value
        .copy(dayGrassBase)
        .lerp(nightGrassBase, dark)
      grassMaterial.uniforms.tipColor.value
        .copy(dayGrassTip)
        .lerp(nightGrassTip, dark)
      groundMaterial.color.copy(dayGround).lerp(nightGround, dark)
      officeFill.groundColor.copy(dayOfficeGround).lerp(nightOfficeGround, dark)
      for (const {
        light,
        dayColor,
        nightColor,
        dayIntensity,
        nightIntensity,
      } of officeLights) {
        light.color.copy(dayColor).lerp(nightColor, dark)
        light.intensity =
          officeWeight *
          THREE.MathUtils.lerp(dayIntensity, nightIntensity, dark)
        light.visible = officeWeight > 0
      }
      for (const { material, color } of mountainColors)
        material.color.copy(color).multiplyScalar(1 - dark * 0.65)
      water.material.uniforms.time.value = time
      water.material.uniforms.night.value = dark
      water.material.uniforms.deepColor.value
        .copy(dayDeepWater)
        .lerp(nightDeepWater, dark)
      water.material.uniforms.shallowColor.value
        .copy(dayShallowWater)
        .lerp(nightShallowWater, dark)
      water.material.uniforms.visibility.value = waterWeight
      water.visible = waterWeight > 0
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
