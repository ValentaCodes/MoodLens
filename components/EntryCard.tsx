import Entry from '@/utils/interfaces'
import React from 'react'
interface EntryProps {
  entry: Entry
}

const EntryCard: React.FC<EntryProps> = ({ entry }: EntryProps) => {
  const date: string = new Date(entry?.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 h-1/3">{date}</div>
      <div className="px-4 py-5 sm:p-6 truncate h-1/3">
        {entry?.analysis?.summary}
      </div>
      <div className="px-4 py-5 sm:px-6 h-1/3 capitalize">
        {entry?.analysis?.mood}
      </div>
    </div>
  )
}

export default EntryCard
