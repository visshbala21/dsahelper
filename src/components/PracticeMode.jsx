import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'
import { quizData } from '../data/questions'

const PracticeMode = () => {
  const { topic } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const data = quizData[topic]

  useEffect(() => {
    resetQuiz()
  }, [topic])

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === data.questions[currentQuestion].correct
    const newAnswers = [...answers, {
      questionId: data.questions[currentQuestion].id,
      selected: selectedAnswer,
      correct: data.questions[currentQuestion].correct,
      isCorrect
    }]

    setAnswers(newAnswers)
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const getScoreColor = () => {
    const percentage = (score / data.questions.length) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    const percentage = (score / data.questions.length) * 100
    if (percentage >= 80) return 'Excellent! You have a strong understanding of the topic.'
    if (percentage >= 60) return 'Good job! Consider reviewing some concepts.'
    return 'Keep practicing! Review the topics and try again.'
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Practice topic not found
        </h2>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Completed!
          </h1>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{data.questions.length}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {getScoreMessage()}
          </p>
          <button
            onClick={resetQuiz}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>

        {/* Review Answers */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Review Your Answers
          </h2>
          {data.questions.map((question, index) => {
            const userAnswer = answers[index]
            return (
              <div key={question.id} className="card p-6">
                <div className="flex items-start space-x-3">
                  {userAnswer.isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {question.question}
                    </h3>
                    <div className="space-y-1 mb-3">
                      <p className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Your answer: </span>
                        <span className={userAnswer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {question.options[userAnswer.selected]}
                        </span>
                      </p>
                      {!userAnswer.isCorrect && (
                        <p className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Correct answer: </span>
                          <span className="text-green-600">
                            {question.options[question.correct]}
                          </span>
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const question = data.questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.title} Quiz
          </h1>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {data.questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / data.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {question.question}
        </h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : showResult && index === question.correct
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correct
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-blue-500 bg-blue-500'
                    : showResult && index === question.correct
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {(selectedAnswer === index || (showResult && index === question.correct)) && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === question.correct
              ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start space-x-3">
              {selectedAnswer === question.correct ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${
                  selectedAnswer === question.correct ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect'}
                </p>
                <p className={`text-sm mt-1 ${
                  selectedAnswer === question.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
          <div className="space-x-3">
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="btn-primary"
              >
                {currentQuestion < data.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticeMode