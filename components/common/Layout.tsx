import Link from 'next/link';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <main className="flex w-9/12 my-0 mx-auto">
      <aside className="pt-4 max-w-md min-w-[20%]">
        <h1>Tiny blogs</h1>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/posts/create">
            <li>Create blog</li>
          </Link>

          <li>Explore</li>
          <li>Profile</li>
          <li>search</li>
        </ul>
      </aside>
      {children}
    </main>
  );
}

export default Layout;
