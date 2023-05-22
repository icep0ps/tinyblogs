import Head from 'next/head';
import axios from 'axios';
import { IPost } from '../../Types';
import Post from '../../components/posts/Post';
interface Props {
  posts: { posts: IPost[] };
}

function Home({ posts }: Props) {
  return (
    <>
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
        <div className="">
          {posts.posts?.map((post: IPost) => (
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
