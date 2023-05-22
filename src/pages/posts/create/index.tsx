import React from 'react';

import Editor from '../../../../components/editor/Editor';

import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

type Props = {};

const Create = (props: Props) => {
  const initialConfig = {
    namespace: 'MyEditor',
    these: {},
    onError: () => console.log(),
  };
  return (
    <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3">
      <h1>Create a new blog!</h1>
      <LexicalComposer initialConfig={initialConfig}>
        <HistoryPlugin />
        <Editor />
        <OnChangePlugin onChange={() => console.log()} />
      </LexicalComposer>
    </section>
  );
};

export default Create;
