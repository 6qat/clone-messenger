'use server';
import 'server-only';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { FullConversationType } from '@/app/types';

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) return new Array<FullConversationType>();

  try {
    const conversations = (await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })) as FullConversationType[];
    return conversations;
  } catch (error: any) {
    return new Array<FullConversationType>();
  }
};

export default getConversations;
