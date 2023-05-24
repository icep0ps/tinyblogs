import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SlideWrapper = (props: Props) => {
  const { children } = props;
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span>username</span>
        <span className="text-sm">@username</span>
      </div>
      <h1 className="text-center text-2xl">How to code: Nextjs</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequuntur illum
        reiciendis. Neque praesentium eveniet facilis, assumenda ullam repellendus
        voluptates eius, quas laudantium, et non iste iure quam illo fugiat!
      </p>
      <div className="flex justify-end">
        <span>swipe {'>>'}</span>
      </div>
    </section>
  );
};

export default SlideWrapper;
