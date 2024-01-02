import { formSchema } from '@/lib/forms';
import { USER_ID } from '@/lib/user';
import prisma from '@/prisma/prismaClient';

export default async function handler(req, res) {
  const { name, description } = req.body;

  if (req.method !== 'POST') return;

  try {
    const result = formSchema.safeParse({ name, description });
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }

    const form = await prisma.form.create({
      data: {
        userId: String(USER_ID),
        name,
        description,
      },
    });

    res.status(200).json({ formId: form.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
