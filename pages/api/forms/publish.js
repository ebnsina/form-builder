import { USER_ID } from '@/lib/user';
import prisma from '@/prisma/prismaClient';

export default async function handler(req, res) {
  const { formId } = req.body;

  if (req.method !== 'POST') return;

  try {
    const form = await prisma.form.update({
      where: { userId: String(USER_ID), id: formId },
      data: { published: true },
    });

    res.status(200).json({ form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
