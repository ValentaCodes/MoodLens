"use server"
import { revalidatePath } from 'next/cache'
// server action
export const revalidateAnalysisData = async (params) => {
  revalidatePath(`/journal/${params.id}`)
}

export const revalidateJournalPage = async () => {
  revalidatePath('/journal')
}