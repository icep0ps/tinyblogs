import Head from 'next/head';
import { PrismaClient } from '@prisma/client';
import Post from '../../components/posts/Post';
import { DBblog } from '../../Types';
interface Props {
  blogs: DBblog[];
}

function Home(props: Props) {
  const { blogs } = props;

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
          {blogs?.map((blog) => {
            const { id } = blog;
            return <Post id={id} post={blog} key={id} />;
          })}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        languages: true,
      },
    });
    return { props: { blogs: JSON.parse(JSON.stringify(blogs)) } };
  } catch (err) {
    console.log(`erro fetching blogs \n ${err}`);
    return { props: {} };
  }
};

export default Home;
