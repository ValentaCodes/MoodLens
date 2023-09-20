// this will be a react server component
// Which means we can fetch all the journal entries right here. no code will make it to the browser.
import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'

const getEntries = async () => {
  try {
    const user = await getUserByClerkId()
    console.log('user_data_from_function', user)

    // Find journal entries based on clerkId from OUR database
    const journal_entries = await prisma.journalEntry.findMany({
      where: {
        userId: user?.id as string | undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // logging journal entries
    console.log('journal_entries', journal_entries)
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
    <div className="p-10">
      <div className="text-2xl mb-8">Journal</div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries?.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage
