import React from 'react'

const Analysis = ({ entry }) => {
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
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <ul>
        {analysisData.map((data) => (
          <li
            key={data.name}
            className=" px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
          >
            <span className="text-lg font-semibold">{data.name}</span>
            <span>{data.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Analysis