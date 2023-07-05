import { createContext } from '../../../server/context';
import { appRouter } from '../../../server/routes/_app';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400, stale-while-revalidate=130');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  return nextApiHandler(req, res);
}
