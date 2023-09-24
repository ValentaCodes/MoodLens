// this will be a react server component
// Which means we can fetch all the journal entries right here. no code will make it to the browser.
import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { analyze } from '@/utils/ai'

const getEntries = async () => {
  try {
    const user = await getUserByClerkId()

    // Find journal entries based on clerkId from OUR database
    const journal_entries = await prisma.journalEntry.findMany({
      where: {
        userId: user?.id as string | undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    await analyze('create me a diet plan to gain weight')

    return journal_entries
  } catch (error) {
    console.log(
      "Something went wrong, we couldn't locate any journal entries",
      error
    )
  }
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-gray-200/30 h-full">
      <div className="text-2xl mb-8">Journal</div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries?.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
