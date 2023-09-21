'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
  const router = useRouter()
  
  const handleNewEntry = async () => {

   const data = await createNewEntry()
    router.push(`/journal/${data?.id}`)
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-red-700 text-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleNewEntry}>
        <span className="text-2xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard
