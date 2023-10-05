'use client'
import React, { useState } from 'react'

const QuestionForm = () => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="rounded-lg border border-black/20 py-6 px-6 sm:max-2xl:w-3/5 sm:max-lg:text-lg"
          aria-label="Question Input"
          placeholder="Ask me a question about your journal entries..."
        />
        <button
          className="rounded-lg bg-red-700 text-white py-6 px-8 shadow"
          type="submit"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default QuestionForm
