import React from 'react';
import Head from 'next/head';
import { DBblog, IUser } from '../../Types';
import useStore from '../../stores/Users';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import Post from '../../components/posts/Post';
import { GetServerSideProps } from 'next/types';
import { Authconfig } from './api/auth/[...nextauth]';

interface Props {
  blogs: DBblog[];
  user: IUser | null;
}

function Home(props: Props) {
  const { blogs, user } = props;
  const addUser = useStore((state) => state.createUser);
  addUser(user);

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-8">
        <nav>
          <ul className="flex gap-5">
            <li>For you</li>
            <li>Following</li>
            <li>Trending</li>
          </ul>
        </nav>
        <div className="flex flex-col gap-5">
          {blogs.map((blog) => {
            const { id } = blog;
            return <Post id={id} post={blog} key={id} />;
          })}
        </div>
      </section>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user;
  const prisma = new PrismaClient();
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        likes: true,
        author: true,
        languages: true,
      },
    });

    const session = await getServerSession(context.req, context.res, Authconfig);
    if (!session?.user) {
      user = null;
      return {
        props: {
          user,
          blogs: JSON.parse(JSON.stringify(blogs)),
        },
      };
    }

    user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    await prisma.user.upsert({
      where: {
        email: session.user.email as string,
      },
      update: {},
      create: {
        ...(session.user as { email: string; name: string; image: string }),
      },
    });

    return { props: { blogs: JSON.parse(JSON.stringify(blogs)), user } };
  } catch (err) {
    console.log(`erro fetching blogs \n ${err}`);
    return { props: {} };
  }
};

export default Home;
