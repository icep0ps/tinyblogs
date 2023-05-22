import React from 'react';

import {} from 'lexical';
import Button from './components/Button';

type Props = {};

const Toolbar = (props: Props) => {
  return (
    <div className="flex gap-4">
      <Button command="bold">Bold</Button>
      <Button command="italic">Italic</Button>
      <Button command="underline">Underline</Button>
      <Button command="code">Code</Button>
    </div>
  );
};

export default Toolbar;
