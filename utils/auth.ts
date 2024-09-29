// This file will allow us to get a user from our database not clerks
// We can leverage clerkId to reference the clerkId's in our database
// This helper function will reduce writing that function in every file we need our user's data

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/utils/db'

export const getUserByClerkId = async () => {
  try {
    // grab userId from clerks DB
    const { userId } = auth()
    // return and compare it to our clerkId
    return await prisma.user.findUniqueOrThrow({
      where: {
      clerkId: userId as string,
      },
    })
  } catch (error) {
    console.error('Error finding user', error)
  }
}
