import React, { useState } from 'react';
import Setup from '../../../../components/editor/components/Setup';
import Creation from '../../../../components/editor/components/Creation';
import { IStep } from '../../../../Types';

type Props = {};

const Create = (props: Props) => {
  const [step, setStep] = useState<IStep>('Set-up');
  return (
    <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3 ">
      {step === 'Set-up' ? <Setup setStep={setStep} /> : <Creation setStep={setStep} />}
    </section>
  );
};

export default Create;
