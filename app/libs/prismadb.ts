import { PrismaClient } from '@prisma/client'; 

declare global {
    var prisma: PrismaClient | undefined
}


// Purpose: NextJS 13 offloading can create a bunch of prisma clients to be created, you assign it to 
// a global variable to prevent multiple instances of prisma client from being created.
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client; 