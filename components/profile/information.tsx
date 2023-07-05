import trpc from '../../utils/trpc';

import { Button } from '@/components/ui/button';
import { inferRouterOutputs } from '@trpc/server';
import { UserRouter } from '@/server/routes/users';
import SigninDialog from '@/components/ui/signin-dialog';

import React, { FC } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type routerOutput = inferRouterOutputs<UserRouter>;

type Props = {
  profile: routerOutput['getProfile'];
};

const Information: FC<Props> = (props) => {
  const { data } = useSession();
  const user = data?.user;

  const utils = trpc.useContext();
  const followUser = trpc.users.followUser.useMutation({
    onSuccess() {
      utils.users.getProfile.invalidate({ profileId: id });
    },
  });

  const { profile } = props;
  const { email, followers, following, id, image, name } = profile;

  return (
    <div className="flex gap-5 items-center">
      <div>
        <Avatar>
          <AvatarImage alt="pfp" src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex justify-between">
          <h1>{name}</h1>
          {user ? (
            <Button
              onClick={async () => {
                followUser.mutate({ userId: id });
              }}
            >
              follow
            </Button>
          ) : (
            <SigninDialog action={'follow'} />
          )}
        </div>
        <p>{email}</p>
        <div className="flex gap-5">
          <span>followers: {followers}</span>
          <span>following: {following}</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
