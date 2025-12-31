import { motion } from 'framer-motion'

const ShootingStars = ({ count = 3 }) => {
    const shootingStars = Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: Math.random() * 10,
        duration: Math.random() * 2 + 1,
        startX: Math.random() * 100,
        startY: Math.random() * 50,
    }))

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {shootingStars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${star.startX}%`,
                        top: `${star.startY}%`,
                        boxShadow: '0 0 15px 3px rgba(6, 182, 212, 0.6)', // Cyan glow
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        x: [0, -300], // Increased distance
                        y: [0, 300],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 8 + 5, // More frequent
                        ease: 'easeOut',
                    }}
                >
                    {/* Shooting star tail - Aligned with movement (135deg angle -> tail at -45deg) */}
                    <div
                        className="absolute top-1/2 left-1/2 w-[150px] h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
                        style={{
                            transform: 'translate(0, -50%) rotate(-45deg)', // Head at star, tail extends Up-Right
                            transformOrigin: 'left center', // Rotate around the bright end (left)
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ShootingStars
