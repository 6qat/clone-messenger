import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import ConversationList from '@/app/conversations/components/ConversationList';
import getConversations from '@/app/actions/getConversations';

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className={`h-full`}>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
