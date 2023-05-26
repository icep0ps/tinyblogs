import React, { useState } from 'react';
import { IStep } from '../../../Types';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
};

const Setup = (props: Props) => {
  const { setStep } = props;
  const [image, setImage] = useState('');
  const insertImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files) {
      const file = input.files[0];
      const src = URL.createObjectURL(file);
      setImage(src);
    }
  };

  return (
    <>
      <div>
        <h1>Create a new blog!</h1>
        <button onClick={() => setStep('Creation')}>create slides!</button>
        <form className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/jpeg, .png"
            value={image}
            onChange={insertImg}
          />
          <label>
            title:
            <input type="text" />
          </label>
          <label>
            tags:
            <input type="text" />
          </label>
          <label>
            languages:
            <label>
              <input type="checkbox" />
              JS
            </label>
            <label>
              <input type="checkbox" />
              JS
            </label>
            <label>
              <input type="checkbox" />
              JS
            </label>
          </label>
        </form>
      </div>
    </>
  );
};

export default Setup;
