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
    if (allOk && isQuery) {
      return {
        headers: {
          'Vercel-CDN-Cache-Control': 's-maxage=86400, stale-while-revalidate=100',
        },
      };
    }
    return {};
  },
});
