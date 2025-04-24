import type { ApiResponse, Question } from "./types"
import { getQuestions as getLocalQuestions } from "./quiz-utils"

export async function fetchQuestions(amount = 10): Promise<Question[]> {
  try {
    // Use our Next.js API route instead of directly calling the external API
    const response = await fetch(`/api/questions?amount=${amount}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`)
    }

    const data: ApiResponse = await response.json()

    if (data.response_code !== 0) {
      throw new Error("API returned an error")
    }

    return data.results.map((q) => {
      let question, correctAnswer, incorrectAnswers, category, difficulty

      try {
        // Try to decode base64 strings
        question = atob(q.question)
        correctAnswer = atob(q.correct_answer)
        incorrectAnswers = q.incorrect_answers.map((a) => atob(a))
        category = atob(q.category)
        difficulty = atob(q.difficulty)
      } catch (e) {
        // If decoding fails, use the strings as they are (for local questions)
        question = q.question
        correctAnswer = q.correct_answer
        incorrectAnswers = q.incorrect_answers
        category = q.category || "General Knowledge"
        difficulty = q.difficulty || "medium"
      }

      // Combine and shuffle answers
      const answers = [...incorrectAnswers, correctAnswer]
      shuffleArray(answers)

      return {
        question,
        answers,
        correctAnswer,
        category,
        difficulty,
      }
    })
  } catch (error) {
    console.error("Error fetching questions:", error)

    // Fallback to local questions if everything fails
    console.log("Falling back to local questions")
    return getLocalQuestions()
  }
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

