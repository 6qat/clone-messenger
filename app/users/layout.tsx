import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import getUsers from '@/app/actions/getUsers';
import UserList from '@/app/users/components/UserList';
import { User } from '@prisma/client';

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users: User[] = await getUsers();
  // console.log('Users:', users);
  return (
    <>
      <Sidebar>
        <div className={`h-full`}>
          <UserList items={users} />
          {children}
        </div>
      </Sidebar>
    </>
  );
}

export default UsersLayout;
