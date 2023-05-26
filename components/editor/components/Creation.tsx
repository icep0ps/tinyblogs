import Editor from '../Editor';

import { ParagraphNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { ISlideType, IStep } from '../../../Types';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { ReactNode, createElement, useId, useState } from 'react';
type Props = {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
};

const Creation = (props: Props) => {
  const id = useId();
  const { setStep } = props;
  const [isHidden, setIsHidden] = useState(true);
  const [slides, addSlides] = useState<ReactNode[]>([]);

  const createEditor = (type: ISlideType) => {
    const initialConfig = {
      namespace: 'cover',
      theme: {
        heading: {
          h1: 'text-3xl font-bold my-4',
        },
        paragraph: 'text-sm',
        code: 'code overflow-y-scroll max-h-[60vh]',
        codeHighlight: {
          atrule: 'editor-tokenAttr',
          attr: 'editor-tokenAttr',
          boolean: 'editor-tokenProperty',
          builtin: 'editor-tokenSelector',
          cdata: 'editor-tokenComment',
          char: 'editor-tokenSelector',
          class: 'editor-tokenFunction',
          'class-name': 'editor-tokenFunction',
          comment: 'editor-tokenComment',
          constant: 'editor-tokenProperty',
          deleted: 'editor-tokenProperty',
          doctype: 'editor-tokenComment',
          entity: 'editor-tokenOperator',
          function: 'text-green-500',
          important: 'etext-red-500',
          inserted: 'editor-tokenSelector',
          keyword: 'text-sky-500',
          namespace: 'etext-red-500',
          number: 'editor-tokenProperty',
          operator: 'editor-tokenOperator',
          prolog: 'editor-tokenComment',
          property: 'editor-tokenProperty',
          punctuation: 'editor-tokenPunctuation',
          regex: 'etext-red-500',
          selector: 'editor-tokenSelector',
          string: 'etext-red-500',
          symbol: 'editor-tokenProperty',
          tag: 'editor-tokenProperty',
          url: 'editor-tokenOperator',
          variable: 'text-red-500',
        },
      },
      onError: () => {},
      nodes: [HeadingNode, ParagraphNode, CodeNode, CodeHighlightNode],
    };

    addSlides((state) => [
      ...state,
      <LexicalComposer initialConfig={initialConfig} key={id}>
        {createElement(Editor, { type })}
      </LexicalComposer>,
    ]);
  };

  return (
    <div>
      <div className="flex p-2 justify-between">
        <button onClick={() => setStep('Set-up')}>back</button>
        <button onClick={(e) => setIsHidden((state) => !state)}>Create new slide!</button>
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

      <div className="max-h-screen overflow-y-scroll">{slides}</div>
    </div>
  );
};

export default Creation;
