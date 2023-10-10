import {Entry} from '@/utils/interfaces'
import React from 'react'

interface EntryProps {
  entry: Entry | null
}

const Analysis: React.FC<EntryProps> = ({ entry }: EntryProps) => {
  const analysisData = [
    {
      name: 'Summary',
      value: entry?.analysis?.summary,
    },
    {
      name: 'Subject',
      value: entry?.analysis?.subject,
    },
    {
      name: 'Mood',
      value: entry?.analysis?.mood,
    },
    {
      name: 'Negative',
      value: entry?.analysis?.negative ? 'True' : 'False',
    },
  ]
  return (
    <div className="border-l border-black/10">
      <div
        className=" px-6 py-10"
        style={{ backgroundColor: entry?.analysis?.color }}
      >
        <h2 className="text-2xl text-white">Analysis</h2>
      </div>
      <ul>
        {analysisData.map((data) => (
          <li
            key={data.name}
            className=" px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
          >
            <span className="text-lg font-semibold">{data.name}</span>
            <span className="capitalize">{data.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Analysis
