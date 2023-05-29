import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Fetcher } from 'swr';
import { useRouter } from 'next/router';
import { IUser } from '../../../Types';
import Image from 'next/image';

function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher: Fetcher<IUser> = (url: string) =>
    axios.get(url).then((r): IUser => r.data);
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`https://dummyjson.com/users/${id}`, fetcher);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <pre>{error.message}</pre>;
  if (!user) return <h1>sorry, could not find user data</h1>;

  return (
    <main>
      <div>
        <Image src={user.image} alt="profile" width={100} height={100}></Image>
      </div>
      <div>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
      </div>
    </main>
  );
}

export default Profile;
