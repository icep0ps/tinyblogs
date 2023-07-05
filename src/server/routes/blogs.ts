import { z } from 'zod';
import { commentsRouter } from './comments';
import { protectedProcedure, router, publicProcedure } from '../trpc';
import { slide, blogSetupData, Slide } from '../../../Types';
import { Blog, Language, Like, User } from '@prisma/client';

export const blogsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.prisma.blog.findMany({
      include: {
        likes: true,
        author: true,
        languages: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return blogs;
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const blog = await ctx.prisma.blog.findUnique({
      where: {
        id: input,
      },
      include: {
        likes: true,
        author: true,
        languages: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    return blog;
  }),

  create: publicProcedure
    .input(
      blogSetupData.merge(
        z.object({
          slides: slide.array(),
          author: z.object({
            name: z.string(),
            image: z.string(),
            email: z.string(),
          }),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { title, coverImage, languages, slides, author } = input;

      const blog = await ctx.prisma.blog.create({
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
      return blog;
    }),

  like: protectedProcedure
    .input(z.object({ blogId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      if (user) {
        const isLiked = await prisma.like.findUnique({
          where: {
            userId_blogId: {
              blogId: input.blogId,
              userId: user.id,
            },
          },
        });

        if (isLiked) {
          return await prisma.blog.update({
            where: {
              id: input.blogId,
            },
            select: {
              likes: true,
            },
            data: {
              likes: {
                delete: {
                  userId_blogId: {
                    blogId: input.blogId,
                    userId: user.id,
                  },
                },
              },
            },
          });
        } else {
          return await prisma.blog.update({
            where: {
              id: input.blogId,
            },
            select: {
              likes: true,
            },
            data: {
              likes: {
                create: {
                  userId: user.id,
                },
              },
            },
          });
        }
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        blogId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const blog = await prisma.blog.delete({
        where: {
          id: input.blogId,
        },
      });

      return blog;
    }),

  comments: commentsRouter,
});

export type BlogsRouter = typeof blogsRouter;
