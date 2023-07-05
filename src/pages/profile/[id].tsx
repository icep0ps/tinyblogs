import dynamic from 'next/dynamic';
import trpc from '../../../utils/trpc';
const Blogs = dynamic(() => import('../../../components/profile/blogs'));
const Information = dynamic(() => import('../../../components/profile/information'));

import React from 'react';
import type { NextPage } from 'next';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';

type Props = {
  router: NextRouter;
};

const Profile: NextPage<Props> = (props) => {
  const { router } = props;

  const profileId = router.query.id as string;
  const { data, isLoading, isError } = trpc.users.getProfile.useQuery({
    profileId,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error occured</h1>;

  const { posts } = data;

  return (
    <main className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
      <Information profile={data} />
      <Blogs blogs={posts} />
    </main>
  );
};

export default withRouter(Profile);
