"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="px-4 md:px-6 py-10 text-center relative min-h-screen">
      {/* Decorations */}
      <AnimatePresence>
        {decorated && (
          <>
            {/* Bunting at top */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="fixed top-0 left-0 w-full z-50 pointer-events-none"
            >
              <Bunting />
            </motion.div>

            {/* String lights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="fixed top-20 left-0 w-full z-40 pointer-events-none"
            >
              <StringLights />
            </motion.div>

            {/* Floating balloons on sides */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="fixed left-4 md:left-10 top-1/3 z-30 pointer-events-none"
            >
              <FloatingBalloons side="left" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="fixed right-4 md:right-10 top-1/3 z-30 pointer-events-none"
            >
              <FloatingBalloons side="right" />
            </motion.div>

            {/* Sparkles and stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="fixed inset-0 z-20 pointer-events-none"
            >
              <Sparkles />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {lit && (
        <motion.div className="absolute top-32 md:top-28 left-0 w-full text-center text-[40px] md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight px-4 z-10"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))" }}
          initial={{ opacity: 0, scale: 0.8, }}
          animate={{ opacity: 1, scale: 1, }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        >
          Happy Birthday, Dipa!
        </motion.div>
      )}

      <div className="relative flex flex-col items-center gap-8 mt-52">
        <div className="relative mb-6">
          <Cake lit={lit} />
        </div>
        <AnimatePresence mode="wait">
          {!decorated ? (
            <motion.div
              key="decorate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={decorate}>
                <WandSparkles size={20} />
                Decorate
              </GradientButton>
            </motion.div>
          ) : !lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={20} />
                Light the Candle
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={onNext}>
                Next
                <ArrowRight size={20} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="flame"></motion.div>}
        </div>
      </div>
    </div>
  )
}

function Bunting() {
  const flagColors = [
    "bg-pink-400",
    "bg-cyan-400", 
    "bg-yellow-400",
    "bg-pink-500",
    "bg-purple-400",
    "bg-green-400",
    "bg-orange-400",
    "bg-fuchsia-400",
    "bg-blue-400",
    "bg-rose-400",
    "bg-violet-400",
    "bg-teal-400",
    "bg-pink-400",
    "bg-cyan-400",
    "bg-yellow-400",
  ]

  return (
    <div className="relative w-full h-24 overflow-hidden">
      {/* String/rope */}
      <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M -10 30 Q 25 35, 50 30 T 150 30 T 250 30 T 350 30 T 450 30 T 550 30 T 650 30 T 750 30 T 850 30 T 950 30 T 1050 30 T 1150 30 T 1250 30 T 1350 30 T 1450 30 T 1550 30"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Flags */}
      <div className="absolute top-0 left-0 w-full flex justify-around px-4">
        {flagColors.map((color, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, rotate: 0 }}
            animate={{ 
              y: 0,
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              y: { duration: 0.6, delay: i * 0.05, ease: "easeOut" },
              rotate: { 
                duration: 2, 
                delay: 0.6 + i * 0.05,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
            style={{ transformOrigin: "top center" }}
          >
            {/* Flag triangle */}
            <div 
              className={`w-12 h-14 ${color} shadow-lg`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StringLights() {
  const lightColors = [
    "#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B9D", 
    "#C77DFF", "#FFD93D", "#FF6B9D", "#6BCB77", "#4D96FF",
    "#FF6B9D", "#C77DFF", "#FFD93D", "#6BCB77", "#4D96FF"
  ]

  return (
    <div className="relative w-full h-16">
      {/* Wire */}
      <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M -10 8 Q 30 12, 60 8 T 160 8 T 260 8 T 360 8 T 460 8 T 560 8 T 660 8 T 760 8 T 860 8 T 960 8 T 1060 8 T 1160 8 T 1260 8 T 1360 8 T 1460 8 T 1560 8"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Lights */}
      <div className="absolute top-0 left-0 w-full flex justify-around px-4">
        {lightColors.map((color, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: 1
            }}
            transition={{
              opacity: {
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: { duration: 0.3, delay: i * 0.05 }
            }}
            className="relative"
          >
            <div 
              className="w-4 h-6 rounded-full shadow-lg"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}, 0 0 30px ${color}80`
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FloatingBalloons({ side }) {
  const balloons = [
    { color: "#FF69B4", delay: 0 },
    { color: "#FFD700", delay: 0.2 },
    { color: "#87CEEB", delay: 0.4 },
  ]

  return (
    <div className="flex flex-col gap-8">
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -20, 0],
            x: side === "left" ? [0, 10, 0] : [0, -10, 0]
          }}
          transition={{
            duration: 3,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Balloon */}
          <div 
            className="w-12 h-16 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-lg relative"
            style={{ 
              backgroundColor: balloon.color,
              boxShadow: `0 4px 15px ${balloon.color}80`
            }}
          >
            {/* Shine */}
            <div className="absolute top-2 left-2 w-4 h-6 bg-white/40 rounded-full blur-sm" />
          </div>
          {/* Knot */}
          <div 
            className="w-2 h-3 mx-auto rounded-b-full"
            style={{ backgroundColor: balloon.color }}
          />
          {/* String */}
          <div className="w-px h-12 bg-white/30 mx-auto" />
        </motion.div>
      ))}
    </div>
  )
}

function Sparkles() {
  const sparklePositions = [
    { top: "15%", left: "10%", delay: 0 },
    { top: "25%", left: "85%", delay: 0.3 },
    { top: "40%", left: "15%", delay: 0.6 },
    { top: "35%", left: "90%", delay: 0.9 },
    { top: "60%", left: "8%", delay: 1.2 },
    { top: "65%", left: "92%", delay: 1.5 },
    { top: "20%", left: "50%", delay: 0.4 },
    { top: "70%", left: "50%", delay: 1.0 },
  ]

  return (
    <>
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: pos.top, left: pos.left }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            delay: pos.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-2xl md:text-3xl">
            {i % 3 === 0 ? "✨" : i % 3 === 1 ? "⭐" : "💫"}
          </div>
        </motion.div>
      ))}
    </>
  )
}