import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

//This call will allow me to post journal entires to the database
export const POST = async () => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user?.id as string,
      content: 'Write about your day!',
    },
  })
  return NextResponse.json({ data: entry })
}
