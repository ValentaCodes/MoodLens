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

  if (!updatedEntry.analysis) {
      const analysis = await analyze(updatedEntry.content)
      await prisma.analysis.create({
        data: {
          entryId: updatedEntry?.id,
          // we can use a spread because all property names in schema are the same names and types as they are in our zod schema
          ...analysis,
        },
      })
  } else { 
    const updatedAnalysis = await analyze(updatedEntry.content)
    await prisma.analysis.update({
      where: {
        id: updatedEntry?.analysis?.id
      },
      data: {
        ...updatedAnalysis
      }
    })
  }
  return NextResponse.json({ data: updatedEntry })
}

