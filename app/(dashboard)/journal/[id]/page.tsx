import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Params = {
  params: {
    id: string
  }
}

// function that will retrieve the entry to navigate/display
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

// we pass params as props because this file is a dynamic route
const EntryPage = async ({params}: Params ) => {
  // it's "params.id" because that is the name of this parents folder
  const entry = await getEntry(params?.id)
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
