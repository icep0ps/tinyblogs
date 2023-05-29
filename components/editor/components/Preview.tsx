/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Editor from '../Editor';
import Blog from '../../common/Slides/Blog';
import React, { createElement } from 'react';
import getConfig from '../utils/initialConfig';
import { useSession } from 'next-auth/react';
import { IBlog, IStep, IUser, Slide } from '../../../Types';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

type Props = {
  view: IStep;
  slides: Slide[];
  data: IBlog['data'] | undefined;
  setView: React.Dispatch<React.SetStateAction<IStep>>;
};

const Preview = (props: Props) => {
  const { data, slides, view, setView } = props;
  const { data: session, status } = useSession();

  const postBlog = async () => {
    if (data && session?.user) {
      const { title, languages, coverImage } = data;
      const blog = new Blog(title, coverImage, languages, slides, session.user as IUser);
      await axios.post('/api/blogs', {
        data: {
          ...blog,
        },
      });
    }
  };

  return (
    <div hidden={view !== 'Preview'}>
      <div className="flex justify-between">
        <button onClick={() => setView('Creation')}>back</button>
        <button onClick={postBlog}>Post</button>
      </div>
      <div>
        {slides.map((slide) => {
          return (
            <LexicalComposer initialConfig={getConfig(false)} key={slide.number}>
              {createElement(Editor, {
                type: slide.type,
                number: slide.number,
                state: slide.contents,
              })}
            </LexicalComposer>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
