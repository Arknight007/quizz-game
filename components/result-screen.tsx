"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface ResultScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function ResultScreen({ score, totalQuestions, onRestart }: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  useEffect(() => {
    // Trigger confetti if score is good
    if (percentage >= 70) {
      const duration = 3 * 1000
      const end = Date.now() + duration
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#0ea5e9", "#06b6d4", "#14b8a6"],
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#0ea5e9", "#06b6d4", "#14b8a6"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [percentage])

  let message = ""
  let messageColor = ""

  if (percentage >= 90) {
    message = "Outstanding!"
    messageColor = "text-cyan-400"
  } else if (percentage >= 70) {
    message = "Great job!"
    messageColor = "text-blue-400"
  } else if (percentage >= 50) {
    message = "Good effort!"
    messageColor = "text-teal-400"
  } else {
    message = "Keep practicing!"
    messageColor = "text-sky-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 text-center shadow-[0_0_20px_rgba(56,189,248,0.4)]"
    >
      <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 text-transparent bg-clip-text">
        Quiz Complete!
      </h2>

      <h3 className={`text-2xl font-bold mb-6 ${messageColor}`}>{message}</h3>

      <div className="mb-8">
        <div className="text-6xl font-bold mb-2 text-white">
          {score}/{totalQuestions}
        </div>
        <div className="text-xl text-blue-200">{percentage}% Correct</div>
      </div>

      <div className="relative h-4 bg-blue-900/30 rounded-full overflow-hidden border border-blue-500/30 mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <Button
        onClick={onRestart}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-md shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]"
      >
        Play Again
      </Button>
    </motion.div>
  )
}

