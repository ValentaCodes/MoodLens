import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  return await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user?.id as string,
        id,
      },
    },
  })
}

// we pass params as props because it is a dynamic route
const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id)
  return (
    // it's "params.id" because that is the name of the folder
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
