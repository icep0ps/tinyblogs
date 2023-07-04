import Account from './components/account';

import Link from 'next/link';
import React, { FC } from 'react';
import { Session } from 'next-auth/core/types';

type Props = {
  user: Session['user'];
};

const Sidebar: FC<Props> = (props) => {
  const { user } = props;
  return (
    <aside className="pt-4 max-w-md min-w-[20%] border-r p-3 h-full flex flex-col justify-between">
      <ul>
        <ListItem href="/">Home</ListItem>
        <ListItem href="/posts/create">Create blog</ListItem>
        <ListItem href="/explore">Explore</ListItem>
        <ListItem href="/">Search</ListItem>
        {user && <ListItem href={'/profile/' + user.id}>Profile</ListItem>}
      </ul>
      {user && <Account user={user} />}
    </aside>
  );
};

type ListItemProps = {
  href: string;
  children: string;
};

const ListItem: FC<ListItemProps> = (props) => (
  <li>
    <Link href={props.href}>{props.children}</Link>
  </li>
);

export default Sidebar;
