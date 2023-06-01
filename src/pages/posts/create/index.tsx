import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import getAuthedUser from '../../../../utils/getAuthedUser';
import { Authconfig } from '@/pages/api/auth/[...nextauth]';
import { IBlog, IStep, IUser, Slide } from '../../../../Types';
import Setup from '../../../../components/editor/components/Setup';
import Preview from '../../../../components/editor/components/Preview';
import Creation from '../../../../components/editor/components/Creation';

type Props = {
  authuser: IUser | null;
};

const Create = (props: Props) => {
  const { authuser } = props;
  const [view, setview] = useState<IStep>('Set-up');
  const [data, setData] = useState<IBlog['data'] | undefined>();
  const [slides, setSlides] = useState<Slide[]>([]);

  if (authuser) {
    return (
      <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3 ">
        <Setup view={view} setView={setview} setBlog={setData} />
        <Creation view={view} setView={setview} setSlides={setSlides} />
        <Preview data={data} slides={slides} setView={setview} view={view} />
      </section>
    );
  } else {
    return <h1>Please signin to create a blog</h1>;
  }
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, Authconfig);
  const user = await getAuthedUser(session);

  return {
    props: {
      authuser: user,
    },
  };
};

export default Create;
