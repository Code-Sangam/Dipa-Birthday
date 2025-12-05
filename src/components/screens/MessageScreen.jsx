"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"
import { ArrowRight } from "lucide-react"

export default function MessageScreen({ onNext }) {
    const [opened, setOpened] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setOpened(false)
            setIsClosing(false)
        }, 1500)
    }

    return (
        <div className="px-4 md:px-6 py-10 text-center min-h-screen flex flex-col items-center justify-center relative">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-12 leading-tight"
            >
                A Special Message
            </motion.h2>

            <div className="relative" style={{ perspective: "2000px" }}>
                {!opened ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setOpened(true)}
                        className="cursor-pointer"
                    >
                        <ClosedBook />
                    </motion.div>
                ) : (
                    <OpenBook onNext={onNext} />
                )}
            </div>
        </div>
    )
}

function ClosedBook() {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-[280px] h-[440px] md:w-[320px] md:h-[500px] overflow-hidden rounded-lg"
        >
            <img 
                src="/images/book_cover.png" 
                alt="Birthday Book Cover" 
                className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
        </motion.div>
    )
}

function OpenBook({ onNext }) {
    return (
        <div className="relative">
            <div className="relative w-[280px] h-[440px] md:w-[320px] md:h-[500px]" style={{ transformStyle: "preserve-3d" }}>
                {/* Message page (bottom layer - always visible, narrower to match image) */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50 rounded-lg shadow-2xl">
                    {/* Pink border frame */}
                    <div className="w-full h-full p-3">
                        <div className="w-full h-full border-4 border-pink-300 rounded-lg p-3 overflow-y-auto bg-white/50">
                            <p className="text-[#301733] text-xs md:text-sm leading-relaxed text-left font-medium">
                                 Happy Birthday, Dipa! You deserve all the happiness, love, and smiles in the world today and always.
                                You have this special way of making everything around you brighter, your smile, your kindness, and the way
                                you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that
                                make your heart happy. You're truly one of a kind, and I just want you to know how special you are.
                                Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness,
                                success, and all the sweet things life has to offer. 💗
                                <br/><br/>
                                U made me the person I am now, Always thinking good for me. 
                                <br/><br/>
                                Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness,
                                and all the wonderful things life has to offer!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Book cover (top layer - covers message, then rotates away) */}
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ 
                        rotateY: -180,
                        transition: {
                            duration: 1.5,
                            ease: "easeInOut"
                        }
                    }}
                    className="absolute inset-0 origin-left rounded-lg overflow-hidden"
                    style={{ 
                        transformStyle: "preserve-3d"
                    }}
                >
                    <img 
                        src="/images/book_cover.png" 
                        alt="Birthday Book Cover" 
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                    />
                </motion.div>
            </div>

            {/* Next button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mt-8 flex justify-center"
            >
                <GradientButton onClick={onNext}>
                    Next
                    <ArrowRight size={20} className="mt-0.5" />
                </GradientButton>
            </motion.div>
        </div>
    )
}
