import Editor from '../Editor';
import getConfig from '../utils/initialConfig';
import { ISlideType, IStep } from '../../../Types';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { ReactNode, createElement, useState } from 'react';

type Props = {
  view: IStep;
  setView: React.Dispatch<React.SetStateAction<IStep>>;
  setSlides: React.Dispatch<React.SetStateAction<any[]>>;
};

const Creation = (props: Props) => {
  const { view, setView, setSlides } = props;
  const [slides, addSlide] = useState(new Map());
  const [isHidden, setIsHidden] = useState(true);
  const [editors, addEditor] = useState<ReactNode[]>([]);

  const createEditor = (type: ISlideType) => {
    addEditor((state) => [
      ...state,
      <LexicalComposer initialConfig={getConfig(true)} key={editors.length + 1}>
        {createElement(Editor, { type, number: slides.size, addSlide, isEditable: true })}
      </LexicalComposer>,
    ]);
  };

  return (
    <div hidden={view !== 'Creation'}>
      <div className="flex p-2 justify-between">
        <button onClick={() => setView('Set-up')}>back</button>
        <button onClick={() => setIsHidden((state) => !state)}>Create new slide!</button>
        <button
          onClick={() => {
            setSlides(Array.from(slides.values()));
            setView('Preview');
          }}
        >
          Preview
        </button>
      </div>
      <div className="absolute top-5 bg-zinc-800 p-2 rounded-md z-10 " hidden={isHidden}>
        <h3>Select a slide type</h3>
        <ul>
          <li onClick={() => createEditor('cover')} className="p-2 cursor-pointer">
            Cover
          </li>
          <li onClick={() => createEditor('basic')} className="p-2 cursor-pointer">
            Basic
          </li>
        </ul>
      </div>

      <div className="max-h-screen overflow-y-scroll">{editors}</div>
    </div>
  );
};

export default Creation;
