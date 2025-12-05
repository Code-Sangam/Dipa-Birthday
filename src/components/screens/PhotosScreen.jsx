"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail } from "lucide-react"
import GradientButton from "../GradientButton"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)

  const photos = [
    "/images/1.jpeg",
    "/images/5.jpg",
    "/images/2.jpeg",
    "/images/6.jpg",
    "/images/3.jpeg",
    "/images/7.jpg",
    "/images/4.jneg",
    "/images/8.jpg",
    "/images/9.jpg",
    "/images/10.jpg",
  ]

  return (
    <div className="px-4 md:px-6 py-10">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          Some Sweet Moments
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Swipe the cards)</p>
      </div>

      <div className="relative flex justify-center">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
            lazy={true}
            preloadImages={false}
            loop={true}
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-pink-900/20 to-purple-900/20 overflow-hidden">
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    className="h-full w-full rounded-xl object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
