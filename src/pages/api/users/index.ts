import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { Authconfig } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const session = await getServerSession(req, res, Authconfig);
        if (!session?.user) {
          return res.status(401).redirect('/api/auth/signin');
        }

        await prisma.user.upsert({
          where: {
            email: session.user.email as string,
          },
          include: {
            likes: true,
          },
          update: {},
          create: {
            ...(session.user as { email: string; name: string; image: string }),
          },
        });

        return res.status(200).redirect('/');
      } catch (err) {
        console.log(err);
        res.status(500).redirect('/api/auth/signin');
      } finally {
        prisma.$disconnect();
      }
      break;
  }
}
