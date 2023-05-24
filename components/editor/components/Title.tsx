import React from 'react';
import SlideWrapper from '../../common/Slides/SlideWrapper';

type Props = {};

const Title = (props: Props) => {
  return (
    <SlideWrapper>
      <h1 contentEditable={true} className="text-center text-2xl">
        How to code: Nextjs
      </h1>
      <p contentEditable={true} className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequuntur illum
        reiciendis. Neque praesentium eveniet facilis, assumenda ullam repellendus
        voluptates eius, quas laudantium, et non iste iure quam illo fugiat!
      </p>
    </SlideWrapper>
  );
};

export default Title;
