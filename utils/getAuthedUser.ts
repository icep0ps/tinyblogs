import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';
const prisma = new PrismaClient();

async function getAuthedUser(session: Session | null) {
  let user = null;
  if (session) {
    if (session.user) {
      user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });
    }
  }

  return user;
}

export default getAuthedUser;
