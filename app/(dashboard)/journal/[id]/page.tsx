import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { Suspense } from 'react'
import LoadingAnalysis from './loading'
import Analysis from '@/components/Analysis'

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
    include: {
      analysis: true,
    },
  })
}

// we pass params as props because this file is a dynamic route
const EntryPage = async ({ params }: Params) => {
  // it's "params.id" because that is the name of this parents folder
  const entry = await getEntry(params?.id)

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <Suspense fallback={<LoadingAnalysis />}>
        <Analysis entry={entry} />
      </Suspense>
    </div>
  )
}

export default EntryPage
