import { getProducts } from '@/queries';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Home() {
  const products = await getProducts();
  if (!products?.length) {
    notFound();
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id} className="m-4 hover:text-blue-300">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
