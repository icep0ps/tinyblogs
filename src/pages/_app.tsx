import type { AppProps } from 'next/app';
import { NextComponentType } from 'next/types';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';
import trpc from '../../utils/trpc';
import Layout from '../../components/common/Layout';
import ErrorBoundary from '../../components/common/error-boundary';

type CustomAppProps = AppProps & {
  // add auth type
  Component: NextComponentType & { auth?: boolean };
};

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ErrorBoundary>
  );
}
export default trpc.withTRPC(App);
