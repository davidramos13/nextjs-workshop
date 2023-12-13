'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const schema = z.object({
  content: z.string().min(3),
});

type FormState = {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export default async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = schema.safeParse({ content: formData.get('content') });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['You must sign in to do this.'] } };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    return { errors: { _form: [err instanceof Error ? err.message : 'Something went wrong...'] } };
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return { errors: { _form: ['Failed to revalidate topic'] } };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
