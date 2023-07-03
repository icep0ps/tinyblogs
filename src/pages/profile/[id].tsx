import { trpc } from '../../../utils/trpc';
import Post from '../../../components/posts/Post';

import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type Props = {
  router: NextRouter;
};

const Profile: NextPage<Props> = (props) => {
  const { router } = props;
  const utils = trpc.useContext();
  const { data } = useSession();
  const user = data?.user;

  const profileId = router.query.id as string;
  const {
    data: userProfile,
    isLoading,
    isError,
  } = trpc.users.getProfile.useQuery({
    profileId,
  });

  const followUser = trpc.users.followUser.useMutation({
    onSuccess() {
      utils.users.getProfile.invalidate({ profileId: id });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error occured</h1>;

  const { email, followers, following, id, image, name, posts } = userProfile;

  return (
    <main className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
      <div className="flex gap-5 items-center">
        <div>
          <Image
            src={image}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h1>{name}</h1>
            {user ? (
              <button
                onClick={async () => {
                  followUser.mutate({ userId: id });
                }}
              >
                follow
              </button>
            ) : (
              <button>
                <label htmlFor="my-modal" className="cursor-pointer"></label>
              </button>
            )}
          </div>
          <p>{email}</p>

          <div className="flex gap-5">
            <span>followers: {followers}</span>
            <span>following: {following}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-10">
        {posts.map((post) => {
          return (
            <div className="collapse bg-base-200 rounded-lg" key={post.id}>
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">{post.title}</div>
              <div className="collapse-content">
                <Post id={post.id} post={post} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default withRouter(Profile);
