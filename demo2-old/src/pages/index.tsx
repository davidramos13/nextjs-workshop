import { Product, getProducts } from '@/queries';
import { GetStaticProps } from 'next';
import Link from 'next/link';

type Props = { products: Product[] };

export default function Home({ products }: Props) {
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

export const getStaticProps: GetStaticProps<Props> = async context => {
  const data = await getProducts();

  if (!data?.length) {
    return { notFound: true };
  }

  return {
    props: {
      products: data,
    },
  };
};
