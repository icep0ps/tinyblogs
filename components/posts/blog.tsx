import Editor from '../editor/Editor';
import { trpc } from '../../utils/trpc';
import { Slide } from '../../Types';
import getConfig from '../editor/utils/initialConfig';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import { BlogsRouter } from '@/server/routes/blogs';
import type { inferRouterOutputs } from '@trpc/server';
import React, { Fragment, createElement, useId, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/controller';

type RouterOutput = inferRouterOutputs<BlogsRouter>;

interface Props {
  id: string;
  post: RouterOutput['getAll'][0];
}

const Blog = (props: Props) => {
  const langsId = useId();
  const { id, post } = props;
  const {
    slides: JSONSlides,
    author,
    comments,
    likes: likesdata,
    languages,
    coverImage,
  } = post;
  const [likes, setLikes] = useState(likesdata);
  const { id: authorId, name, image } = author;

  // hacky stuff because prisma doesnt allow arrays
  const slides = { slides: JSONSlides } as { slides: Slide[] };

  const { data } = useSession();
  const user = data?.user;
  const deletePost = trpc.blogs.delete.useMutation();
  const like = trpc.blogs.like.useMutation({
    onSuccess(data) {
      if (data) setLikes(data.likes);
    },
  });

  return (
    <div className="bg-zinc-800 rounded-md p-3 flex flex-col min-h-[715px] h-full">
      <div className="flex justify-between">
        <Link href={`/profile/${authorId}`} className="flex gap-5 items-center">
          <Image src={image} alt="pfp" height={40} width={40} className="rounded-full" />
          <h3>{name}</h3>
        </Link>

        <ul className="flex gap-5">
          {languages.map((language) => {
            return <li key={langsId}>{language.name}</li>;
          })}
        </ul>
      </div>

      <Swiper
        key={id}
        slidesPerView={1}
        className="relative w-full h-full"
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
      >
        <SwiperSlide key={id}>
          <div className="h-full flex flex-col gap-10">
            <h1 className="text-4xl font-bold mt-10 mb-5">{post.title}</h1>
            <Image
              src={coverImage ?? ''}
              alt="cover"
              height={500}
              width={500}
              className="rounded-lg w-full"
            />
          </div>
        </SwiperSlide>
        {slides?.slides.map((slide) => (
          <SwiperSlide key={id + slide.number} className="h-full">
            <div className="h-full">
              <LexicalComposer initialConfig={getConfig(false)}>
                {createElement(Editor, {
                  type: slide.type,
                  number: slide.number,
                  state: slide.contents,
                })}
              </LexicalComposer>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <ul className="flex gap-5">
          <li>views: {post.views}</li>
          {user ? (
            <Fragment>
              <li
                className="cursor-pointer"
                onClick={() => like.mutate({ blogId: post.id })}
              >
                likes: {likes.length}
              </li>
              {user.id === authorId && (
                <button onClick={() => deletePost.mutate({ blogId: id })}>Delete</button>
              )}
            </Fragment>
          ) : (
            <li>
              <label htmlFor="my-modal" className="cursor-pointer">
                likes: {likes.length}
              </label>
            </li>
          )}
          <Link href={`/posts/${id}`}>
            <li>comments: {comments.length}</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Blog;
