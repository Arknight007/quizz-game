"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuestionCard from "@/components/question-card"
import ProgressBar from "@/components/progress-bar"
import ResultScreen from "@/components/result-screen"
import type { Question } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { fetchQuestions } from "@/lib/api"
import LoadingSpinner from "@/components/loading-spinner"

export default function QuizContainer() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadQuestions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedQuestions = await fetchQuestions(10)
      setQuestions(fetchedQuestions)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Failed to load questions: ${errorMessage}. Trying to use local questions...`)
      console.error(err)

      // Try to load local questions as fallback
      try {
        const { getQuestions } = await import("@/lib/quiz-utils")
        const localQuestions = getQuestions()
        setQuestions(localQuestions)
        setError(null) // Clear error if local questions loaded successfully
      } catch (fallbackErr) {
        console.error("Failed to load local questions:", fallbackErr)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartQuiz = async () => {
    await loadQuestions()
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const currentQuestion = questions[currentQuestionIndex]
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = async () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setQuizCompleted(false)

    // Fetch new questions for a fresh experience
    await loadQuestions()
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 text-center shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 text-transparent bg-clip-text">
          QUEZZ
        </h1>
        <p className="text-blue-200 mb-8 text-lg">Test your Knowledge with Questions</p>
        <Button
          onClick={handleStartQuiz}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-md shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]"
        >
          START QUIZ
        </Button>
      </motion.div>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-xl p-8 text-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Error</h2>
        <p className="text-white mb-6">{error}</p>
        <Button
          onClick={loadQuestions}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (quizCompleted) {
    return <ResultScreen score={score} totalQuestions={questions.length} onRestart={handleRestartQuiz} />
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return <LoadingSpinner />
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} score={score} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onSelectAnswer={handleAnswerSelect}
          />
        </motion.div>
      </AnimatePresence>

      {isAnswered && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center">
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-md shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.7)]"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

