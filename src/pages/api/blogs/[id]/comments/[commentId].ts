import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function hander(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id, commentId } = req.query;

  switch (req.method) {
    case 'GET':
      break;
    case 'DELETE':
      try {
        const comment = await prisma.blog.update({
          where: {
            id: id as string,
          },

          data: {
            comments: {
              delete: [{ id: commentId as string }],
            },
          },
        });

        res.status(200).json({
          data: comment,
        });
      } catch (err) {
        res.status(500).json({ message: 'failed' });
        console.log(err);
      }
      break;
  }
}
