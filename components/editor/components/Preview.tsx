/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, createElement } from 'react';
import { useSession } from 'next-auth/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import Editor from '../Editor';
import getConfig from '../utils/initialConfig';
import { trpc } from '../../../utils/trpc';
import { Step, Slide, BlogSetupData, AuthedUser } from '../../../Types';
import { useRouter } from 'next/router';

interface Props {
  view: Step;
  slides: Slide[];
  data: BlogSetupData;
  setView: React.Dispatch<React.SetStateAction<Step>>;
}

const Preview: FC<Props> = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const post = trpc.blogs.create.useMutation();
  const { data, slides, view, setView } = props;

  const handlePostBlog = async () => {
    if (data && session?.user) {
      const { title, languages, coverImage } = data;
      const blog = {
        title,
        coverImage,
        languages,
        slides,
        author: session.user as AuthedUser,
      };
      post.mutate(blog, {
        onSuccess() {
          router.push('/');
        },
      });
    }
  };

  return (
    <div hidden={view !== 'Preview'}>
      <div className="flex justify-between">
        <button onClick={() => setView('Creation')}>back</button>
        <button onClick={handlePostBlog}>Post</button>
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
