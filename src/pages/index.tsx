import trpc from '../../utils/trpc';
import Blogs from '../../components/posts/blogs';

import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { Separator } from '@/components/ui/separator';

interface Props {}

const Home: NextPage<Props> = (props) => {
  const { data: blogs, isLoading } = trpc.blogs.getAll.useQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
        <nav>
          <ul className="flex gap-5">
            <li>For you</li>
            <Separator orientation="vertical" className="h-full" />
            <li>Following</li>
            <Separator orientation="vertical" className="h-full w-1" />
            <li>Trending</li>
          </ul>
        </nav>
        <Separator className="w-1/2" />
        <Blogs blogs={blogs} />
      </section>
    </React.Fragment>
  );
};

export default Home;
