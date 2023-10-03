"use server"
import { revalidatePath } from 'next/cache'
import { Params } from './types'
// server action
export const revalidateAnalysisData = async (params: Params | any) => {
  revalidatePath(`/journal/${params?.id}`)
}

export const revalidateJournalPage = async () => {
  revalidatePath('/journal')
}