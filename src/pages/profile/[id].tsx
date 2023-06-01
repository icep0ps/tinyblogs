import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { IUser } from '../../../Types';
import useStore from '../../../stores/Users';
import { PrismaClient } from '@prisma/client';
import getAuthedUser from '../../../utils/getAuthedUser';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { Authconfig } from '../api/auth/[...nextauth]';

type Props = {
  user: IUser;
};

function Profile(props: Props) {
  const { user: userProfile } = props;
  const { email, followers, following, id, image, name } = userProfile;

  const user = useStore((state) => state.user);

  return (
    <main>
      <div className="flex gap-5 items-center">
        <div>
          <Image
            src={image}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h1>{name}</h1>
            {user ? (
              <button
                onClick={async () => {
                  await axios.put(`/api/users/${id}`, {
                    data: { followerId: user.id, userId: id },
                  });
                }}
              >
                follow
              </button>
            ) : (
              <button>
                <label htmlFor="my-modal" className="cursor-pointer"></label>
              </button>
            )}
          </div>
          <p>{email}</p>

          <div className="flex justify-between">
            <span>followers: {followers}</span>
            <span>following: {following}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const prisma = new PrismaClient();
  const session = await getServerSession(context.req, context.res, Authconfig);
  let authuser = await getAuthedUser(session);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: query.id as string,
      },
      include: {
        likes: true,
      },
    });

    if (user) {
      const following = await prisma.followers.aggregate({
        where: {
          followerId: user.id,
        },
        _count: {
          followerId: true,
        },
      });

      const followers = await prisma.followers.aggregate({
        where: {
          followingId: user.id,
        },
        _count: {
          followingId: true,
        },
      });

      return {
        props: {
          user: {
            ...user,
            following: following._count.followerId,
            followers: followers._count.followingId,
          },
          authuser,
        },
      };
    } else {
      throw new Error('not found');
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Profile;
