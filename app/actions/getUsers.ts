import prisma from '@/app/libs/prismadb';
import getSession from '@/app/actions/getSession';
import { User } from '@prisma/client';

/**
 * Get all users except the current user
 */
const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users: User[] = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
