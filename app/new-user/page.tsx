import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import type { User } from '@clerk/nextjs/api'

const createNewUser = async () => {
    const user: User | null = await currentUser()

    const findUser = await prisma.user.findUnique({
      where: {
        clerkId: user?.id as string,
      },
    })

    if (!findUser) {
      await prisma.user.create({
        data: {
          clerkId: user?.id as string,
          email: user?.emailAddresses[0].emailAddress as string,
        },
      })
    }
  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUserPage
