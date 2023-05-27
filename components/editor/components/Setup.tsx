import { IBlog, IStep } from '../../../Types';
import React, { useRef, useState } from 'react';

type Props = {
  view: IStep;
  setView: React.Dispatch<React.SetStateAction<IStep>>;
  setBlog: React.Dispatch<React.SetStateAction<IBlog['data'] | undefined>>;
};

const Setup = (props: Props) => {
  const [image, setImage] = useState('');
  const { view, setView, setBlog } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const setFromData = () => {
    if (form.current) {
      const formData = new FormData(form.current);
      const data: IBlog['data'] = {
        title: undefined,
        coverImage: undefined,
        languages: undefined,
      };
      //@ts-ignore
      for (var [key, value] of formData) {
        if (key === 'languages') {
          Object.assign(data, {
            [key]: formData.getAll('languages'),
          });
        } else {
          Object.assign(data, {
            [key]: value instanceof File ? URL.createObjectURL(value) : value,
          });
        }
      }
      setBlog(data);
    }
    setView('Creation');
  };

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
      <div hidden={view !== 'Set-up'}>
        <h1>Create a new blog!</h1>
        <button onClick={setFromData}>create slides!</button>
        <form className="flex flex-col gap-3" ref={form}>
          <div
            className="w-full h-96 bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
          >
            <input
              type="file"
              accept="image/jpeg, .png"
              onChange={insertImg}
              name="coverImage"
            />
          </div>
          <textarea
            maxLength={50}
            placeholder="title"
            name="title"
            className="text-5xl font-bold break-words h-fit resize-none p-5"
          />
          <div className="flex flex-col">
            <span>Languages</span>
            <label className="flex gap-3">
              <input type="checkbox" value="html" name="languages" />
              HTML
            </label>
            <label className="flex gap-3">
              <input type="checkbox" value="css" name="languages" />
              CSS
            </label>
            <label className="flex gap-3">
              <input type="checkbox" value="javscript" name="languages" />
              Javscript
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setup;
