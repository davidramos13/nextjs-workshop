import { db } from '@/db';
import { notFound } from 'next/navigation';

type Props = { postId: string };

const delay = async (ms: number) => {
  return new Promise(r => setTimeout(r, ms));
};

export default async function PostShow({ postId }: Props) {
  const post = await db.post.findFirst({ where: { id: postId } });
  await delay(2000);

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
