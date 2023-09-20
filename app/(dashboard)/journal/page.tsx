// this will be a react server component
// Which means we can fetch all the journal entries right here. no code will make it to the browser.
import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'


const getEntries = async () => {
  const user = await getUserByClerkId()
  console.log('user_data_from_journal', user)

  //   try {
  //     const data = await prisma.journalEntry.findMany({
  //       where: {
  //         userId: user as string
  //       }
  //     })
  //     console.log('journal_entries',data);
  //   } catch (error) {
  //     console.log(error)
  //   }
}

const JournalPage = async () => {
  await getEntries()
  return <div>{}</div>
}

export default JournalPage
