import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const Authconfig: AuthOptions = {
  secret: process.env.GOOGLE_SECRET,
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(Authconfig);
