import { DBblog } from '../../Types';
import Editor from '../editor/Editor';

import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/controller';

import React, { createElement } from 'react';
import getConfig from '../editor/utils/initialConfig';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

interface Props {
  id: string;
  post: DBblog;
}

const Post = (props: Props) => {
  const { id, post } = props;
  const { slides } = post;

  return (
    <Swiper
      key={id}
      slidesPerView={1}
      className="relative"
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
    >
      {slides.slides.map((slide) => (
        <SwiperSlide key={id}>
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
  );
};
export default Post;
