import { GetStaticProps } from 'next';
import { Fragment } from 'react';
import { Product, getProductById, getProducts } from '@/queries';

type Props = { loadedProduct: Product };

export default function ProductDetailPage({ loadedProduct }: Props) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { params } = context;

  const productId = params?.pid as string;
  const product = await getProductById(productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { loadedProduct: product },
  };
};

export async function getStaticPaths() {
  const products = await getProducts();
  const ids = products.map(p => p.id);

  const pathsWithParams = ids.map(id => ({ params: { pid: id.toString() } }));
  return { paths: pathsWithParams, fallback: false };
}
/*
[
  { params: { pid: '1' } },
  { params: { pid: '2' } },
  { params: { pid: '3' } },
]
*/
