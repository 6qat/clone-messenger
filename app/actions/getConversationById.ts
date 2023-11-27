'use server';
import 'server-only';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!conversation) return null;
    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
