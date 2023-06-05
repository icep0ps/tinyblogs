import React from 'react';
import Head from 'next/head';
import Comments from './Comments';
import { DBblog } from '../../../Types';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import Post from '../../../components/posts/Post';
import { Authconfig } from '../api/auth/[...nextauth]';
import getAuthedUser from '../../../utils/getAuthedUser';

interface Props {
  blog: DBblog;
}

function PostPage(props: Props) {
  const { blog } = props;
  const { id, title, comments } = blog;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
        <Post post={blog} id={id} />
        <Comments postId={id} comments={comments}></Comments>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: context.query.id as string,
      },
      include: {
        likes: true,
        author: true,
        languages: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!blog) {
      return {
        notFound: true,
      };
    }

    const session = await getServerSession(context.req, context.res, Authconfig);
    let user = await getAuthedUser(session);
    if (!session?.user) {
      return {
        props: {
          user,
          blog: JSON.parse(JSON.stringify(blog)),
        },
      };
    }

    return { props: { blog: JSON.parse(JSON.stringify(blog)), authuser: user } };
  } catch (err) {
    console.log(`erro fetching blogs \n ${err}`);
    return { props: {} };
  }
};

export default PostPage;
