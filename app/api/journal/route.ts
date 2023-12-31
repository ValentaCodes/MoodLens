import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

// This call will create a new journal entry to the database
// Initiated in NewEntryCard
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
// NOTE: Next.js and caching
// Whenever a page like '/journal' gets data it's going to get cached
// So to fix the issue where I was not seeing the new notes I created render to page unless I the refreshed page
// I can use "revalidatePath()" to tell next.js to revalidate that cache - meaning clean it and get it again whenever there is a change on the page