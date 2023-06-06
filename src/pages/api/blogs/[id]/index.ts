import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function hander(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      break;
    case 'PUT':
      try {
        const { blogId, userId } = req.body.data;
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

    case 'DELETE':
      try {
        const { blogId, userId } = req.body;
        console.log(blogId);
        const blog = await prisma.user.update({
          where: {
            id: userId as string,
          },
          include: {
            posts: true,
          },

          data: {
            posts: {
              delete: {
                id: blogId,
              },
            },
          },
        });

        res.status(200).json({
          data: blog,
        });
      } catch (err) {
        res.status(500).json({ message: 'failed' });
        console.log(err);
      }
      break;
  }
}
