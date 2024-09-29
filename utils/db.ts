// import { PrismaClient } from '@prisma/client'
// // This is how we will make a new instance for prisma client
// // With hot module reloading, multiple database connection objects can be created
// // Causing issues in the application. These utility methods check if the connection has already been established and reuse the existing connection.
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient 
// }

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['query'],
//   })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import ws from 'ws'

dotenv.config()
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
export const prisma = new PrismaClient({ adapter })