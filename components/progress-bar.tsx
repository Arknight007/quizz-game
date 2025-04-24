"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
  score: number
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-blue-300">
          Question {current} of {total}
        </div>
        <div className="text-cyan-300 font-medium">Score: {score}</div>
      </div>

      <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden border border-blue-500/30">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

