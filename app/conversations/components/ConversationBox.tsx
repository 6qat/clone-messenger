import React from 'react';
import { FullConversationType } from '@/app/types';
import { Conversation, Message, User } from '@prisma/client';
import { useRouter } from 'next/navigation';

const ConversationBox = ({
  data,
  selected,
}: {
  data: FullConversationType;
  selected: boolean;
}) => {
  let router = useRouter();
  return <div>{data.id}</div>;
};

export default ConversationBox;
