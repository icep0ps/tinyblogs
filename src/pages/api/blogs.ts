import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Data = {
  data?: {};
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      try {
        const blogs = await prisma.blog.findMany({
          include: {
            languages: true,
          },
        });
        res.status(200).json({ data: blogs });
      } catch (err) {
        res.status(500).json({ message: `error while getting blogs \n ${err}` });
      }
      break;

    case 'POST':
      const { title, coverImage, languages, slides } = req.body.data;
      try {
        const blog = await prisma.blog.create({
          data: {
            title,
            coverImage,
            languages: {
              createMany: {
                data: languages.map((language: string) => {
                  return { name: language };
                }),
              },
            },
            slides: { slides: slides },
          },
        });

        res.status(200).json({ data: blog });
      } catch (err) {
        res.status(500).json({ message: `${err}` });
      }
      break;
  }
}
