// This file will allow us to get a user from our database not clerks
// We can leverage clerkId to reference our id's
// This helper function will reduce writing that function in every file we need user data

import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils/db'

export const getUserByClerkId = async () => {
  try {
    // grab userId from clerks DB
    const { userId }: { userId: string | null } = auth()
    console.log(userId);
    
    // compare it to our clerkId
    await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId as string,
      },
    })

  } catch (error) {
    console.error('Error finding user', error)
  }
}
