import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { createLandscape } from './createLandscape'
import { createSculpture } from './createSculpture'
import { createAtmosphere, createSakura } from './createAtmosphere'

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
}) {
  const host = useRef(null)
  const settings = useRef({ dark, motion, view })
  useEffect(() => {
    settings.current = { dark, motion, view }
  }, [dark, motion, view])

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
          vec3 sky=mix(vec3(.72,.66,.91),vec3(.14,.075,.22),night);
          vec3 cloud=mix(vec3(.91,.71,.91),vec3(.34,.22,.47),night);
          gl_FragColor=vec4(mix(sky,cloud,clouds*.85),1.);
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
      needsRender = true
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    window.addEventListener('pointermove', pointerMove, { passive: true })
    let time = 0,
      previous = performance.now(),
      smoothProgress = progress.current
    let lastProgress = -1,
      lastNight = -1,
      lastView = ''
    const lookAt = new THREE.Vector3()
    const nextPosition = new THREE.Vector3()
    const nextTarget = new THREE.Vector3()
    const animate = (now) => {
      if (disposed) return
      frame = requestAnimationFrame(animate)
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now
      if (settings.current.motion) time += delta
      smoothProgress = settings.current.motion
        ? smoothProgress + (progress.current - smoothProgress) * 0.07
        : progress.current
      const mobile = camera.aspect < 1
      const proximity = Math.sin(smoothProgress * Math.PI) ** 2
      const angle = Math.atan2(5.44, 35.66) + smoothProgress * Math.PI * 2
      const radius =
        Math.hypot(5.44, 35.66) * (1 - proximity * (mobile ? 0.15 : 0.4))
      camera.position.set(
        Math.sin(angle) * radius,
        -1.7 - proximity * 5,
        Math.cos(angle) * radius,
      )
      const offset = Math.sin(smoothProgress * Math.PI * 4) ** 2 * 5
      lookAt.set(0, (mobile ? -0.5 : 0) + offset, (mobile ? -7 : 0) + offset)
      if (settings.current.view === 'about') {
        const index = Math.min(3, Math.floor(smoothProgress * 4))
        const t = smoothProgress * 4 - index
        camera.position
          .fromArray(officePositions[index])
          .lerp(nextPosition.fromArray(officePositions[index + 1]), t)
        lookAt
          .fromArray(officeTargets[index])
          .lerp(nextTarget.fromArray(officeTargets[index + 1]), t)
      } else if (settings.current.view === 'contact') {
        camera.position.set(
          mobile ? 103.2 : 107.1,
          mobile ? 0 : 1.5,
          mobile ? -35 : -45.8,
        )
        lookAt.set(127, 2, -72)
      }
      camera.lookAt(lookAt)
      const night = settings.current.dark ? 1 : 0
      skyMaterial.uniforms.time.value = time
      skyMaterial.uniforms.night.value = night
      scene.fog.color.set(night ? '#241338' : '#b8a8e8')
      ambient.intensity = night ? 0.15 : 0.3
      sun.intensity = night ? 0.26 : 0.5
      landscape?.update(time, night)
      sakura?.update(time)
      atmosphere.material.uniforms.time.value = time
      atmosphere.material.uniforms.pixelRatio.value = renderer.getPixelRatio()
      if (sculpture) {
        sculpture.material.uniforms.time.value = time
        sculpture.material.uniforms.progress.value = smoothProgress
        if (settings.current.motion)
          sculpture.material.uniforms.pointer.value.copy(pointer)
        else sculpture.material.uniforms.pointer.value.set(10, 10)
        sculpture.material.uniforms.pixelRatio.value = renderer.getPixelRatio()
        sculpture.rotation.y = Math.sin(time / 12) * 0.08
        sculpture.rotation.z = Math.sin(time / 17) * 0.04
      }
      const changed =
        Math.abs(smoothProgress - lastProgress) > 0.0001 ||
        night !== lastNight ||
        settings.current.view !== lastView
      if (
        (settings.current.motion || needsRender || changed) &&
        container.getBoundingClientRect().bottom > 0 &&
        !document.hidden
      ) {
        renderer.render(scene, camera)
        needsRender = false
        lastProgress = smoothProgress
        lastNight = night
        lastView = settings.current.view
      }
    }
    const release = () => {
      landscape?.dispose()
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
