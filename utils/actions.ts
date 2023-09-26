'use server'

import { revalidatePath } from 'next/cache'

export const getAnalysisData = async (params) => {
  'use server'
  revalidatePath(`/journal/${params.id}`)
}
