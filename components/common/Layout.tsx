/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image';
import { IUser } from '../../Types';
import useStore from '../../stores/Users';
import { signIn, signOut } from 'next-auth/react';
import React, { ReactNode, useCallback, useEffect } from 'react';

type Props = {
  authuser: IUser | null;
  children: ReactNode;
};

function Layout(props: Props) {
  const { children, authuser } = props;

  console.log(authuser);

  const removeUser = useStore((state) => state.removeUser);
  const createUser = useStore((state) => state.createUser);

  const create = useCallback(createUser, [authuser]);
  create(authuser);

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
          {authuser && (
            <Link href={`/profile/${authuser.id}`}>
              <li>Profile</li>
            </Link>
          )}

          <li>search</li>
        </ul>

        {authuser ? (
          <div className="bg-zinc-800 p-2 flex justify-between">
            <div className="flex gap-2">
              <Image
                src={authuser.image}
                alt="pfp"
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl">{authuser.name}</h3>
                <h4 className="text-sm">{authuser.email}</h4>
              </div>
            </div>
            <button
              onClick={async () => {
                console.log('signout');
                removeUser();
                await signOut();
              }}
            >
              signout
            </button>
          </div>
        ) : (
          <button
            onClick={async () => {
              await signIn('google', { callbackUrl: 'http://localhost:3000/api/users' });
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
