import { Context } from './context';

import superjson from 'superjson';
import { initTRPC } from '@trpc/server';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const middleware = t.middleware;

const isAuthenticated = middleware(async (opts) => {
  const { session } = opts.ctx;

  if (session) {
    return opts.next({
      ctx: {
        user: session.user,
      },
    });
  } else {
    return opts.next();
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
