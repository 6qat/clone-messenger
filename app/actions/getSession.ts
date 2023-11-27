'use server';
import 'server-only';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function getSession() {
  return await getServerSession(authOptions);
}
