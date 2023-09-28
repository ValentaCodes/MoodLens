"use server"
import { revalidatePath } from 'next/cache'
// server action
export const getAnalysisData = async (params) => {
  revalidatePath(`/journal/${params.id}`)
}
