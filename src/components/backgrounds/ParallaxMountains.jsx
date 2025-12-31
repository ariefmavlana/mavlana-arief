import { motion } from 'framer-motion'

const ParallaxMountains = ({ scrollProgress = 0 }) => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Sky Background - More cosmic */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: 'url(/sky.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15, // Reduced opacity for darker space feel
                }}
                animate={{
                    y: scrollProgress * 50,
                }}
            />

            {/* Mountain Layer 3 (Farthest) - Tinted purple */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full mix-blend-overlay opacity-30"
                style={{
                    backgroundImage: 'url(/mountain-3.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
                animate={{
                    y: scrollProgress * 100,
                }}
            />

            {/* Mountain Layer 2 (Middle) - Tinted cyan */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full mix-blend-hard-light opacity-40"
                style={{
                    backgroundImage: 'url(/mountain-2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
                animate={{
                    y: scrollProgress * 150,
                }}
            />

            {/* Mountain Layer 1 (Closest) - Silhouette */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-full opacity-80"
                style={{
                    backgroundImage: 'url(/mountain-1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
                animate={{
                    y: scrollProgress * 200,
                }}
            />

            {/* Planets Overlay - Kept as requested */}
            <motion.div
                className="absolute top-20 right-10 w-64 h-64 opacity-20 hover:opacity-40 transition-opacity duration-1000"
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

            {/* REMOVED GRID OVERLAY HERE */}
        </div>
    )
}

export default ParallaxMountains
