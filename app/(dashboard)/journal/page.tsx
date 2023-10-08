// this will be a react server component
// Which means we can fetch all the journal entries right here. no code will make it to the browser.
import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import { revalidateJournalPage } from '@/utils/actions'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import React, { Suspense } from 'react'
import QuestionForm from '@/components/Questions'
import LoadingAnalysis from './[id]/loading'

const getEntries = async () => {
  try {
    const user = await getUserByClerkId()

    // Find journal entries based on user's ID from OUR database
    const journal_entries = await prisma.journalEntry.findMany({
      where: {
        userId: user?.id as string | undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        analysis: true
      }
    })

    return journal_entries
  } catch (error) {
    console.log(
      "Something went wrong, we couldn't locate any journal entries",
      error
    )
  }
  revalidateJournalPage()
}


const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="py-6 px-6 bg-gray-200/30 3xl:h-screen">
      <div className="text-2xl mb-8 text-center">Journal</div>
      <div className="my-8">
        <Suspense fallback={<LoadingAnalysis/>}>
        <QuestionForm />
        </Suspense>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-4 sm:max-2xl:w-4/5 sm:max-lg:flex-col sm:max-lg:flex sm:mx-0">
        <NewEntryCard />
        {entries?.map((entry) => (
          <div key={entry.id} className="py-4 xl:py-0">
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
