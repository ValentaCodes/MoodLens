
import {prisma} from '@/utils/db'
import { redirect } from 'next/navigation'
import type { User } from '@clerk/backend'
import { useUser } from '@clerk/clerk-react'
import { currentUser } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

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
