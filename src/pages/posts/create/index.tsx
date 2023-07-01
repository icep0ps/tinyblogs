import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, NextPage } from 'next';

import getAuthedUser from '../../../../utils/getAuthedUser';
import { Authconfig } from '@/pages/api/auth/[...nextauth]';
import Setup from '../../../../components/editor/components/Setup';
import Preview from '../../../../components/editor/components/Preview';
import { Step, User, Slide, BlogSetupData } from '../../../../Types';
import Creation from '../../../../components/editor/components/Creation';

interface Props {
  authuser: User | null;
}

const Create: NextPage<Props> = (props) => {
  const { authuser } = props;
  const [view, setview] = useState<Step>('Set-up');
  const [data, setData] = useState<BlogSetupData>({
    title: 'untitled',
    languages: [],
    coverImage: '',
  });
  const [slides, setSlides] = useState<Slide[]>([]);

  if (authuser) {
    return (
      <section className="flex flex-col gap-3 w-3/6 my-0 mx-auto pt-3 ">
        <Setup view={view} setView={setview} setBlog={setData} data={data} />
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
