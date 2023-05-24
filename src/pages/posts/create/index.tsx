import Editor from '../../../../components/editor/Editor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { ReactNode, useId, useState, createElement } from 'react';

type Props = {};

const Create = (props: Props) => {
  const id = useId();
  const [editors, addEditor] = useState<ReactNode[]>([]);

  const createEditor = () => {
    const initialConfig = {
      namespace: 'cover',
      onError: () => {},
    };

    addEditor((state) => [
      ...state,
      <LexicalComposer initialConfig={initialConfig} key={id}>
        {createElement(Editor)}
      </LexicalComposer>,
    ]);
  };

  return (
    <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3">
      <div>
        <h1>Create a new blog!</h1>
        <button onClick={createEditor}>Create new slide!</button>
      </div>
      <div className="max-h-screen overflow-y-scroll">{editors}</div>
    </section>
  );
};

export default Create;
