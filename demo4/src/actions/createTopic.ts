'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'Must be lowercase letters or dashes without spaces' }),
  description: z.string().min(10),
});

type FormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export default async function createTopic(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = schema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['You must be signed to do this'] } };
  }

  let topic: Topic;
  const { name, description } = result.data;
  try {
    topic = await db.topic.create({ data: { slug: name, description } });
  } catch (err: unknown) {
    return { errors: { _form: [err instanceof Error ? err.message : 'Something went wrong'] } };
  }

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
