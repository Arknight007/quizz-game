"use client"

import { motion } from "framer-motion"
import type { Question } from "@/lib/types"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  isAnswered: boolean
  onSelectAnswer: (answer: string) => void
}

export default function QuestionCard({ question, selectedAnswer, isAnswered, onSelectAnswer }: QuestionCardProps) {
  const getAnswerClass = (answer: string) => {
    if (!isAnswered) return ""

    if (answer === question.correctAnswer) {
      return "border-green-500 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
    }

    if (answer === selectedAnswer && answer !== question.correctAnswer) {
      return "border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
    }

    return ""
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]">
      <h2 className="text-2xl font-bold mb-6 text-white" dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="grid gap-4">
        {question.answers.map((answer, index) => (
          <motion.button
            key={index}
            whileHover={!isAnswered ? { scale: 1.02, backgroundColor: "rgba(14, 165, 233, 0.15)" } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
            onClick={() => onSelectAnswer(answer)}
            disabled={isAnswered}
            className={cn(
              "p-4 border border-blue-500/40 rounded-lg text-left transition-all duration-300",
              "bg-blue-900/10 text-blue-100",
              selectedAnswer === answer ? "border-cyan-400" : "",
              getAnswerClass(answer),
              isAnswered ? "cursor-default" : "cursor-pointer hover:border-blue-400",
            )}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-800/50 flex items-center justify-center mr-3 border border-blue-500/50">
                {String.fromCharCode(65 + index)}
              </div>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

