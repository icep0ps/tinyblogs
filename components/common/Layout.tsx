import Link from 'next/link';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const { data: session, status } = useSession();

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

        {session?.user ? (
          <div className="bg-zinc-800 p-2 flex justify-between">
            <div className="flex gap-2">
              <Image
                src={session.user.image}
                alt="pfp"
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl">{session.user.name}</h3>
                <h4 className="text-sm">{session.user.email}</h4>
              </div>
            </div>
            <button onClick={() => signOut()}>signout</button>
          </div>
        ) : (
          <button
            onClick={() => {
              signIn('google', { callbackUrl: 'http://localhost:3000/api/users' });
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
