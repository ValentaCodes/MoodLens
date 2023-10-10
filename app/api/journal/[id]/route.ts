// This route will be used to make a patch request to update/save journal entries in the db at domain/journal/[id] of the journal entry we want to patch
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import { analyze } from '@/utils/ai'

type Params = {
  params: {
    id: string
  }
}

export const PATCH = async (request: NextRequest, { params }: Params) => {
  // In Next we grab the the req.body by using the web standard "Request"
  const { content } = await request.json()
  const user = await getUserByClerkId()

  // Update a user's journal entry
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
    include: {
      analysis: true,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  // update or create an analysis for a journal entry
  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry?.id,
    },
    create: {
      userId: user?.id!,
      entryId: updatedEntry?.id,
      ...analysis!,
    },
    update: analysis!,
  })
  return NextResponse.json({ data: updatedEntry })
}

// export const DELETE = async ({ params }: Params) => {
//   const user = await getUserByClerkId()

//   const deletedEntry = await prisma.journalEntry.delete({
//     where: {
//       userId_id: {
//         userId: user?.id as string,
//         id: params?.id,
//       },
//     },
//   })

//   return NextResponse.json({
//     data: deletedEntry,
//     message: `Deleted Entry ${params.id}`,
//   })
// }
