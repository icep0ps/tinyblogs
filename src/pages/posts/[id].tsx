import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { PostType } from '../../../Types';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import styles from '../../styles/Post.module.css';

interface Props {
  post: PostType;
}

function Post({ post }: Props) {
  const { body, title, userId } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        <h1>{title}</h1>
        <h2>Written by {userId}</h2>
        <section>
          <p>{body}</p>
        </section>
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
    fallback: false,
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;
  const post = await axios
    .get(`https://dummyjson.com/posts/${id}`)
    .then((res) => res.data);
  return {
    props: { post },
  };
}

export default Post;
