import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function hander(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { blogId, userId } = req.body.data;

  switch (req.method) {
    case 'GET':
      break;
    case 'PUT':
      try {
        const isLiked = await prisma.like.findUnique({
          where: {
            userId_blogId: { userId, blogId },
          },
        });

        if (isLiked) {
          await prisma.blog.update({
            where: {
              id: blogId,
            },

            data: {
              likes: {
                delete: {
                  userId_blogId: { userId, blogId },
                },
              },
            },
          });
          res.status(200).json({ message: 'success' });
        } else {
          await prisma.blog.update({
            where: {
              id: blogId,
            },
            data: {
              likes: {
                create: {
                  userId: userId,
                },
              },
            },
          });
          res.status(200).json({ message: 'success' });
        }
      } catch (err) {
        res.status(500).json({ message: 'failed' });
        console.log(err);
      }
      break;
  }
}
