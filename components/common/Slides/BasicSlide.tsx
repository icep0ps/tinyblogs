import React from 'react';
import SlideWrapper from './SlideWrapper';
type Props = {
  id: string;
  slide: number;
};

const BasicSlide = (props: Props) => {
  const { id, slide } = props;
  return (
    <SlideWrapper>
      <h3 contentEditable={true} placeholder={`${slide} .Games i dont play`}></h3>
      <p
        contentEditable={true}
        placeholder="        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium error aliquid
        eum a ipsa est laborum placeat modi sed, alias veritatis dolorem molestiae iure
        aut, minus pariatur facilis eaque tenetur."
      ></p>
    </SlideWrapper>
  );
};

export default BasicSlide;
