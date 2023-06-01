import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      try {
        const { followerId, userId } = req.body.data;

        const isFollowing = await prisma.followers.findUnique({
          where: {
            followerId_followingId: {
              followerId,
              followingId: userId,
            },
          },
        });

        if (isFollowing) {
          await prisma.followers.delete({
            where: {
              followerId_followingId: {
                followerId: followerId,
                followingId: userId,
              },
            },
          });
        } else {
          await prisma.followers.create({
            data: {
              followerId: followerId,
              followingId: userId,
            },
          });
        }

        return res.status(200).json({ message: 'succes' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'failed' });
      } finally {
        prisma.$disconnect();
      }
      break;
  }
}
