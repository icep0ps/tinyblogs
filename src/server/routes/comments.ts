import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const commentsRouter = router({
  post: protectedProcedure
    .input(
      z.object({
        blogId: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;

      if (user) {
        const blog = await prisma.blog.update({
          where: {
            id: input.blogId,
          },

          data: {
            comments: {
              create: {
                comment: input.comment,
                author: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
          },
        });
        return blog;
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        blogId: z.string(),
        commentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.blog.update({
        where: {
          id: input.blogId,
        },

        data: {
          comments: {
            delete: [{ id: input.commentId }],
          },
        },
      });
      return comment;
    }),
});

export type CommentsRouter = typeof commentsRouter;
