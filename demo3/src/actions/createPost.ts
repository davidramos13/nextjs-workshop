'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type FormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export default async function createPost(
  slug: string,
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['You must be signed to do this'] } };
  }

  let post: Post;
  const { title, content } = result.data;
  try {
    const topic = await db.topic.findFirst({ where: { slug } });
    if (!topic) {
      throw new Error('Cannot find topic');
    }

    post = await db.post.create({
      data: { title, content, topicId: topic.id, userId: session.user.id },
    });
  } catch (err: unknown) {
    return { errors: { _form: [err instanceof Error ? err.message : 'Something went wrong'] } };
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
