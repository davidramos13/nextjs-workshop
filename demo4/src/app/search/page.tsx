import PostList from '@/components/posts/PostList';
import { fetchPostsBySearchTerm } from '@/queries/posts';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { term: string };
};

export default function SearchPage({ searchParams }: Props) {
  const { term } = searchParams;
  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
