'use client';
import React from 'react';
import { User } from '@prisma/client';
import Image from 'next/image';

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className={`relative`}>
      <div
        className={`relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11`}
      >
        <Image
          src={
            user?.image ||
            'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
          }
          alt='Profile image'
          fill
        />
      </div>
      <span
        className={`absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3`}
      />
    </div>
  );
};

export default Avatar;
