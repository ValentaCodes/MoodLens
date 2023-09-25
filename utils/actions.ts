'use server'

import { revalidatePath } from 'next/cache'

export default async function refreshAnalysis(id) {
  revalidatePath(`/journal/${id}`)
}
