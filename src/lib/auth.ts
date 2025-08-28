import { auth } from '@clerk/nextjs/server';

export const getSession = async () => {
  return await auth();
}; 