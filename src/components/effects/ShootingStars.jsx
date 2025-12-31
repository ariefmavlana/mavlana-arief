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
                        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        x: [0, -200],
                        y: [0, 200],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 15 + 10,
                        ease: 'easeOut',
                    }}
                >
                    {/* Shooting star tail */}
                    <div
                        className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
                        style={{
                            transform: 'rotate(45deg)',
                            transformOrigin: 'left center',
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ShootingStars
