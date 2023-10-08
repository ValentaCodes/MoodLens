'use client'
import { askQuestion } from '@/utils/api'
import React, { Suspense, useState } from 'react'
import LoadingAnalysis from '@/app/(dashboard)/journal/[id]/loading'

const QuestionForm = () => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)
    setIsLoading(false)
  }
  return (
    <div className="">
      {isLoading ?? <LoadingAnalysis />}
      <form onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="rounded-lg border border-black/20 py-6 px-6 sm:max-2xl:w-3/5 sm:max-lg:text-lg"
          aria-label="Question Input"
          placeholder="Ask me a question about your journal entries..."
        />
        <button
          disabled={isLoading}
          className="rounded-lg bg-red-700 text-white py-6 px-8 shadow"
          type="submit"
        >
          Ask
        </button>
      </form>
      {response ?? <div>{response}</div>}
    </div>
  )
}

export default QuestionForm
