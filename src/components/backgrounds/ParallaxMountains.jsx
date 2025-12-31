import { motion } from 'framer-motion'

const ParallaxMountains = ({ scrollProgress = 0 }) => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Sky Background */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: 'url(/sky.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                }}
                animate={{
                    y: scrollProgress * 50,
                }}
            />

            {/* Mountain Layer 3 (Farthest) */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full"
                style={{
                    backgroundImage: 'url(/mountain-3.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.4,
                }}
                animate={{
                    y: scrollProgress * 100,
                }}
            />

            {/* Mountain Layer 2 (Middle) */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full"
                style={{
                    backgroundImage: 'url(/mountain-2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.6,
                }}
                animate={{
                    y: scrollProgress * 150,
                }}
            />

            {/* Mountain Layer 1 (Closest) */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full"
                style={{
                    backgroundImage: 'url(/mountain-1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8,
                }}
                animate={{
                    y: scrollProgress * 200,
                }}
            />

            {/* Planets Overlay */}
            <motion.div
                className="absolute top-20 right-10 w-64 h-64 opacity-20"
                style={{
                    backgroundImage: 'url(/planets.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}
                animate={{
                    rotate: scrollProgress * 360,
                    y: scrollProgress * -50,
                }}
            />

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 w-full h-full opacity-5"
                style={{
                    backgroundImage: 'url(/grid.png)',
                    backgroundSize: '100px 100px',
                    backgroundRepeat: 'repeat',
                }}
            />
        </div>
    )
}

export default ParallaxMountains
