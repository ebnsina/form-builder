import prisma from '@/prisma/prismaClient';
import { z } from 'zod';
import { UserNotFoundError } from './user';

// Form schema
export const formSchema = z.object({
  name: z.string().min(3, { message: 'Name is required.' }).max(50),
  description: z.string().min(3).max(100).optional(),
});

// Get form stats
export async function getFormStats(user) {
  if (!user) throw new UserNotFoundError();

  const stats = await prisma.form.aggregate({
    where: { userId: user.id },
    _sum: { visits: true, submissions: true },
  });

  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;
  const submissionRate = visits ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

// Create form
export async function createForm(user, values) {
  const result = formSchema.safeParse(values);
  if (!result.success) throw new Error(result.error.message);

  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: values.name,
      description: values.description,
    },
  });

  if (!form) throw new Error('Failed to create form');

  return form.id;
}

// Get forms
export async function getForms(user) {
  if (!user) throw new UserNotFoundError();

  const forms = await prisma.form.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return forms;
}

// Get form by id
export async function getFormById(user, id) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.findUnique({
    where: { userId: user.id, id },
  });

  return form;
}

// Get form by url
export async function getFormByUrl(user, formUrl) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.update({
    select: { content: true },
    data: { visits: { increment: 1 } },
    where: { shareUrl: formUrl },
  });

  return form;
}

// Save form
export async function saveForm(user, id, values) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.update({
    where: { userId: user.id, id },
    data: {
      content: values,
    },
  });

  return form;
}

// Publish form
export async function publishForm(user, id) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.update({
    where: { userId: user.id, id },
    data: {
      published: true,
    },
  });

  return form;
}

// Submit form
export async function submitForm(user, formUrl, data) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.update({
    data: {
      submissions: { increment: 1 },
      FormSubmission: {
        create: {
          content: data,
        },
      },
    },
    where: { shareURL: formUrl, published: true },
  });

  return form;
}

// Get form with submissions
async function getFormWithSubmissions(user, id) {
  if (!user) throw new UserNotFoundError();

  const form = await prisma.form.findUnique({
    where: { userId: user.id, id },
    include: { FormSubmission: true },
  });

  return form;
}
