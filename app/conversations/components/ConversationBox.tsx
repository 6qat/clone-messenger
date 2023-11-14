import React, { useCallback, useMemo } from 'react';
import { FullConversationType } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';
import { format } from 'date-fns';

const ConversationBox = ({
  data,
  selected,
}: {
  data: FullConversationType;
  selected?: boolean;
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100`,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      <Avatar user={otherUser} />
      <div className={`min-w-0 flex-1`}>
        <div className={`focus:outline-none`}>
          <div className={`mb-1 flex items-center justify-between`}>
            <p className={`text-md font-medium text-gray-900`}>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className={`text-xs font-light text-gray-400`}>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? `text-gray-500` : `font-medium text-black`,
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
