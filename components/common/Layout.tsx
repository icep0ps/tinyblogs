/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  const { children } = props;
  const { data, status } = useSession();
  const user = data?.user;

  if (status === 'loading') return <h1>Loading...</h1>;

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
          {user && (
            <Link href={`/profile/${user.id}`}>
              <li>Profile</li>
            </Link>
          )}

          <li>search</li>
        </ul>

        {user ? (
          <div className="bg-zinc-800 p-2 flex justify-between">
            <div className="flex gap-2">
              <Image
                src={user.image ?? ''}
                alt="pfp"
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl">{user.name}</h3>
                <h4 className="text-sm">{user.email}</h4>
              </div>
            </div>
            <button onClick={async () => await signOut()}>signout</button>
          </div>
        ) : (
          <button
            onClick={async () => {
              await signIn('google', { callbackUrl: 'http://localhost:3000/' });
            }}
          >
            signIn
          </button>
        )}
      </aside>
      {children}
    </main>
  );
}

export default Layout;
