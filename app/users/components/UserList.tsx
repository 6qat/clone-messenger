'use client';
import React from 'react';
import { User } from '@prisma/client';

const UserList = ({ items }: { items: User[] }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`}
    >
      <div className={`px-5`}>
        <div className={`flex flex-col`}>
          <div className={`py-4 text-2xl font-bold text-neutral-800`}>
            Users
          </div>
        </div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </aside>
  );
};

export default UserList;
