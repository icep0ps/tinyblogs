import Head from 'next/head';
import axios from 'axios';
import Post from '../../components/Post';
import styles from '../styles/Home.module.css';
import { PostType } from '../../Types';
import { useState } from 'react';

interface Props {
  posts: { posts: PostType[] };
}

function Home({ posts }: Props) {
  const [searchInputValue, setSearchInputValue] = useState('');
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Welcome to my blogs</h1>
          <p>This is a site i made learning Nextjs! Hope you like it.</p>
        </div>

        <div>
          <form action={`/search/${searchInputValue}`}>
            <input
              type="search"
              placeholder="Search for a blog post..."
              onChange={(e) => setSearchInputValue(e.target.value)}
            ></input>
            <button>Search</button>
          </form>
        </div>

        <section className={styles.section}>
          <h1>Latests Blogs</h1>
          <div className={styles.posts}>
            {posts.posts?.map((post: PostType) => (
              <Post
                id={post.id}
                key={post.id}
                body={post.body}
                tags={post.tags}
                title={post.title}
                userId={post.userId}
              ></Post>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await axios
    .get('https://dummyjson.com/posts', { params: { limit: 10 } })
    .then((res) => res.data);
  return { props: { posts } };
}

export default Home;
