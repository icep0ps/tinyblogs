import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Comments from './Comments';
import { PostType } from '../../../Types';
import styles from '../../styles/Post.module.css';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

interface Props {
  postWithUserId: PostType;
}

function Post({ postWithUserId }: Props) {
  const router = useRouter();
  const { body, title, userId } = postWithUserId;
  const { id, firstName } = userId;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        <h1>{title}</h1>
        <h2 onClick={() => router.push(`/profile/${id}`)}>Written by {firstName}</h2>
        <section>
          <p>{body}</p>
        </section>
        <Comments></Comments>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await axios
    .get('https://dummyjson.com/posts', { params: { limit: 10 } })
    .then((res) => res.data);
  const paths = posts.posts.map((post: PostType) => {
    return {
      params: {
        id: `${post.id}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;

  const post = await axios
    .get(`https://dummyjson.com/posts/${id}`)
    .then((res) => res.data);

  const user = await axios
    .get(`https://dummyjson.com/users/${post.userId}`)
    .then((res) => res.data);

  const postWithUserId = { ...post, userId: user };

  return {
    props: { postWithUserId },
  };
}

export default Post;
