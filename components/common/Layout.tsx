/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from './sidebar/sidebar';

import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  const { children } = props;
  const { data, status } = useSession();
  const user = data?.user;

  if (status === 'loading') return <h1>Loading...</h1>;

  return (
    <main className="flex w-9/12 my-0 mx-auto max-h-screen h-screen">
      <Sidebar user={user} />
      {children}
    </main>
  );
}

export default Layout;
