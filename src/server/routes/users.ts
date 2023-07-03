import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const usersRouter = router({
  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      return user;
    }),

  getProfile: publicProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const user = await prisma.user.findUnique({
        where: {
          id: input.profileId,
        },

        include: {
          likes: true,
          posts: {
            include: { author: true, languages: true, likes: true, comments: true },
          },
        },
      });

      if (user) {
        const following = await prisma.followers.aggregate({
          where: {
            followerId: user.id,
          },
          _count: {
            followerId: true,
          },
        });

        const followers = await prisma.followers.aggregate({
          where: {
            followingId: user.id,
          },
          _count: {
            followingId: true,
          },
        });

        return {
          ...user,
          following: following._count.followerId,
          followers: followers._count.followingId,
          posts: user.posts,
        };
      } else {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile does not exist',
        });
      }
    }),

  followUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;

      const followerId = user.id;
      const followingId = input.userId;

      const isFollowing = await prisma.followers.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      if (isFollowing) {
        await prisma.followers.delete({
          where: {
            followerId_followingId: {
              followerId,
              followingId,
            },
          },
        });
      } else {
        await prisma.followers.create({
          data: {
            followerId,
            followingId,
          },
        });
      }
    }),
});

export type UserRouter = typeof usersRouter;
