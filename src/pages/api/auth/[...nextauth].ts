import { PrismaClient } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const Authconfig: AuthOptions = {
  secret: process.env.GOOGLE_CLIENT_SECRET,
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.email && token.name && token.picture) {
        const { name, email, picture } = token;
        const user = await prisma.user.upsert({
          where: {
            email,
          },
          include: {
            likes: true,
          },
          update: {},
          create: {
            name,
            email,
            image: picture,
          },
        });

        //add a token id
        if (user) token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // add token id from jwt as a session user id
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};

export default NextAuth(Authconfig);
