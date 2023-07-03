import { Context } from './context';

import superjson from 'superjson';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const middleware = t.middleware;

const isAuthenticated = middleware(async (opts) => {
  const { session } = opts.ctx;

  if (session && session.user) {
    return opts.next({
      ctx: {
        user: session.user,
      },
    });
  } else {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
