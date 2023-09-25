'use client'
import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { useRouter } from 'next/navigation'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      await updateEntry(entry?.id, _value)
      setIsLoading(false)
      setTimeout(() => {
        router.refresh()
      }, 300)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>...saving</div>}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
