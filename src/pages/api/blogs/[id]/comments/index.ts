import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function hander(req: NextApiRequest, res: NextApiResponse<Data>) {
  const postId = `${req.query.id}`;

  const { author, comment } = req.body.data;

  switch (req.method) {
    case 'GET':
      break;
    case 'PUT':
      try {
        const blog = await prisma.blog.update({
          where: {
            id: postId,
          },

          data: {
            comments: {
              create: {
                comment,
                author: {
                  connect: {
                    id: author.id,
                  },
                },
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
