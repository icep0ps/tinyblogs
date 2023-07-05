import { Session } from 'next-auth/core/types';
import AccountDropdown from './account-dropdown';

import Image from 'next/image';
import React, { FC } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  user: Session['user'];
};

const Account: FC<Props> = (props) => {
  const { user } = props;
  if (user) {
    const { email, image, name } = user;
    return (
      <div className="bg-zinc-800 p-2 flex justify-between rounded-md items-center">
        <div className="flex gap-2">
          <Image
            alt="pfp"
            width={50}
            height={50}
            src={image ?? ''}
            className="object-cover rounded-full"
          />
          <div>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">{name}</h4>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <AccountDropdown />
      </div>
    );
  } else {
    return (
      <button
        className="text-white"
        onClick={async () => {
          await signIn('google', { callbackUrl: 'http://localhost:3000/' });
        }}
      >
        signIn
      </button>
    );
  }
};

export default Account;
