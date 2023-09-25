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
const EntryPage = async ({ params }: Params) => {
  // it's "params.id" because that is the name of this parents folder
  const entry = await getEntry(params?.id)
  const analysisData = [
    {
      name: 'Summary',
      value: '',
    },
    {
      name: 'Subject',
      value: '',
    },
    {
      name: 'Mood',
      value: '',
    },
    {
      name: 'Negative',
      value: false,
    },
  ]
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10 ">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((data) => (
            <li
              key={data.name}
              className=" px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
            >
              <span className="text-lg font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EntryPage
