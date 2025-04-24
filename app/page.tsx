import QuizContainer from "@/components/quiz-container"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 z-0"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <QuizContainer />
      </div>
    </main>
  )
}

