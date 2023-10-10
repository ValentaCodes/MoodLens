import {Entry} from '@/utils/interfaces'
import React from 'react'
interface EntryProps {
  entry: Entry
}

const EntryCard: React.FC<EntryProps> = ({ entry }: EntryProps) => {
  const date: string = new Date(entry?.createdAt).toDateString()

  let isStarterEntry = false

  if (entry.content === 'Write about your day!') {
    isStarterEntry = true
  }
  let starterEntry = (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 h-1/3">{date}</div>
      <div className="px-4 py-5 sm:p-6 truncate h-1/3 text-black/50">
        <p>Finish entry for analysis</p>
      </div>
      <div className="px-4 py-5 sm:px-6 h-1/3 capitalize text-black/50">
        <p>Not enough information</p>
      </div>
    </div>
  )

  return (
    <div>
      {isStarterEntry ? (
        starterEntry
      ) : (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 h-1/3">{date}</div>
          <div className="px-4 py-5 sm:p-6 truncate h-1/3">
            {entry?.analysis?.summary}
          </div>
          <div className="px-4 py-5 sm:px-6 h-1/3 capitalize">
            {entry?.analysis?.mood}
          </div>
        </div>
      )}
    </div>
  )
}

export default EntryCard
