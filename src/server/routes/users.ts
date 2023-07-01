import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

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
});

export type UserRouter = typeof usersRouter;
