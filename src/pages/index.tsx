import React from 'react';
import Head from 'next/head';
import { DBblog, IUser } from '../../Types';
import useStore from '../../stores/Users';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import Post from '../../components/posts/Post';
import { GetServerSideProps } from 'next/types';
import getAuthedUser from '../../utils/getAuthedUser';
import { Authconfig } from './api/auth/[...nextauth]';

interface Props {
  blogs: DBblog[];
  authuser: IUser | null;
}

function Home(props: Props) {
  const { blogs, authuser } = props;
  const addUser = useStore((state) => state.createUser);
  addUser(authuser);

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
    let user = await getAuthedUser(session);
    if (!session?.user) {
      return {
        props: {
          user,
          blogs: JSON.parse(JSON.stringify(blogs)),
        },
      };
    }

    return { props: { blogs: JSON.parse(JSON.stringify(blogs)), authuser: user } };
  } catch (err) {
    console.log(`erro fetching blogs \n ${err}`);
    return { props: {} };
  }
};

export default Home;
