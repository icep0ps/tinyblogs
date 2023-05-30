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

import React, { createElement } from 'react';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Link from 'next/link';

interface Props {
  id: string;
  post: DBblog;
}

//TODO: you dont have acess to userId because it being genarted on the server

const Post = (props: Props) => {
  const { id, post } = props;
  const { slides } = post;
  const { id: authorId, name, image } = post.author;
  return (
    <div className="bg-zinc-800 rounded-md p-3 flex flex-col min-h-[715px]">
      <Link href={`/profile/${authorId}`} className="flex gap-5 items-center">
        <Image src={image} alt="pfp" height={40} width={40} className="rounded-full" />
        <h3>{name}</h3>
      </Link>
      <Swiper
        key={id}
        slidesPerView={1}
        className="relative w-full h-full"
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
      >
        {slides.slides.map((slide) => (
          <SwiperSlide key={id + slide.number}>
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
          <li
            className="cursor-pointer"
            onClick={async () => {
              await axios.put(`/api/blogs/${id}`, {
                data: { blogId: id, userId: authorId },
              });
            }}
          >
            likes: {post.likes.length}
          </li>
          <li>comments: 0</li>
        </ul>
      </div>
    </div>
  );
};
export default Post;
