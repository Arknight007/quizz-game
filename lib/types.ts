export interface ApiQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface ApiResponse {
  response_code: number
  results: ApiQuestion[]
}

export interface Question {
  question: string
  answers: string[]
  correctAnswer: string
  category: string
  difficulty: string
}

