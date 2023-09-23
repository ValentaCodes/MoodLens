// This route will be used to make a patch request to update/save journal entries in the db at domain/journal/[id] of the journal entry we want to patch
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
type Params = {
  params: {
    id: string
  }
}

export const PATCH = async (request: Request, {params}: Params) => {
  // In Next we grab the the req.body by using the web standard "Request"
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user?.id as string,
        id: params?.id,
      },
    },
    data: {
      content,
    },
  })
  return NextResponse.json({ data: updatedEntry })
}

