import type { AppProps } from 'next/app';
import { Fragment, ReactNode } from 'react';
import { NextComponentType } from 'next/types';
import { SessionProvider, useSession } from 'next-auth/react';

import '@/styles/globals.css';
import { trpc } from '../../utils/trpc';
import Layout from '../../components/common/Layout';

type CustomAppProps = AppProps & {
  // add auth type
  Component: NextComponentType & { auth?: boolean };
};

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default trpc.withTRPC(App);
