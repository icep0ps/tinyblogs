import axios from 'axios';
import { DBblog } from '../../Types';
import Editor from '../editor/Editor';

import Image from 'next/image';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/controller';

import React, { createElement, useId, useState } from 'react';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Link from 'next/link';
import useStore from '../../stores/Users';

interface Props {
  id: string;
  post: DBblog;
}

const Post = (props: Props) => {
  const { id, post } = props;
  const { slides } = post;
  const langsId = useId();

  const user = useStore((state) => state.user);
  const { id: authorId, name, image } = post.author;

  const [likes, setLikes] = useState(post.likes);

  const Like = async () => {
    if (user?.id) {
      likes.some((like) => like.userId === user.id)
        ? setLikes((state) => state.filter((postuser) => postuser.userId !== user.id))
        : setLikes((state) => state.concat({ blogId: id, userId: user.id }));

      try {
        await axios.put(`/api/blogs/${id}`, {
          data: { blogId: id, userId: user.id },
        });
      } catch (err) {}
    }
  };

  return (
    <div className="bg-zinc-800 rounded-md p-3 flex flex-col min-h-[715px] h-full">
      <div className="flex justify-between">
        <Link href={`/profile/${authorId}`} className="flex gap-5 items-center">
          <Image src={image} alt="pfp" height={40} width={40} className="rounded-full" />
          <h3>{name}</h3>
        </Link>

        <ul className="flex gap-5">
          {post.languages.map((language) => {
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
          <div className="h-full ">
            <h1 className="text-4xl font-bold mt-10 mb-5">{post.title}</h1>
            <Image src={''} alt="cover" height={100} width={100} className="rounded-lg" />
          </div>
        </SwiperSlide>

        {slides.slides.map((slide) => (
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
            <li className="cursor-pointer" onClick={Like}>
              likes: {likes.length}
            </li>
          ) : (
            <li onClick={Like}>
              <label htmlFor="my-modal" className="cursor-pointer">
                likes: {post.likes.length}
              </label>
            </li>
          )}

          <li>comments: 0</li>
        </ul>
      </div>
    </div>
  );
};
export default Post;
