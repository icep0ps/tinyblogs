import { blogsRouter } from './blogs';
import { publicProcedure, router } from '../trpc';
import { usersRouter } from './users';

export const appRouter = router({
  users: usersRouter,
  blogs: blogsRouter,
});

export type AppRouter = typeof appRouter;
