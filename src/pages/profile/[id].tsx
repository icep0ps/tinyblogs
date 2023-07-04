import { trpc } from '../../../utils/trpc';
import Blog from '../../../components/posts/blog';

import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

      <div className="flex flex-col gap-5 pt-10 overflow-y-scroll">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Posts</h3>
        <div>
          {posts.map((post) => {
            const { id, title } = post;
            return (
              <Accordion type="single" collapsible className="w-full " key={id}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    <Blog id={id} post={post} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default withRouter(Profile);
