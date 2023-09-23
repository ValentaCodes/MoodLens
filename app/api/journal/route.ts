import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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
  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
// NOTE: Next.js and caching 
// Whenever a page like '/journal' gets data it's going to get cached
// So to fix the issue where I was not seeing the new notes I created render to page unless I the refreshed page
// I can use "revalidatePath()" to tell next.js to revalidate that cache - meaning clean it and get it again whenever there is a change on the page