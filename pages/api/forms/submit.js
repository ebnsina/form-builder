import { formSchema } from '@/lib/forms';
import { USER_ID } from '@/lib/user';
import prisma from '@/prisma/prismaClient';

export default async function handler(req, res) {
  const { formUrl, values } = req.body;

  if (req.method !== 'POST') return;

  try {
    const form = await prisma.form.update({
      data: {
        submissions: { increment: 1 },
        formSubmission: {
          create: {
            content: values,
          },
        },
      },
      where: { shareUrl: formUrl, published: true },
    });

    res.status(200).json({ form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
