import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function hander(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { postId } = req.body.data;

  switch (req.method) {
    case 'GET':
      break;
    case 'PUT':
      await prisma.blog.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
      break;
  }
}
