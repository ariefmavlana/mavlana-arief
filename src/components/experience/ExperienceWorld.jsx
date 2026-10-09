import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { createLandscape } from './createLandscape'
import { createSculpture } from './createSculpture'
import { createAtmosphere, createSakura } from './createAtmosphere'
import { tourState } from '../../utils/tour'

const officePositions = [
  [111.95, 0.48, 47.93],
  [107.98, -0.23, 67.78],
  [102.79, 4.05, 62.06],
  [108.23, 1.35, 53.43],
  [90.59, 1.64, 54.75],
]
const officeTargets = [
  [117.22, -1.25, 71.25],
  [123.02, -1.92, 74.63],
  [91.21, 1.26, 100.46],
  [89.31, 1.76, 51.73],
  [89.83, 1.77, 51.62],
]

export default function ExperienceWorld({
  progress,
  dark,
  motion,
  quality,
  onProgress,
  onReady,
  onError,
  view = 'home',
  ready,
  chapters,
}) {
  const host = useRef(null)
  const introComplete = useRef(false)
  const settings = useRef({ dark, motion, view, ready, chapters })
  useEffect(() => {
    settings.current = { dark, motion, view, ready, chapters }
  }, [dark, motion, view, ready, chapters])

  useEffect(() => {
    const container = host.current
    let disposed = false
    let loadingStarted = false
    let landscape, sculpture, sakura, frame, renderer
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#b8a8e8')
    scene.fog = new THREE.Fog('#b8a8e8', 100, 550)
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 3000)
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: quality === 'high',
        powerPreference: 'high-performance',
      })
    } catch (error) {
      onError(error)
      return
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, quality === 'high' ? 1.5 : 1),
    )
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.LinearToneMapping
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    const bloomTarget = new THREE.WebGLRenderTarget(1, 1, {
      samples: quality === 'high' ? 4 : 2,
    })
    const composer = new EffectComposer(renderer, bloomTarget)
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.08, 0.1, 0.85)
    const output = new OutputPass()
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(bloom)
    composer.addPass(output)
    container.appendChild(renderer.domElement)
    const manager = new THREE.LoadingManager()
    manager.onProgress = (_url, loaded, total) => {
      if (!disposed) onProgress(Math.round((loaded / total) * 95))
    }
    const draco = new DRACOLoader(manager).setDecoderPath('/experience/draco/')
    const gltf = new GLTFLoader(manager).setDRACOLoader(draco)
    const ktx = new KTX2Loader(manager)
      .setTranscoderPath('/experience/basis/')
      .detectSupport(renderer)
    gltf.setKTX2Loader(ktx)
    const ambient = new THREE.AmbientLight('#ffffff', 0.3)
    const sun = new THREE.DirectionalLight(13865200, 0.5)
    sun.position.set(5, 15, 22)
    scene.add(ambient, sun)

    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { time: { value: 0 }, night: { value: 0 } },
      vertexShader:
        'varying vec3 direction; void main(){direction=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `
        varying vec3 direction; uniform float time; uniform float night;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
        void main(){
          vec3 ray=normalize(direction); vec2 p=ray.xz*3.+ray.y*5.+vec2(time*.006);
          float n=noise(p)*.5+noise(p*2.)*.25+noise(p*4.)*.125;
          float clouds=smoothstep(.34,.65,n)*smoothstep(.02,.3,ray.y);
          vec3 nightSky=mix(vec3(.30,.20,.42),vec3(.065,.027,.105),smoothstep(0.,.9,ray.y));
          vec3 sky=mix(vec3(.72,.66,.91),nightSky,night);
          vec3 cloud=mix(vec3(.91,.71,.91),vec3(.34,.22,.47),night);
          gl_FragColor=sRGBTransferEOTF(vec4(mix(sky,cloud,clouds*.85),1.));
          #include <colorspace_fragment>
        }`,
    })
    scene.add(
      new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 16), skyMaterial),
    )
    const atmosphere = createAtmosphere()
    scene.add(atmosphere)
    const pointer = new THREE.Vector2(10, 10)
    let needsRender = true
    const pointerMove = (event) => {
      const bounds = container.getBoundingClientRect()
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
      )
    }
    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      composer.setSize(container.clientWidth, container.clientHeight)
      needsRender = true
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    window.addEventListener('pointermove', pointerMove, { passive: true })
    let time = 0,
      previous = performance.now()
    let lastProgress = -1,
      lastNight = -1,
      lastView = ''
    const lookAt = new THREE.Vector3()
    const officePath = new THREE.CatmullRomCurve3(
      officePositions.map((position) => new THREE.Vector3(...position)),
    )
    const officeLookPath = new THREE.CatmullRomCurve3(
      officeTargets.map((target, i) => {
        const position = new THREE.Vector3(...officePositions[i])
        return new THREE.Vector3(...target)
          .sub(position)
          .normalize()
          .multiplyScalar(30)
          .add(position)
      }),
    )
    const officeExit = new THREE.Vector3(86.1, 2.4, 36.3)
    const officeExitLook = new THREE.Vector3(85.4, 2.5, 33.4)
      .sub(officeExit)
      .normalize()
      .multiplyScalar(30)
      .add(officeExit)
    const departurePosition = new THREE.Vector3()
    const departureLookAt = new THREE.Vector3()
    const renderedLookAt = new THREE.Vector3()
    const landmarkPosition = new THREE.Vector3()
    const landmarkLookAt = new THREE.Vector3()
    let cameraView = settings.current.view
    let flight = 1
    let intro = introComplete.current ? 1 : 0
    const treeAnchor = new THREE.Vector3(120, -14, -80)
    const anchorDirection = new THREE.Vector3()
    const cameraRight = new THREE.Vector3()
    const cameraUp = new THREE.Vector3()
    const dayFog = new THREE.Color('#b8a8e8')
    const nightFog = new THREE.Color('#18112e')
    const dayAmbient = ambient.color.clone()
    const nightAmbient = new THREE.Color('#4a3878')
    const daySun = sun.color.clone()
    const nightSun = new THREE.Color('#9070c5')
    let night = settings.current.dark ? 1 : 0
    const animate = (now) => {
      if (disposed) return
      frame = requestAnimationFrame(animate)
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now
      if (settings.current.motion) time += delta
      const { story, chapter, outro } = tourState(
        progress.current,
        settings.current.chapters,
      )
      const homeTour = settings.current.view === 'home'
      const smoothProgress = homeTour ? Math.min(chapter / 4, 1) : story
      const sceneView =
        homeTour && chapter > 4
          ? chapter > 5
            ? 'contact'
            : 'about'
          : settings.current.view
      if (cameraView !== settings.current.view) {
        departurePosition.copy(camera.position)
        departureLookAt.copy(renderedLookAt)
        cameraView = settings.current.view
        flight = 0
      }
      flight = settings.current.motion ? Math.min(1, flight + delta / 1.6) : 1
      const mobile = window.innerWidth <= 640
      const proximity = Math.sin(smoothProgress * Math.PI) ** 2
      const angle = Math.atan2(5.44, 35.66) + smoothProgress * Math.PI * 2
      const radius =
        Math.hypot(5.44, 35.66) * (1 - proximity * (mobile ? 0.15 : 0.4))
      camera.position.set(
        Math.sin(angle) * radius,
        -1.7 - proximity * 5,
        Math.cos(angle) * radius,
      )
      const segment = smoothProgress * 4
      const offset = (1 - Math.abs((segment % 2) - 1)) * 5
      lookAt.set(0, mobile ? -0.5 : offset, mobile ? -7 : offset)
      if (homeTour && chapter > 4) {
        const travel = THREE.MathUtils.smootherstep(chapter, 4, 5)
        officePath.getPoint(0, landmarkPosition)
        officeLookPath.getPoint(0, landmarkLookAt)
        camera.position.lerp(landmarkPosition, travel)
        camera.position.y += Math.sin(travel * Math.PI) * 14
        lookAt.lerp(landmarkLookAt, travel)
      }
      if (settings.current.view === 'about') {
        officePath.getPoint(smoothProgress, camera.position)
        officeLookPath.getPoint(smoothProgress, lookAt)
        if (settings.current.motion) {
          camera.position.lerp(officeExit, outro)
          lookAt.lerp(officeExitLook, outro)
        }
      } else if (sceneView === 'contact') {
        landmarkPosition.copy(camera.position)
        landmarkLookAt.copy(lookAt)
        camera.position.set(
          mobile ? 103.2 : 107.1,
          mobile ? 0 : 1.5,
          mobile ? -35 : -45.8,
        )
        anchorDirection.subVectors(treeAnchor, camera.position)
        const distance = anchorDirection.length()
        anchorDirection.normalize()
        const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
        const horizontal = (mobile ? 0 : -0.45) * halfFov * camera.aspect
        const vertical = (mobile ? -0.1 : -0.9) * halfFov
        const scale = Math.sqrt(1 + horizontal ** 2 + vertical ** 2)
        lookAt.copy(anchorDirection)
        for (let i = 0; i < 3; i++) {
          cameraRight.crossVectors(lookAt, camera.up).normalize()
          cameraUp.crossVectors(cameraRight, lookAt)
          lookAt
            .copy(anchorDirection)
            .multiplyScalar(scale)
            .addScaledVector(cameraRight, -horizontal)
            .addScaledVector(cameraUp, -vertical)
            .normalize()
        }
        lookAt.multiplyScalar(distance).add(camera.position)
        if (homeTour) {
          const travel = THREE.MathUtils.smootherstep(chapter, 5, 6)
          camera.position.lerp(landmarkPosition, 1 - travel)
          camera.position.y += Math.sin(travel * Math.PI) * 14
          lookAt.lerp(landmarkLookAt, 1 - travel)
        }
      }
      if (settings.current.ready) {
        intro = settings.current.motion ? Math.min(1, intro + delta / 3) : 1
        introComplete.current = intro === 1
      }
      if (settings.current.motion && intro < 1 && cameraView !== 'contact') {
        const approach = 12 * (1 - intro) ** 3
        camera.position.y += approach
        camera.position.z += approach
      }
      if (flight < 1) {
        const ease =
          flight < 0.5 ? 4 * flight ** 3 : 1 - (-2 * flight + 2) ** 3 / 2
        camera.position.lerp(departurePosition, 1 - ease)
        lookAt.lerp(departureLookAt, 1 - ease)
      }
      renderedLookAt.copy(lookAt)
      camera.lookAt(lookAt)
      const targetNight = settings.current.dark ? 1 : 0
      night = settings.current.motion
        ? THREE.MathUtils.damp(night, targetNight, 2.5, delta)
        : targetNight
      if (Math.abs(targetNight - night) < 0.001) night = targetNight
      skyMaterial.uniforms.time.value = time
      skyMaterial.uniforms.night.value = night
      scene.fog.color.copy(dayFog).lerp(nightFog, night)
      ambient.color.copy(dayAmbient).lerp(nightAmbient, night)
      ambient.intensity = THREE.MathUtils.lerp(0.3, 0.26, night)
      sun.color.copy(daySun).lerp(nightSun, night)
      sun.intensity = THREE.MathUtils.lerp(0.5, 0.26, night)
      landscape?.update(time, night, sceneView, homeTour ? chapter : undefined)
      sakura?.update(time, night, renderer.getPixelRatio(), sceneView)
      atmosphere.material.uniforms.time.value = time
      atmosphere.material.uniforms.night.value = night
      atmosphere.material.uniforms.pixelRatio.value = renderer.getPixelRatio()
      if (sculpture) {
        sculpture.material.uniforms.time.value = time
        sculpture.material.uniforms.lightDirView.value
          .copy(sun.position)
          .transformDirection(camera.matrixWorldInverse)
        sculpture.material.uniforms.halfDirView.value.copy(
          sculpture.material.uniforms.lightDirView.value,
        )
        sculpture.material.uniforms.halfDirView.value.z += 1
        sculpture.material.uniforms.halfDirView.value.normalize()
        sculpture.material.uniforms.progress.value = smoothProgress
        if (settings.current.motion)
          sculpture.material.uniforms.pointer.value.copy(pointer)
        else sculpture.material.uniforms.pointer.value.set(10, 10)
        sculpture.material.uniforms.pixelRatio.value = renderer.getPixelRatio()
        sculpture.rotation.y =
          Math.sin(time / 12) * THREE.MathUtils.degToRad(0.8)
        sculpture.rotation.z =
          Math.sin(time / 17) * THREE.MathUtils.degToRad(0.4)
      }
      const changed =
        Math.abs(progress.current - lastProgress) > 0.0001 ||
        night !== lastNight ||
        settings.current.view !== lastView
      if (
        (settings.current.motion || needsRender || changed) &&
        container.getBoundingClientRect().bottom > 0 &&
        !document.hidden
      ) {
        if (sceneView === 'contact') {
          bloom.strength = THREE.MathUtils.lerp(0.15, 0.08, night)
          composer.render(delta)
        } else renderer.render(scene, camera)
        needsRender = false
        lastProgress = progress.current
        lastNight = night
        lastView = settings.current.view
      }
    }
    const release = () => {
      landscape?.dispose()
      sakura?.dispose()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]
          for (const material of materials) material.dispose()
        }
      })
      draco.dispose()
      if (loadingStarted) ktx.dispose()
      bloom.dispose()
      output.dispose()
      composer.dispose()
      renderer.dispose()
    }
    Promise.resolve()
      .then(() => {
        if (disposed) return null
        loadingStarted = true
        return Promise.all([
          createLandscape({ scene, manager, gltf, ktx, quality }),
          createSculpture(gltf, quality),
          createSakura(gltf, quality),
        ])
      })
      .then((assets) => {
        if (!assets) return
        const [world, points, tree] = assets
        landscape = world
        sculpture = points
        sakura = tree
        scene.add(points, tree.group)
        if (disposed) {
          release()
          return
        }
        onProgress(100)
        onReady()
        frame = requestAnimationFrame(animate)
      })
      .catch((error) => {
        if (!disposed) onError(error)
        release()
      })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', pointerMove)
      renderer.domElement.remove()
      if (!loadingStarted || (landscape && sculpture)) release()
    }
  }, [quality, onProgress, onReady, onError, progress])

  return <div ref={host} className="world-canvas" aria-hidden="true" />
}
