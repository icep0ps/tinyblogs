import React, { useState } from 'react';
import { IBlog, IStep, Slide } from '../../../../Types';
import Setup from '../../../../components/editor/components/Setup';
import Preview from '../../../../components/editor/components/Preview';
import Creation from '../../../../components/editor/components/Creation';

type Props = {};

const Create = (props: Props) => {
  const [view, setview] = useState<IStep>('Set-up');
  const [data, setData] = useState<IBlog['data'] | undefined>();
  const [slides, setSlides] = useState<Slide[]>([]);
  return (
    <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3 ">
      <Setup view={view} setView={setview} setBlog={setData} />
      <Creation view={view} setView={setview} setSlides={setSlides} />
      <Preview data={data} slides={slides} setView={setview} view={view} />
    </section>
  );
};

export default Create;
