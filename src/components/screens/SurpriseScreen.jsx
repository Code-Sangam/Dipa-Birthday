"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function SurpriseScreen() {
    const [isOpened, setIsOpened] = useState(false)

    const handleGiftClick = () => {
        setIsOpened(true)
        
        // Trigger confetti
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffc0cb']
            })
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffc0cb']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
            {!isOpened ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <motion.h1
                        animate={{ 
                            scale: [1, 1.05, 1],
                            textShadow: [
                                "0 0 20px rgba(236,72,153,0.3)",
                                "0 0 30px rgba(236,72,153,0.5)",
                                "0 0 20px rgba(236,72,153,0.3)"
                            ]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400"
                    >
                        One Last Thing...
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGiftClick}
                        className="cursor-pointer"
                    >
                        <img 
                            src="/gifs/gift.gif" 
                            alt="Gift box" 
                            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                        />
                    </motion.div>

                    <motion.p
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xl md:text-2xl text-pink-200 font-light"
                    >
                        Tap the gift
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className="flex flex-col items-center gap-8 max-w-2xl"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 10, -10, 10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 0.5,
                            repeat: 3
                        }}
                    >
                        <img 
                            src="/gifs/surprise.gif" 
                            alt="Surprise" 
                            className="w-48 h-48 md:w-64 md:h-64 object-contain"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400"
                    >
                        Happy Birthday, Dipa! 🎉
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg md:text-xl text-pink-100 leading-relaxed px-4"
                    >
                        May this year bring you endless joy, amazing adventures, and all the love you deserve. 
                        You're truly special, and I'm so grateful to celebrate this day with you! 💖
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-2xl md:text-3xl mt-4"
                    >
                        🎂🎈🎁✨💝
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
