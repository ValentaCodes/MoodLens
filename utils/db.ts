import { PrismaClient } from '@prisma/client'
// This is how we will make a new instance for prisma client
// With hot module reloading, multiple database connection objects can be created
// Causing issues in the application. These utility methods check if the connection has already been established and reuse the existing connection.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient 
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
