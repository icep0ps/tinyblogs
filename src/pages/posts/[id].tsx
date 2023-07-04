import Comments from './Comments';
import { trpc } from '../../../utils/trpc';
import Post from '../../../components/posts/blog';

import Head from 'next/head';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import { NextRouter, withRouter } from 'next/router';

interface Props {
  router: NextRouter;
}

const PostPage: NextPage<Props> = (props) => {
  const { router } = props;
  const blogId = router.query.id as string;
  const { data: blog, isLoading } = trpc.blogs.getById.useQuery(blogId);

  if (isLoading) return <h1>Loading..</h1>;

  if (blog) {
    const { id, title, comments } = blog;

    return (
      <Fragment key={id}>
        <Head>
          <title>{title}</title>
        </Head>
        <main className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
          <Post post={blog} id={id} />
          <Comments blogId={blogId} comments={comments}></Comments>
        </main>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <main className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
          <h1>Could not load post</h1>
        </main>
      </Fragment>
    );
  }
};

export default withRouter(PostPage);
