import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Float, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D Planet Model Component
function PlanetModel({ scrollProgress = 0 }) {
    const planetRef = useRef()
    const { scene } = useGLTF('/models/Planet.glb')

    useFrame((state) => {
        if (planetRef.current) {
            // Slow rotation
            planetRef.current.rotation.y += 0.001

            // Gentle floating animation
            planetRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1

            // Scale based on scroll
            const scale = 1 - scrollProgress * 0.3
            planetRef.current.scale.set(scale, scale, scale)
        }
    })

    return (
        <primitive
            ref={planetRef}
            object={scene}
            scale={0.8}
            position={[0, 0, 0]}
        />
    )
}

// 3D Spaceman Model Component
function SpacemanModel() {
    const spacemanRef = useRef()
    const { scene } = useGLTF('/models/tenhun_falling_spaceman_fanart.glb')

    useFrame((state) => {
        if (spacemanRef.current) {
            // Floating and rotating animation
            spacemanRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
            spacemanRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
            spacemanRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5
        }
    })

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <primitive
                ref={spacemanRef}
                object={scene}
                scale={1.2}
                position={[3, 0, -2]}
            />
        </Float>
    )
}

// Main 3D Scene Component
const Scene3D = ({ scrollProgress = 0, showSpaceman = false }) => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8DFF69" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={0.5}
                    color="#8DFF69"
                />

                <PlanetModel scrollProgress={scrollProgress} />
                {showSpaceman && <SpacemanModel />}

                {/* Optional: Add orbit controls for debugging */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
            </Canvas>
        </div>
    )
}

// Preload models
useGLTF.preload('/models/Planet.glb')
useGLTF.preload('/models/tenhun_falling_spaceman_fanart.glb')

export default Scene3D
