import { BlogSetupData, Step } from '../../../Types';
import type { OurFileRouter } from '../../../server/uploadthing';

import '@uploadthing/react/styles.css';
import { UploadButton } from '@uploadthing/react';
import React, { FC, useRef, useState } from 'react';

interface Props {
  view: Step;
  data: BlogSetupData;
  setView: React.Dispatch<React.SetStateAction<Step>>;
  setBlog: React.Dispatch<React.SetStateAction<BlogSetupData>>;
}

const Setup: FC<Props> = (props) => {
  const [image, setImage] = useState('');
  const { view, data, setView, setBlog } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const setFromData = () => {
    if (form.current) {
      const formData = new FormData(form.current);
      //@ts-ignore
      for (var [key, value] of formData) {
        if (key === 'languages') {
          Object.assign(data, {
            [key]: formData.getAll('languages'),
          });
        } else {
          Object.assign(data, {
            [key]: value,
          });
        }
      }
      setBlog(data);
    }
    setView('Creation');
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
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  const img = res.pop();
                  if (img) setImage(img.fileUrl);
                }
                alert('Upload Completed');
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
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
