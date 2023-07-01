import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType } from '@trpc/server';
import { Authconfig } from '@/pages/api/auth/[...nextauth]';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = async (opts: CreateNextContextOptions) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(opts.req, opts.res, Authconfig);

  return {
    prisma,
    session,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
