import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authConfig: AuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true},
                password: { label: 'password', type: 'password', required: true},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
        
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
        
                if (!user) {
                    return null;
                }
        
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        
                if (!isValidPassword) {
                    return null;
                }
        
                return { id: user.id, email: user.email, name: user.username };
            },
        })
    ],
    pages: {
        signIn: '/sign-in',
    }
}