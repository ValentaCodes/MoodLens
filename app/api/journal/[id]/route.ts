// This route will be used to make a patch request to update/save journal entries in the db at domain/journal/[id] of the journal entry we want to patch
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }: any) => {
  // in next we grab the content from using the web standard "Request"
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user?.id as string,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  return NextResponse.json({ data: updatedEntry })
}

