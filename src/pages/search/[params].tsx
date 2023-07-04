import React from 'react';
import Blog from '../../../components/posts/blog';

interface Props {
  posts: string;
  searchParams: String;
}

function Search({ posts, searchParams }: Props) {
  return (
    <main>
      <h1>Search pages</h1>
    </main>
  );
}

export default Search;

// <h1>Results for {`"${searchParams}"`}</h1>
// <div className={styles.posts}>
//   {isEmpty(posts.posts) ? (
//     <h1>No results found</h1>
//   ) : (
//     posts.posts.map((post) => <Blog id={post.id} post={post} />)
//   )}
// </div>
