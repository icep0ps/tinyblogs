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
            author: true,
            languages: true,
          },
        });
        res.status(200).json({ data: blogs });
      } catch (err) {
        res.status(500).json({ message: `error while getting blogs \n ${err}` });
      } finally {
        await prisma.$disconnect();
      }
      break;

    case 'POST':
      const { title, coverImage, languages, slides, author } = req.body.data;
      try {
        const blog = await prisma.blog.create({
          data: {
            title,
            author: {
              connectOrCreate: {
                where: {
                  email: author.email,
                },

                create: {
                  ...author,
                },
              },
            },
            coverImage,
            languages: {
              connectOrCreate: languages.map((language: string) => {
                return {
                  where: { name: language },
                  create: {
                    name: language,
                  },
                };
              }),
            },
            slides: { slides: slides },
          },
        });

        res.status(200).json({ data: blog });
      } catch (err) {
        res.status(500).json({ message: `${err}` });
      } finally {
        await prisma.$disconnect();
      }
      break;
  }
}
