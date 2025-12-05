"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight } from "lucide-react"

const balloonColors = [
  { bg: "bg-pink-400", shadow: "shadow-pink-400/50" },
  { bg: "bg-black", shadow: "shadow-black/50" },
  { bg: "bg-rose-500", shadow: "shadow-rose-500/50" },
  { bg: "bg-fuchsia-400", shadow: "shadow-fuchsia-400/50" },
  { bg: "bg-pink-300", shadow: "shadow-pink-300/50" },
  { bg: "bg-gray-800", shadow: "shadow-gray-800/50" },
]

const flowers = ["🍃", "🍁", "💮", "🍂", "🌷", "🌹", "💐", "🏵️", "🥀", "🪷"]

export default function BalloonScreen({ onNext }) {
  const [poppedBalloons, setPoppedBalloons] = useState([])
  const [flowerBursts, setFlowerBursts] = useState([])

  const popBalloon = (index, event) => {
    if (poppedBalloons.includes(index)) return

    setPoppedBalloons([...poppedBalloons, index])
    
    // Get balloon position for confetti origin
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    // Create multiple flower petals spreading out
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)]
    const newBursts = []
    
    // Create 12 flower petals spreading in different directions
    for (let i = 0; i < 12; i++) {
      const burstId = Date.now() + index + i
      const angle = (i * 30) * (Math.PI / 180) // 30 degrees apart
      newBursts.push({ 
        id: burstId, 
        flower: randomFlower, 
        index,
        angle 
      })
    }
    
    setFlowerBursts([...flowerBursts, ...newBursts])

    // Canvas confetti effect
    confetti({
      particleCount: 50,
      spread: 360,
      origin: { x, y },
      colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#C71585'],
      shapes: ['circle'],
      scalar: 0.8,
      gravity: 1.2,
      drift: 0,
      ticks: 200
    })

    // Remove flower bursts after animation
    setTimeout(() => {
      setFlowerBursts(prev => prev.filter(f => !newBursts.find(b => b.id === f.id)))
    }, 2500)
  }

  const allPopped = poppedBalloons.length === balloonColors.length

  return (
    <div className="px-4 md:px-6 py-10 text-center relative min-h-[600px]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-8"
      >
        Pop the Balloons!
      </motion.h2>

      <div className="relative grid grid-cols-3 gap-6 md:gap-10 max-w-2xl mx-auto mb-12">
        {balloonColors.map((color, index) => (
          <div key={index} className="relative flex justify-center">
            <AnimatePresence>
              {!poppedBalloons.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.15, duration: 0.6 }
                  }}
                  exit={{ 
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.2 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => popBalloon(index, e)}
                  className="cursor-pointer"
                >
                  <Balloon color={color} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flower petals spreading animation */}
            <AnimatePresence>
              {flowerBursts.filter(f => f.index === index).map(burst => {
                const distance = 150 + Math.random() * 50
                const x = Math.cos(burst.angle) * distance
                const y = Math.sin(burst.angle) * distance
                const rotation = Math.random() * 720 - 360
                
                return (
                  <motion.div
                    key={burst.id}
                    initial={{ 
                      scale: 0, 
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0
                    }}
                    animate={{ 
                      scale: [0.5, 1, 0.8],
                      opacity: [1, 1, 0],
                      x: x,
                      y: y,
                      rotate: rotation
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeOut",
                      times: [0, 0.3, 1]
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl pointer-events-none z-20"
                  >
                    {burst.flower}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-2xl md:text-3xl text-pink-200 font-semibold">
              Yay! You popped them all! 🎉
            </p>
            <GradientButton onClick={onNext}>
              Next
              <ArrowRight size={20} className="mt-0.5" />
            </GradientButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Balloon({ color }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [-2, 2, -2]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      {/* Balloon body */}
      <div className={`w-20 h-24 md:w-24 md:h-28 ${color.bg} rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-lg ${color.shadow} relative`}>
        {/* Shine effect */}
        <div className="absolute top-4 left-4 w-6 h-8 bg-white/30 rounded-full blur-sm"></div>
      </div>
      
      {/* Balloon knot */}
      <div className={`w-3 h-4 ${color.bg} mx-auto rounded-b-full`}></div>
      
      {/* String */}
      <div className="w-0.5 h-16 bg-gray-300/60 mx-auto"></div>
    </motion.div>
  )
}
