'use client'
import { updateEntry } from '@/utils/api'
import React, { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { revalidateAnalysisData } from '@/utils/actions'
import LoadingAnalysis from '@/app/(dashboard)/journal/[id]/loading'
import { Entry } from '@/utils/interfaces'

interface EntryProps {
  entry: Entry | null
}

const Editor: React.FC<EntryProps> = ({ entry }: EntryProps) => {
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsLoading] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      await updateEntry(entry?.id as string, _value!)
      setIsLoading(false)
      // server action that invalidates cached data
      revalidateAnalysisData(entry?.id)
    },
  })
  return (
    <div className="w-full h-full">
      {isLoading && <LoadingAnalysis />}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
