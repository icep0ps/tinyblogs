import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../../components/common/Layout';

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps, Component);

  return (
    <SessionProvider>
      <Layout authuser={pageProps.authuser}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
