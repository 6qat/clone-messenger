'use client';
import React, { useMemo } from 'react';
import { Conversation, User } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi2';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return 'Active';
  }, [conversation]);
  return (
    <div
      className={`flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6`}
    >
      <div className={`flex items-center gap-3`}>
        <Link
          className={`block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden`}
          href='/conversations'
        >
          <HiChevronLeft size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
