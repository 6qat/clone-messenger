'use client';
import React, { Fragment, useMemo } from 'react';
import { Conversation, User } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ isOpen, onClose, data }: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return 'Active';
  }, [data]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as='div'
        className={`relative z-50`}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo={`opacity-100`}
          leave='ease-in duration-500'
          leaveFrom={`opacity-100`}
          leaveTo='opacity-0'
        ></Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileDrawer;