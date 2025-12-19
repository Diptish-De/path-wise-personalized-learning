"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question: "What is the standard form of a quadratic equation?",
    options: ["ax + b = 0", "ax² + bx + c = 0", "a²x + bx² + c = 0", "ax³ + bx + c = 0"],
    correct: 1,
  },
  {
    id: 2,
    question: "How many solutions can a quadratic equation have?",
    options: ["Only 1", "Only 2", "Up to 2", "0, 1, or 2"],
    correct: 3,
  },
  {
    id: 3,
    question: "What method can be used to solve any quadratic equation?",
    options: ["Factoring only", "Graphing only", "Quadratic formula", "Trial and error"],
    correct: 2,
  },
]

export default function LessonQuiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = index
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
    }
  }

  const calculateScore = () => {
    const correct = selectedAnswers.filter((answer, idx) => answer === quizQuestions[idx].correct).length
    const percentage = Math.round((correct / quizQuestions.length) * 100)
    setShowResults(true)
    onComplete(percentage)
  }

  if (showResults) {
    const correct = selectedAnswers.filter((answer, idx) => answer === quizQuestions[idx].correct).length
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-primary">{Math.round((correct / quizQuestions.length) * 100)}%</div>
          <p className="text-lg text-muted-foreground">
            You got {correct} out of {quizQuestions.length} questions correct
          </p>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3 mb-3">
                {selectedAnswers[idx] === q.correct ? (
                  <CheckCircle size={24} className="text-accent flex-shrink-0 mt-1" />
                ) : (
                  <XCircle size={24} className="text-destructive flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className="font-semibold text-foreground">{q.question}</p>
                  <p className="text-sm text-muted-foreground mt-1">Correct answer: {q.options[q.correct]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <div className="h-2 rounded-full bg-muted flex-1 ml-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-lg text-foreground font-medium">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectAnswer(idx)}
            className={`w-full p-4 rounded-lg border-2 text-left transition ${
              selectedAnswers[currentQuestion] === idx
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="font-medium text-foreground">{option}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswers[currentQuestion] === undefined}
        className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
      >
        {currentQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next Question"}
      </button>
    </div>
  )
}
