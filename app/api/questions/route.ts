import { NextResponse } from "next/server"
import { getQuestions } from "@/lib/quiz-utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const amount = searchParams.get("amount") || "10"

  try {
    // Try to fetch from the external API
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&encode=base64`)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from external API:", error)

    // Fallback to local questions if external API fails
    // Return in a format similar to the external API
    const localQuestions = getQuestions()
    const formattedQuestions = {
      response_code: 0,
      results: localQuestions.map((q) => ({
        category: "Local Questions",
        type: "multiple",
        difficulty: "medium",
        question: q.question,
        correct_answer: q.correctAnswer,
        incorrect_answers: q.answers.filter((a) => a !== q.correctAnswer),
      })),
    }

    return NextResponse.json(formattedQuestions)
  }
}

