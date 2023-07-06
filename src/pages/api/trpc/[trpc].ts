import { createContext } from '../../../server/context';
import { appRouter } from '../../../server/routes/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta(opts) {
    const { errors, type } = opts;
    const allOk = errors.length === 0;
    const isQuery = type === 'query';
    return {
      headers: {
        'Vercel-CDN-Cache-Control': 'public, s-max-age=3699, stale-while-revalidate=100',
        'CDN-Cache-Control': 'max-age=60',
        'Cache-Control': 'max-age=10',
        'X-custom': 'sent headers',
      },
    };
  },
});
