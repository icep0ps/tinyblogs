import React from 'react';
import axios from 'axios';
import { PostType } from '../../../Types';
import Post from '../../../components/Post';
import { GetServerSidePropsContext } from 'next';
var isEmpty = require('lodash.isempty');
import styles from '../../../components/post.module.css';

interface Props {
  posts: { posts: PostType[] };
  searchParams: String;
}

function Search({ posts, searchParams }: Props) {
  console.log(posts.posts);
  return (
    <main>
      <h1>Results for {`"${searchParams}"`}</h1>
      <div className={styles.posts}>
        {isEmpty(posts.posts) ? (
          <h1>No results found</h1>
        ) : (
          posts.posts.map((post: PostType) => (
            <Post
              id={post.id}
              key={post.id}
              body={post.body}
              tags={post.tags}
              title={post.title}
              userId={post.userId}
            ></Post>
          ))
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const posts = await axios
    .get(`https://dummyjson.com/posts/search?q=${query.params}`, {
      params: { limit: 10 },
    })
    .then((res) => res.data);

  return {
    props: { posts, searchParams: query.params },
  };
}

export default Search;
