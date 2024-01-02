import prisma from '@/prisma/prismaClient';

export const USER_ID = 1;

// Custom user error class
export class UserNotFoundError extends Error {}

// Get user
export async function getUser() {
  const user = await prisma.user.findUnique({ where: { id: USER_ID } });
  return user;
}
