import { Fragment } from 'react';
import { getProductById, getProducts } from '@/queries';
import { notFound } from 'next/navigation';

type Props = {
  params: { pid: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const { pid } = params;
  const loadedProduct = await getProductById(pid);
  if (!loadedProduct) {
    notFound();
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ pid: p.id.toString() }));
}
