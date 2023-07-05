import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Step, Slide, BlogSetupData } from '../../../../Types';
const Creation = dynamic(
  () => import('../../../../components/editor/components/Creation')
);
const Preview = dynamic(() => import('../../../../components/editor/components/Preview'));
const Setup = dynamic(() => import('../../../../components/editor/components/Setup'));

interface Props {}

const Create: NextPage<Props> = (props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [view, setview] = useState<Step>('Set-up');
  const [data, setData] = useState<BlogSetupData>({
    title: 'untitled',
    languages: [],
    coverImage: '',
  });
  const [slides, setSlides] = useState<Slide[]>([]);

  if (user) {
    return (
      <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3 ">
        <Setup view={view} setView={setview} setBlog={setData} data={data} />
        <Creation view={view} setView={setview} setSlides={setSlides} />
        <Preview data={data} slides={slides} setView={setview} view={view} />
      </section>
    );
  } else {
    return <h1>Please signin to create a blog</h1>;
  }
};

export default Create;
