import Blog from './blog';

import React, { FC } from 'react';
import { inferRouterOutputs } from '@trpc/server';
import { BlogsRouter } from '@/server/routes/blogs';

type BlogsRouterOutputs = inferRouterOutputs<BlogsRouter>;

type Props = {
  blogs: BlogsRouterOutputs['getAll'] | undefined;
};

const Blogs: FC<Props> = (props) => {
  const { blogs } = props;
  return (
    <div className="flex flex-col gap-5 overflow-y-scroll">
      {blogs ? (
        blogs.map((blog) => {
          const { id } = blog;
          return <Blog id={id} post={blog} key={id} />;
        })
      ) : (
        <h1>No blogs found</h1>
      )}
    </div>
  );
};

export default Blogs;
