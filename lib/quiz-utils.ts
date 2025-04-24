import type { Question } from "./types"

const sampleQuestions: Question[] = [
  {
    question: "What year was the first commercial video game released?",
    answers: ["1971", "1972", "1975", "1978"],
    correctAnswer: "1971",
  },
  {
    question: "Which programming language was created by Brendan Eich in 10 days?",
    answers: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does CPU stand for?",
    answers: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Processor Unifier",
      "Central Program Utility",
    ],
    correctAnswer: "Central Processing Unit",
  },
  {
    question: "Which company developed the first graphical user interface (GUI)?",
    answers: ["Microsoft", "Apple", "Xerox", "IBM"],
    correctAnswer: "Xerox",
  },
  {
    question: "What was the name of the first widely-used web browser?",
    answers: ["Internet Explorer", "Mosaic", "Netscape Navigator", "Opera"],
    correctAnswer: "Mosaic",
  },
  {
    question: "In what year was Bitcoin created?",
    answers: ["2007", "2008", "2009", "2010"],
    correctAnswer: "2009",
  },
  {
    question: "Which science fiction movie features a computer system called HAL 9000?",
    answers: ["Blade Runner", "The Matrix", "2001: A Space Odyssey", "Star Wars"],
    correctAnswer: "2001: A Space Odyssey",
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Hyperlink Text Management Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
]

// Function to get and shuffle questions
export function getQuestions(): Question[] {
  // Create a copy of the questions array to avoid mutating the original
  const shuffledQuestions = [...sampleQuestions]

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]]
  }

  // Return a subset of questions (or all if you want)
  return shuffledQuestions
}

