import { getServerSession } from 'next-auth/next'; 
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function getSession(){
    return await getServerSession(authOptions);
}


//not api call, it is direct comms with the database to get components
export default async function getCurrentUser(){
    try{
        //initiate session 
        const session = await getSession();

        //check if session correct
        if (!session?.user?.email){
            return null; 
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser){
            return null; 
        }

        return {
            ...currentUser, 
            createdAt: currentUser.createdAt.toISOString(), 
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null 
        };
    } catch(error: any){
        return null; 
    }
}