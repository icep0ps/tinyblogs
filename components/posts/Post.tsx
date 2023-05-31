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

import React, { createElement, useState } from 'react';
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

  const user = useStore((state) => state.user);
  const { id: authorId, name, image } = post.author;

  const [likes, setLikes] = useState(post.likes);

  const Like = async () => {
    if (user?.id) {
      likes.some((like) => like.userId === user.id)
        ? setLikes((state) => state.slice(0, state.length - 2))
        : setLikes((state) => state.concat({ blogId: id, userId: user.id }));

      try {
        await axios.put(`/api/blogs/${id}`, {
          data: { blogId: id, userId: user.id },
        });
      } catch (err) {}
    }
  };

  return (
    <div className="bg-zinc-800 rounded-md p-3 flex flex-col min-h-[715px]">
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">
            been selected for a chance to get one year of subscription to use Wikipedia
            for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>

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
