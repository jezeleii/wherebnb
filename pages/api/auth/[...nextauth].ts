import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import Google from 'next-auth/providers/google';


//authOptions Object Creation 
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string, 
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials', 
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }, 
            }, 
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials');
                }


                //npx prisma db push will be called here - VALIDATION
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                }); 

                //check if user exists
                if (!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials');
                }

                //check if password is correct
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, 
                    user.hashedPassword
                );

                //check if password not correct
                if (!isCorrectPassword){
                    throw new Error('Invalid credentials');
                }

                return user; 
            }
        })
    ], 
    pages: {
        signIn: '/',
    },
    //enable debug ony in development
    debug: process.env.NODE_ENV === 'development', 
    session: {
        strategy: 'jwt'
    }, 
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
