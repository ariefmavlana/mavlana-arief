import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

// 3D Spaceman Model Component
function SpacemanModel() {
    const spacemanRef = useRef()
    const { scene } = useGLTF('/models/tenhun_falling_spaceman_fanart.glb')
    const { viewport } = useThree()

    // Responsive scale based on viewport width
    const isMobile = viewport.width < 5
    const scale = isMobile ? 0.55 : 0.85
    const positionY = isMobile ? 0.5 : -0.2 // Move up on mobile to not be hidden by text? Or maybe keep centered.
    // Actually, on mobile, text is stacked. Let's keep it centered but smaller.

    useFrame((state) => {
        if (spacemanRef.current) {
            // Floating and rotating - Simplified
            const time = state.clock.elapsedTime
            spacemanRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
            spacemanRef.current.rotation.x = Math.cos(time * 0.2) * 0.1
            spacemanRef.current.position.y = (isMobile ? -0.5 : -0.2) + Math.sin(time * 0.4) * 0.2
        }
    })

    return (
        <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={1}
        >
            <primitive
                ref={spacemanRef}
                object={scene}
                scale={scale}
                position={[0, 0, 0]} // Controlled in useFrame
                rotation={[0, -Math.PI / 6, 0]}
            />
        </Float>
    )
}

// Main 3D Scene Component
const Scene3D = ({ scrollProgress = 0, showSpaceman = true }) => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                performance={{ min: 0.5 }}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
            >
                {/* Lighting - Cyan/Purple/White */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />

                {/* Purple rim light */}
                <pointLight position={[-10, -5, -5]} intensity={2} color="#A855F7" distance={20} />

                {/* Cyan fill light */}
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    color="#06B6D4"
                />

                {showSpaceman && <SpacemanModel />}
            </Canvas>
        </div>
    )
}

// Preload models
useGLTF.preload('/models/tenhun_falling_spaceman_fanart.glb')

export default Scene3D
